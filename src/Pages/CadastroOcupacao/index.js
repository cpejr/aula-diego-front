import React, { useState, useEffect } from "react";
import { Select, Input, Form, Button } from "antd";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";
import "./CadastroOcupacao.css";

//TEMPORARIO
import organizations from "./data";

export default function CadastroOrganizacao() {
  const [formValues, setFormValues] = useState({ name: "", description: "" });
  // const [organizations, setOrganizations] = useState([]);
  const { session } = useSession();

  // useEffect(() => {
  //   const config = {
  //     headers: {
  //       authorization: "BEARER " + session.accessToken,
  //     },
  //   };
  //   api
  //     .get("/organizations", config)
  //     .then((response) => setOrganizations(response))
  //     .catch(() =>
  //       alert(
  //         "Não foi possível conectar com o servidor. Por favor, tente novamente mais tarde."
  //       )
  //     );
  // }, []);

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
      .post("/occupations", formValues, config) // alterar esse trem, que tá errado
      .then(() => alert("Ocupação cadastrada com sucesso!"))
      .catch((error) =>
        alert(`Não foi possível cadastrar Ocupação. \n Erro: ${error}`)
      );
  }

  return (
    <Base>
      <div className="form-container">
        <Form className="form-ocupacao" onFinish={handleSubmit}>
          <h1 className="page-title"> Cadastro de Ocupação</h1>
          <Form.Item
            className="mt20"
            label="Nome"
            rules={[
              {
                required: true,
                message: "Por favor, digite o nome da Ocupação!",
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
          <Form.Item
            label="Organização relacionada"
            rules={[
              {
                required: true,
                message: "Por favor, escolha a organização relacionada!",
              },
            ]}
          >
            <Select defaultValue="empty">
              <Select.Option value="empty">Selecione uma opção</Select.Option>
              {organizations.map((org) => {
                return org.isDeleted ? null : (
                  <Select.Option key={org.name} value={org.name}>
                    {org.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Descrição: " className="mt20">
            <Input.TextArea
              name="description"
              value={formValues["description"]}
              onChange={handleChange}
              placeholder="Descrição sobre a Organização"
              className="form-input"
              rows={4}
            />
          </Form.Item>

          <Form.Item className="mt20">
            <button className="register-occupation-btn" type="submit">
              Cadastrar
            </button>
          </Form.Item>
        </Form>
      </div>
    </Base>
  );
}
