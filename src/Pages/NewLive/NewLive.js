import React, { useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, DatePicker, Input, Button, message } from "antd";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./NewLive.css";

const generateCode = () => {
  let code = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  for (let i = 0; i < 6; i++)
    code += characters[Math.floor(Math.random() * characters.length)];

  return code;
};

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

export default function NewLive(props) {
  const [live, setLive] = useState({});
  const [loading, setLoading] = useState(false);
  const { session } = useSession();
  const [confirmation, setConfirmation] = useState(generateCode());
  const course = props.location.search;
  const course_id = course.split("=", 2)[1];
  const history = useHistory();

  function handleChange(e) {
    setLive({ ...live, [e.target.name]: e.target.value });
  }

  function handleChangeDate(e) {
    setLive({ ...live, date: e._d });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const data = {
      ...live,
      confirmation_code: confirmation,
      course_id: course_id,
    };

    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };

    api
      .post("/live", data, config)
      .then(() => {
        setLoading(false);
        message.success("Live criada com sucesso!");
        history.push(`/curso/gerenciar/${course_id}`);
      })
      .catch((err) => {
        setLoading(false);
        message.error("Não foi possiível criar a live!");
      });
  }

  return (
    <Base>
      <div className="pageRoot">
        <div className="pageBody">
          <div className="formWrapper">
            <Form
              {...formItemLayout}
              name="newLive"
              className="liveForm"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              size={"large"}
              scrollToFirstError
            >
              <Form.Item {...tailFormItemLayout}>
                <h1>Nova Live</h1>
              </Form.Item>
              <Form.Item
                name="name"
                label={<label style={{ fontSize: "large" }}> Título </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o título da live!",
                  },
                ]}
              >
                <Input
                  placeholder="Título da live"
                  name="name"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="description"
                label={<label style={{ fontSize: "large" }}> Descrição </label>}
              >
                <Input
                  placeholder="Descreva o temas que serão abordados na live"
                  name="description"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="date"
                label={<label style={{ fontSize: "large" }}> Data </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira a data da live!",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Selecione uma data"
                  showTime
                  format="DD-MM-YYYY HH:mm"
                  name="date"
                  onChange={handleChangeDate}
                />
              </Form.Item>
              <Form.Item
                name="link"
                label={<label style={{ fontSize: "large" }}> Link </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o link da live!",
                  },
                ]}
              >
                <Input
                  placeholder="Insira o URL da página da live"
                  name="link"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label={<label style={{ fontSize: "large" }}> Código </label>}
              >
                <span className="confirmationCode">{confirmation}</span>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  style={{ fontSize: "large" }}
                  loading={loading}
                >
                  Criar Live
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Base>
  );
}
