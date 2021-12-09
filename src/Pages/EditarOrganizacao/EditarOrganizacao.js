import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Input, Button, message } from "antd";
import { ImageUpload } from "../../Components/DynamicForms/dynamicForms";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./EditarOrganizacao.css";

import building from "../../images/building.png";

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
  const [preview, setPreview] = useState(false);
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

  useEffect(() => {
    api.get(`/organization/${id}`, config).then(async (response) => {
      if (response.data.file_id !== undefined)
        await api
          .get(`/file_get/${response.data.file_id}`, config)
          .then((res) => {
            setImage(response.data.file_id);
            setPreview(res.data.url || res.data.base64);
          })
          .catch(() => setPreview(building));

      SetOrganization(response.data);
      SetName(response.data.name);
      SetDescription(response.data.description);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let data = {
      id,
      name: name,
      description: description,
    };

    if (!image) {
      return message.error("Selecione uma imagem para a organização");
    }

    if (image === preview) {
      // se a imagem não for alterada
      api
        .put(`/organization/${id}`, data, config)
        .then(() => {
          message.success("Organização editada com sucesso!");
          history.push("/organizacao");
        })
        .catch(() => {
          message.error("Erro ao editar organização");
        });
    }

    const formData = new FormData();
    formData.append(image.name, image);

    await api
      .post("/file_upload", formData, config)
      .then(async ({ data: { file_ids } }) => {
        console.log(file_ids);
        const file_id = file_ids[0];
        await api.put(`/organization/${id}`, { ...data, file_id }, config);
        message.success("Organização editada com sucesso!");
        history.push("/organizacao");
      })
      .catch(() => {
        message.error("Erro ao editar organização");
      });
  }

  return (
    <Base>
      <div className="pageRoot">
        <div className="pageBody">
          <div className="formWrapper">
            {organization && (
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
                  label={
                    <label style={{ fontSize: "large" }}> Descrição </label>
                  }
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
                  initialValue={preview || building}
                  onChange={(file) => setImage(file)}
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
            )}
          </div>
        </div>
      </div>
    </Base>
  );
}
