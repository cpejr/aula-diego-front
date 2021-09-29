import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Input, Button, message } from "antd";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./EditarCurso.css";

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

export default function EditarCurso(props) {
  // eslint-disable-next-line no-unused-vars
  const [course, SetCourse] = useState([]);
  const [name, SetName] = useState("");
  const [description, SetDescription] = useState("");
  


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
    api.get(`/course/${id}`, config).then((response) => {
      SetCourse(response.data);
      SetName(response.data.name);
      SetDescription(response.data.description);
      console.log(response.data.description);
      console.log(response.data.name);
      // setFilteredData(response.data);
      
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const data = {
      id,
      name: name,
      description: description,
    };
    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };

    api
      .put(`/course`, data, config)
      .then(() => {
        message.success("Curso editado com sucesso!");
        history.push(`/curso/lista`);
      })
      .catch((err) => {
        message.error("Não foi possível editar o curso!\n" + err);
      });
  }
  return (
    <Base>
      <div className="pageRoot">
        <div className="pageBody">
          <div className="formWrapper">
            <Form
              {...formItemLayout}
              name="newClass"
              className="ClassForm"
              onFinish={handleSubmit}
              size={"large"}
            >
              <Form.Item {...tailFormItemLayout}>
                <h1>Editar Curso</h1>
              </Form.Item>
              <Form.Item
                label={<label style={{ fontSize: "large" }}> Nome: </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o nome do curso!",
                  },
                ]}
              >
                <Input
                  name="name"
                  value={name}
                  onChange={(e) => SetName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label={<label style={{ fontSize: "large" }}> Descrição </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira a descrição do curso!",
                  },
                ]}
              >
                <Input
                  name="description"
                  value={description}
                  onChange={(e) => SetDescription(e.target.value)}
                />
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