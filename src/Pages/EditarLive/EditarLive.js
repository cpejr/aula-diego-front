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
  const [live, setLive] = useState({});
  const [edit, setEdit] = useState({});

  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [date, setDate] = useState([]);
  const [link, setLink] = useState([]);

  const [loading, setLoading] = useState(false);
  const { session } = useSession();
  const id = props.match.params.id;
  const history = useHistory();

  //document.getElementById("name").value = live.name;

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    api
      .get(`/live/${id}`, config)
      .then((response) => {
        setLive(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setDate(response.data.date);
        setLink(response.data.link);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados da live");
      });
  }, []);

  function handleChange(e) {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  }

  function handleChangeDate(e) {
    setEdit({ ...edit, date: e._d });
  }

  function loadingInputs(name, description, date, link) {
    console.log(name);
    document.getElementById("name").value = name;
    document.getElementById("description").value = description;
    document.getElementById("date").value = date;
    document.getElementById("link").value = link;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const data = {
      ...live,
      //confirmation_code: confirmation,
      //course_id: course.get("course"),
    };

    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };

    api
      .put("/live", data, config)
      .then(() => {
        setLoading(false);
        message.success("Live editada com sucesso!");
        history.push(`/live/${id}`);
      })
      .catch((err) => {
        setLoading(false);
        message.error("Não foi possiível editar a live!");
        console.log(err);
      });
  }

  return (
    <Base>
      <div className="pageRoot">
        {console.log(name)}
        <div className="pageBody">
          <div className="formWrapper">
            <Form
              {...formItemLayout}
              /*onLoad={loadingInputs(
                live.name,
                live.description,
                live.date,
                live.link
              )}*/
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
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  defaultValue={name}
                />
              </Form.Item>
              <Form.Item
                name="description"
                label={<label style={{ fontSize: "large" }}> Descrição </label>}
              >
                <Input
                  name="description"
                  onChange={handleChange}
                  id="description"
                  defaultValue={description}
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
                  showTime
                  format="DD-MM-YYYY HH:mm"
                  name="date"
                  onChange={handleChangeDate}
                  id="date"
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
                  name="link"
                  onChange={handleChange}
                  id="link"
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
