import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, DatePicker, Input, Button, message } from "antd";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./EditarOrganizacao.css";

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

export default function EditarOrganizacao(props) {
  const [organization, SetOrganization] = useState([]);
  const [edit, setEdit] = useState({});
  const [description, SetDescription] = useState("");
  const [name, SetName] = useState("");


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
    api.get(`/organization/${id}`, config)
    .then((response) => {
      SetOrganization(response.data);
      SetName(response.data.name);
      SetDescription(response.data.description);
      console.log(response);
      // setFilteredData(response.data);
      
    });
  }, []);
  
  
  function handleChangeDate(e) {
    setEdit({ ...edit, date: e._d });
  }

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
      .put(`/organization`, data, config)
      .then(() => {
        message.success("Organização editada com sucesso!");
        history.push(`/organizacao`);
      })
      .catch((err) => {
        console.log(err);
        message.error("Não foi possível editar a organização!\n" + err);
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
                <h1>Editar Organização</h1>
              </Form.Item>
              <Form.Item
                label={<label style={{ fontSize: "large" }}> Nome </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o nome da organização!",
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
                    message: "Por favor insira a descrição da organização!",
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