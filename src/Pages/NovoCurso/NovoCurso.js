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
  const [organization, setOrganization] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const history = useHistory();
  const { session } = useSession();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    setformData({ ...formData, organization_id: session.user.organization_id });

    api
      .get("/organization", config)
      .then((res) => setOrganizations(res.data))
      .catch((err) => {
        message.error("Não foi possível criar a ocupação!");
      });
  }, [session]);

  function handleChange(e) {
    setformData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleOrgChange(id) {
    setformData({ ...formData, organization_id: id });
  }

  function handleSubmit() {
    api
      .post(`/course`, formData, config)
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
              {session.user.type === "master" ? (
                <Form.Item
                  name="organization_id"
                  label="Organização"
                  rules={[
                    {
                      required: true,
                      message: "Por favor insira o nome da ocupação!",
                    },
                  ]}
                >
                  <Select
                    onChange={handleOrgChange}
                    defaultValue={session.user.organization_id}
                  >
                    {organizations.map((organizations) => {
                      return (
                        <Select.Option
                          key={organizations.id}
                          value={organizations.id}
                        >
                          {organizations.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              ) : null}
              <Form.Item name="name" label="Nome">
                <Input
                  placeholder="Nome do Curso"
                  size="large"
                  name="name"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item name="description" label="Descrição">
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
                  Criar Curso
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Base>
  );
}
