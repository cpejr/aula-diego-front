import React, { useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, DatePicker, Input, Button } from "antd"
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./NewLive.css";

const generateCode = () => {
  let code = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

  for (let i = 0; i < 6; i++)
    code += characters[Math.floor(Math.random() * characters.length)];

  return code;
}

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    offset: 4
  }
};

export default function NewLive() {
  const [state, setState] = useState({});
  const [date, setDate] = useState(null);
  const [confirmation, setConfirmation] = useState(generateCode());

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleChangeDate(e) {
    setState({ ...state, date: e._d });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = { ...state, "date": date, "confirmation_code": confirmation };

    api
      .post("/newlive", data)
      .then(() => setState({}))
      .catch((err) => alert(`Não foi possível criar live \n ${err}`));
  }

  return (
    <Base>
      <div className="pageRoot">
        <div>
        </div>
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
                name="title"
                label={<label style={{ fontSize: "large" }}> Título </label>}
                rules={[{ required: true, message: 'Por favor insira o título da live!' }]}
              >
                <Input placeholder="Título da Live" name="title" onChange={handleChange}/>
              </Form.Item>
              <Form.Item
                name="description"
                label={<label style={{ fontSize: "large" }}> Descrição </label>}
                rules={[{ message: 'Por favor insira a descrição da live!' }]}
              >
                <Input placeholder="Descreva o temas que serão abordados na live" name="description" onChange={handleChange}/>
              </Form.Item>
              <Form.Item
                name="date"
                label={<label style={{ fontSize: "large" }}> Data </label>}
                rules={[{ required: true, message: 'Por favor insira a data da live!' }]}
              >
                <DatePicker showTime format="DD-MM-YYYY HH:mm" name="date" onChange={handleChangeDate}/>
              </Form.Item>
              <Form.Item
                name="link"
                label={<label style={{ fontSize: "large" }}> Link </label>}
                rules={[{ required: true, message: 'Por favor insira o link da live!' }]}
              >
                <Input placeholder="Insira o URL da página da live" name="link" onChange={handleChange}/>
              </Form.Item>
              <Form.Item
                label={<label style={{ fontSize: "large" }}> Código </label>}
              >
                <span className="confirmationCode">{confirmation}</span>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" style={{ fontSize: "large"}}>
                  Criar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Base>
  );
}
