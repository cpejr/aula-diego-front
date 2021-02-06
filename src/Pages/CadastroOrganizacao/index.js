import React, { useState } from "react";
import { Label, Input, Form, Button } from "antd";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";
import "./CadastroOrganizacao.css";

const { TextArea } = Input;

export default function CadastroOrganizacao() {
  const [formValues, setFormValues] = useState({ name: "", description: "" });
  const { session } = useSession();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  function handleChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };
    api
      .post("/", formValues, config) // alterar esse trem, que tá errado
      .then(() => alert("Organização cadastrada com sucesso!"))
      .catch((error) =>
        alert(`Não foi possível cadastrar organização. \n Erro: ${error}`)
      );
  }

  return (
    <Base>
      <Form className="form-organization" onFinish={handleSubmit} {...layout}>
        <h1 className="page-title"> Cadastro de Organização</h1>
        <Form.Item
          className="mt20"
          label="Nome"
          rules={[
            {
              required: true,
              message: "Por favor, digite o nome da Organização!",
            },
          ]}
        >
          <Input
            placeholder="Nome da Organização"
            name="name"
            className="form-input"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Descrição: " className="mt20">
          <TextArea
            name="description"
            value={formValues["description"]}
            onChange={handleChange}
            placeholder="Descrição sobre a Organização"
            className="form-input"
            rows={4}
          />
        </Form.Item>

        <Form.Item className="mt20">
          <Button
            type="primary"
            className="register-btn"
            htmlType="submit"
            {...tailLayout}
          >
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </Base>
  );
}
