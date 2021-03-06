import React, { useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Input, Button, message } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { useSession } from "../../Context/SessionContext"
import "./CadastroOcupacao.css";

export default function NovaAula(props) {
  const [occupation, setOccupation] = useState({});
  const [uploading, setUploading] = useState(false);
  const { session } = useSession();
  const organization = new URLSearchParams(props.location.search)

  const formLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 16
    },
  };

  const formTailLayout = {
    wrapperCol: {
      offset: 4
    }
  };

  function handleChange(e) {
    setOccupation({ ...occupation, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setUploading(true);

    console.log(occupation)
    console.log(organization.get("organization"));

    const data = {
      ...occupation,
      "organization_id": organization.get("organization")
    }

    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken
      }
    };

    api
      .post("/occupation", data, config)
      .then(response => {
        setUploading(false);
        message.success("Ocupação criada com sucesso!")
      })
      .catch((err) => {
        message.error("Não foi possível criar a ocupação!")
        setUploading(false);
      });
  }

  return (
    <Base>
      <div className="pageRoot">
        <div className="pageBody">
          <div className="formWrapper">
            <Form
              {...formLayout}
              name="newOccpation"
              className="occupationForm"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              size={"large"}
              scrollToFirstError
            >
              <Form.Item {...formTailLayout}>
                <h1>Nova Ocupação</h1>
              </Form.Item>
              <Form.Item
                name="name"
                label={<label style={{ fontSize: "large" }}> Nome </label>}
                rules={[{ required: true, message: 'Por favor insira o nome da ocupação!' }]}
              >
                <Input placeholder="Nome da ocupação" name="name" onChange={handleChange} />
              </Form.Item>
              <Form.Item
                name="description"
                label={<label style={{ fontSize: "large" }}> Descrição </label>}
              >
                <Input placeholder="Descreva a função da ocupação" name="description" onChange={handleChange} />
              </Form.Item>
              <Form.Item {...formTailLayout}>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  loading={uploading}
                  style={{ fontSize: "large" }}
                >
                  {uploading ? 'Criando' : 'Criar ocupação'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Base>
  );
}
