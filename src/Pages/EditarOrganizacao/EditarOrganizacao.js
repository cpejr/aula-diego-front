import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Input, Button, message } from "antd";
import { ImageUpload } from "../../Components/DynamicForms/dynamicForms";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./EditarOrganizacao.css";

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    offset: 4,
  },
};

export default function EditarOrganizacao(props) {
  const [organization, SetOrganization] = useState(false);
  const [description, SetDescription] = useState("");
  const [preview, setPreview] = useState(false)
  const [image, setImage] = useState(false);
  const [name, SetName] = useState("");

  const [loading, setLoading] = useState(false);
  const { session } = useSession();
  const id = props.match.params.id;
  const history = useHistory();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  const configFileGet = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    responseType: "blob",
  };

  const configFilePost = {
    headers: {
      authorization: "BEARER " + session.accessToken,
      "Content-Type": "multipart/form-data",
      processData: false,
      contentType: false,
    },
  };

  useEffect(() => {
    api.get(`/organization/${id}`, config)
      .then(async (response) => {

        if (response.data.file_id !== undefined)
          await api
            .get(`/file_get/${response.data.file_id}`, configFileGet)
            .then(file => {
              setPreview(URL.createObjectURL(file.data));
            });

        SetOrganization(response.data);
        SetName(response.data.name);
        SetDescription(response.data.description);
      });
  }, [config, configFileGet, id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let data = {
      id,
      name: name,
      description: description,
    };

    if (image) {

      const file = {
        user_id: session.user.id,
        file_name: name,
        file_type: image.type,
        file_original: image.name
      }

      await api
        .post("file", file, config)
        .then(async response => {

          const formData = new FormData();
          formData.append(response.data.file_id, image);

          await api
            .post("file_upload", formData, configFilePost)
            .catch(err => { message.error("Não foi possível editar a organizacao!") })

          data = { ...data, file_id: response.data.file_id }
        })
        .then(() => {
          api
            .put(`/organization`, data, config)
            .then(() => {
              message.success("Organização editada com sucesso!");
              history.push(`/organizacao`);
            })
            .catch((err) => {
              message.error("Não foi possível editar a organização!");
            });
        })
        .catch(err => { message.error("Não foi possível eidtar a atividade!") })
    }

    else {
      api
        .put(`/organization`, data, config)
        .then(() => {
          message.success("Organização editada com sucesso!");
          history.push(`/organizacao`);
        })
        .catch((err) => {
          message.error("Não foi possível editar a organização!");
        });
    }
  }

    return (
      <Base>
        <div className="pageRoot">
          <div className="pageBody">
            <div className="formWrapper">
              {organization &&
                <Form
                  {...formItemLayout}
                  name="newClass"
                  className="ClassForm"
                  onFinish={handleSubmit}
                  size={"large"}
                >
                  <Form.Item {...tailFormItemLayout}>
                    <h1>Editar Organização</h1>
                  </Form.Item>
                  <Form.Item
                    label={<label style={{ fontSize: "large" }}> Nome </label>}
                    rules={[
                      {
                        required: true,
                        message: "Por favor insira o nome da organização!",
                      },
                    ]}
                  >
                    <Input
                      name="name"
                      value={name}
                      onChange={(e) => SetName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label={<label style={{ fontSize: "large" }}> Descrição </label>}
                    rules={[
                      {
                        required: true,
                        message: "Por favor insira a descrição da organização!",
                      },
                    ]}
                  >
                    <Input
                      name="description"
                      value={description}
                      onChange={(e) => SetDescription(e.target.value)}
                    />
                  </Form.Item>
                  <ImageUpload
                    name="logo"
                    label="Logo"
                    initialValue={preview}
                    onChange={file => setImage(file)}
                  />
                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      type="primary"
                      onClick={handleSubmit}
                      style={{ fontSize: "large" }}
                      loading={loading}
                    >
                      Editar
              </Button>
                  </Form.Item>
                </Form>
              }
            </div>
          </div>
        </div>
      </Base>
    );
  }