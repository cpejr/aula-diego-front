import React, { useState, useEffect } from "react";
import "./NovoCurso.css";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import { Input, Form, message, Select, Button } from "antd";

const { TextArea } = Input;

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

export default function NovoCurso() {
  const [formData, setformData] = useState([]);
  const history = useHistory();
  const { session } = useSession();

  function handleChange(e) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    const data = {
      ...formData,
      organization_id: session.user.organization_id,
    };

    console.log(data);

    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };

    api
      .post(`/course`, data, config)
      .then(() => {
        message.success("Curso criado com sucesso!");
        history.push("/curso/lista");
      })
      .catch((err) => {
        message.error(`Não foi possível cadastrar o curso.`);
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
                <h1>Novo Curso</h1>
              </Form.Item>
              <Form.Item
                name="name"
                label={<label style={{ fontSize: "large" }}> Nome </label>}
              >
                <Input
                  placeholder="Nome do Curso"
                  size="large"
                  name="name"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="description"
                label={<label style={{ fontSize: "large" }}> Descrição </label>}
              >
                <TextArea
                  onChange={handleChange}
                  size="large"
                  placeholder="Descrição sobre o conteúdo do curso"
                  name="description"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item {...formTailLayout} className="mt20">
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  style={{ fontSize: "large" }}
                >
                  Criar Turma
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Base>
  );
}
