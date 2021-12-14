import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Input, Button, message, Select } from "antd";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./CadastroOcupacao.css";
import handleError from "../../utils/handleError";

export default function NovaAula(props) {
  const [occupation, setOccupation] = useState({});
  const [uploading, setUploading] = useState(false);
  const history = useHistory();
  const { session } = useSession();
  const [organizations, setOrganizations] = useState([]);

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

  let config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    if (session.user.type !== "master") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      config = {
        ...config,
        params: {
          organization_id: session.user.organization_id,
        },
      };
    }
    api.get("/organization", config).then((res) => setOrganizations(res.data));
  }, []);

  function handleChange(e) {
    setOccupation({ ...occupation, [e.target.name]: e.target.value });
  }

  function handleOrgChange(value) {
    setOccupation({ ...occupation, organization_id: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setUploading(true);

    api
      .post("/occupation", occupation, config)
      .then((response) => {
        setUploading(false);
        message.success("Ocupação criada com sucesso!");
        history.push("/ocupacao");
      })
      .catch((err) => {
        handleError(err, "Não foi possível criar a ocupação!");
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
              name="newOcupation"
              className="occupationForm"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              size={"large"}
              scrollToFirstError
            >
              <Form.Item {...formTailLayout}>
                <h1>Nova Ocupação</h1>
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
                    {organizations.map((organization) => {
                      return (
                        <Select.Option
                          key={organization.id}
                          value={organization.id}
                        >
                          {organization.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              ) : null}

              <Form.Item
                name="name"
                label="Nome"
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o nome da ocupação!",
                  },
                ]}
              >
                <Input
                  placeholder="Nome da ocupação"
                  name="name"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item name="description" label="Descrição">
                <Input
                  placeholder="Descreva a função da ocupação"
                  name="description"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item {...formTailLayout}>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  loading={uploading}
                  style={{ fontSize: "large" }}
                >
                  {uploading ? "Criando" : "Criar ocupação"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Base>
  );
}
