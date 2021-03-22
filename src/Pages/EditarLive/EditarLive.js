import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, DatePicker, Input, Button, message } from "antd";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./EditarLive.css";

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
  const [edit, setEdit] = useState({});

  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [date, setDate] = useState([]);
  const [link, setLink] = useState([]);

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
    });
  }, []);

  function handleChangeDate(e) {
    setEdit({ ...edit, date: e._d });
  }

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
      .put("/live", data, config)
      .then(() => {
        message.success("Live editada com sucesso!");
        history.push(`/live/${id}`);
      })
      .catch((err) => {
        message.error("Não foi possiível editar a live!");
        console.log(err);
      });
  }

  return (
    <Base>
      <div className="pageRoot">
        {console.log(name)}
        <div className="pageBody">
          <input defaultValue={name} />
          <div className="formWrapper">
            <Form
              {...formItemLayout}
              name="newLive"
              className="liveForm"
              onFinish={handleSubmit}
              size={"large"}
            >
              <Form.Item {...tailFormItemLayout}>
                <h1>Nova Live</h1>
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
                {console.log("AQUII", typeof name)}
                <Input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="description_form"
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
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={description}
                  defaultValue={description}
                />
              </Form.Item>
              <Form.Item
                name="date_form"
                label={<label style={{ fontSize: "large" }}> Data </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira a data da live!",
                  },
                ]}
              >
                <DatePicker
                  showTime
                  format="DD-MM-YYYY HH:mm"
                  name="date"
                  onChange={handleChangeDate}
                  id="date"
                />
              </Form.Item>
              <Form.Item
                name="link_form"
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
                  onChange={(e) => setLink(e.target.value)}
                  defaultValue={link}
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
