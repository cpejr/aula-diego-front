import React, { useState } from "react";
import { Input, Form, message } from "antd";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./CadastroOrganizacao.css";

export default function CadastroOrganizacao() {
  const [formData, setformData] = useState({});
  const history = useHistory();
  const { session } = useSession();

  function handleChange(e) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };

    let data = formData;

    api
      .post(`/organization`, data, config)
      .then(() => {
        message.success("Organização criada com sucesso!");
        history.push("/organizacao");
      })
      .catch(() => {
        message.error(`Não foi possível cadastrar organização.`);
      });
  }

  return (
    <Base>
      <div className="form-container">
        <Form className="form-ocupacao" >
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
              value={formData["name"]}
              className="form-input"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Descrição: " className="mt20">
            <Input.TextArea
              name="description"
              value={formData["description"]}
              placeholder="Descrição sobre a Organização"
              autoSize={{ minRows: 2, maxRows: 6 }}
              className="form-input"
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item className="mt20">
            <button
              className="register-organization-btn"
              type="submit"
              onClick={handleSubmit}
            >
              Cadastrar
            </button>
          </Form.Item>
        </Form>
      </div>
    </Base>
  );
}
