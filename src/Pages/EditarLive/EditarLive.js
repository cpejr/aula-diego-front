import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Input, Button, message } from "antd";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./EditarLive.css";
import handleError from "../../utils/handleError";

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

export default function EditarLive(props) {
  const [live, setLive] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [courseId, setCourseId] = useState("");

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
    api.get(`/live/${id}`, config).then((response) => {
      setLive(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setDate(response.data.date);
      setLink(response.data.link);
      setCourseId(response.data.course_id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: name,
      description: description,
      date: date,
      link: link,
      confirmation_code: live.confirmation_code,
      course_id: live.course_id,
    };

    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };

    api
      .put(`/live/${id}`, data, config)
      .then(() => {
        message.success("Live editada com sucesso!");
        history.push(`/curso/gerenciar/${courseId}`);
      })
      .catch((err) => {
        handleError(err, "Não foi possível editar a live!\n");
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
              onFinish={handleSubmit}
              size={"large"}
            >
              <Form.Item {...tailFormItemLayout}>
                <h1>Editar Live</h1>
              </Form.Item>
              <Form.Item
                label={<label style={{ fontSize: "large" }}> Título </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o nome da live!",
                  },
                ]}
              >
                <Input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label={<label style={{ fontSize: "large" }}> Descrição </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira a descrição da live!",
                  },
                ]}
              >
                <Input
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label={<label style={{ fontSize: "large" }}> Data </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira a data da live!",
                  },
                ]}
              >
                <Input
                  name="date"
                  type="datetime-local"
                  defaultValue={
                    new Date(new Date().toString().split("GMT")[0] + " UTC")
                      .toISOString()
                      .split(".")[0]
                  }
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label={<label style={{ fontSize: "large" }}> Link </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o link da live!",
                  },
                ]}
              >
                <Input
                  name="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label={<label style={{ fontSize: "large" }}> Código </label>}
              >
                <span className="confirmationCode">
                  {live.confirmation_code}
                </span>
              </Form.Item>
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
          </div>
        </div>
      </div>
    </Base>
  );
}
