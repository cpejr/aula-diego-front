import React, { useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Upload, Input, Button, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./CadastroOrganizacao.css";

export default function NovaAula(props) {
  const [organization, setOrganization] = useState({});
  const [file, setFile] = useState([]);
  const [logoPreview, setLogoPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const { session } = useSession();
  const history = useHistory();

  const formLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const formTailLayout = {
    wrapperCol: {
      offset: 4,
    },
  };

  const fileProps = {
    name: "file",
    listType: "picture-card",
    className: "avatar-uploader",
    showUploadList: false,
    beforeUpload: (file) => {
      setFile(file);
      setLogoPreview(URL.createObjectURL(file))
      return false;
    },
  };

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  const configFiles = {
    headers: {
      authorization: "BEARER " + session.accessToken,
      "Content-Type": "multipart/form-data",
      processData: false,
      contentType: false,
    },
  };

  function handleChange(e) {
    setOrganization({ ...organization, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    console.log(file)

    const data = {
      ...organization,
      user_id: session.user.id,
      file_name: organization.name,
      file_type: file.type,
      file_original: file.name
    }

    api
      .post("/organization", data, config)
      .then((response) => {
        const formData = new FormData();
        formData.append(response.data.file_id, file);

        api
          .post("file_upload", formData, configFiles)
          .then(() => {
            setLoading(false);
            message.success("Organização criada com sucesso!");
            history.push(`/organizacao`);

          })
          .catch(err => {
            message.error("Não foi possível criar a organização!");
          })
      })
      .catch((err) => {
        message.error("Não foi possível criar a organização!");
        setLoading(false);
      });
  }

  return (
    <Base>
      <div className="pageRoot">
        <div className="pageBody">
          <div className="formWrapper">
            <Form
              {...formLayout}
              name="newClass"
              className="classForm"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              size={"large"}
              scrollToFirstError
            >
              <Form.Item {...formTailLayout}>
                <h1>Nova Organização</h1>
              </Form.Item>
              <Form.Item
                name="name"
                label="Nome"
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o título da aula!",
                  },
                ]}
              >
                <Input
                  placeholder="Nome da organização"
                  name="name"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="description"
                label="Descrição"
              >
                <Input
                  placeholder="Descreva a organização"
                  name="description"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="files"
                label="Logo"
                rules={[
                  {
                    required: true,
                    message: "Por favor insira no mínimo um arquivo!",
                  },
                ]}
              >
                <Upload {...fileProps}>
                  {logoPreview
                    ?
                    <img src={logoPreview} alt="avatar" style={{ width: '100%' }} />
                    :
                    <div>
                      {loading ? <LoadingOutlined /> : <PlusOutlined />}
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  }
                </Upload>
              </Form.Item>
              <Form.Item {...formTailLayout}>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  loading={loading}
                  style={{ fontSize: "large" }}
                >
                  Criar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Base>
  );
}
