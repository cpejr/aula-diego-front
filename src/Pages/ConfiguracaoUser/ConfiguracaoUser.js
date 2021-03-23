import React, { useState, useEffect } from "react";
import { useSession } from "../../Context/SessionContext";
import api from "../../services/api";
import "./ConfiguracaoUser.css";
import EditUser from "../../Components/EditUser/EditUser";
import Base from "../../Components/Base/Base";
import { UTCToLocal } from "../../utils/convertDate";
import { message, Card, Col, Row, Input, Select, Form, DatePicker } from "antd";

export default function ConfiguracaoAluno(props) {
  const [dataAluno, setDataAluno] = useState([]);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState([]);
  const [phone, setPhone] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [occupation, setOccupation] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [email, setEmail] = useState([]);

  const { session } = useSession();
  const [formData, setFormData] = useState([]);
  const [open, setOpen] = useState(false);

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    api.get(`/user/${session.user.id}`, config).then((response) => {
      const birthdate = new Date(response.data.birthdate).toLocaleDateString(
        "pt-BR"
      );
      const phone = response.data.phone.replace(/[^\w\s]/gi, ""); // essa regex remove todos os caracteres especiais
      const formattedPhone = `(${phone.slice(0, 2)}) ${phone.slice(
        2,
        7
      )}-${phone.slice(7, 11)}`;

      setDataAluno({
        ...response.data,
        birthdate: birthdate,
        phone: formattedPhone,
      });
      setName(response.data.name);
      setBirthdate(birthdate);
      setPhone(phone);
      setEmail(response.data.email);
    });

    api
      .get(`/organization/${session.user.organization_id}`, config)
      .then((response) => {
        setOrganization(response.data);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados da organização");
      });

    api
      .get(`/occupation/${session.user.occupation_id}`, config)
      .then((response) => {
        setOccupation(response.data);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados da ocupação");
      });

    api
      .get("/organization", config)
      .then((data) => {
        setOrganizations(data.data);
      })
      .catch(() => message.error("Não foi possível carregar organizações"));
  }, []);

  function handleSelectChange(value, field) {
    if (field === "organization_id") loadOccups(value);
    console.log(`${field}: ${value}`);
    setFormData({ ...formData, [field]: value });
  }

  const handleEditOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function loadOccups(value) {
    console.log(value);
    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
      params: {
        organization_id: value,
      },
    };

    api
      .get("/occupation", config)
      .then((data) => {
        console.log(data);
        setOccupations(data.data);
      })
      .catch((error) =>
        message.error("Não foi possível carregar ocupações\n" + error)
      );
  }

  function handleSubmit() {
    let data = {};
    function addToData(key, value) {
      if (value !== undefined && value !== "") {
        data = { ...data, [key]: value };
      }
    }

    addToData("name", name);
    addToData("birthdate", birthdate);
    addToData("phone", phone);
    addToData("organization_id", formData["organization_id"]);
    addToData("occupation_id", formData["occupation_id"]);
    addToData("email", email);

    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };

    let aniversario = new Date(data["birthdate"]);
    aniversario = UTCToLocal(aniversario).getTime();
    const editedData = data;
    editedData["birthdate"] = aniversario;
    console.log(editedData["birthdate"]);

    const wantsToEdit = window.confirm(
      "Você tem certeza que deseja alterar suas informações?"
    );
    if (!wantsToEdit) return message.error("Operação cancelada");
    api
      .put(`/user/${session.user.id}`, editedData, config)
      .then(() => message.success("usuário alterado com sucesso"))
      .catch(() => message.error("Não foi possível editar o usuário"));

    /*api
      .put(`/user/${session.user.user_id}`, editedData, config)
      .then(() => alert("dados enviados com sucesso"))
      .catch((error) => {
        handleClose();
        alert("não foi possível alterar informações");
      });*/

    setOpen(false);
  }

  function getType() {
    if (dataAluno.type === "student") return "Estudante";
    else if (dataAluno.type === "admin") return "Professor";
    else if (dataAluno.type === "master") return "Administrador";
    else return null;
  }

  function Info() {
    return (
      <>
        <Card title={<h2>Suas Informações:</h2>}>
          <Row gutter={26}>
            <Col span={12}>
              <Card type="inner" title="Nome" bordered={false}>
                {name}
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Empresa" bordered={false}>
                {organization.name}
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Data de Nascimento" bordered={false}>
                {dataAluno.birthdate}
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Ocupação" bordered={false}>
                {occupation.name}
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Telefone" bordered={false}>
                {dataAluno.phone}
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Tipo" bordered={false}>
                {getType()}
              </Card>
            </Col>
            <Col span={24}>
              <Card type="inner" title="Email" bordered={false}>
                {dataAluno.email}
              </Card>
            </Col>
          </Row>
        </Card>
        <div className="acessarConfigAluno">
          <button className="buttonConfigAluno" onClick={handleEditOpen}>
            Editar
          </button>
        </div>
      </>
    );
  }

  function Editar() {
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

    return (
      <>
        <Form
          {...formItemLayout}
          name="newLive"
          className="liveForm"
          onFinish={handleSubmit}
          size={"large"}
        >
          <Form.Item {...tailFormItemLayout}>
            <h1>Editar Suas Informações:</h1>
          </Form.Item>
          <Form.Item
            label={<label style={{ fontSize: "large" }}> Nome </label>}
          >
            <Input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{ fontSize: "large" }}> Organização </label>}
          >
            <Select
              name="organization_id"
              value={formData["organization_id"]}
              onChange={(e) => handleSelectChange(e, "organization_id")}
              placeholder="Organização"
              style={{ width: "100%" }}
            >
              {organizations.map((organization) => {
                return organization != [] ? (
                  <Select.Option name="organization_id" value={organization.id}>
                    {organization.name}
                  </Select.Option>
                ) : null;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label={
              <label style={{ fontSize: "large" }}> Data de Nascimento </label>
            }
          >
            <Input
              name="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{ fontSize: "large" }}> Ocupação </label>}
          >
            <Select
              name="occupation_id"
              value={formData["occupation_id"]}
              onChange={(e) => handleSelectChange(e, "occupation_id")}
              placeholder="Ocupação"
              style={{ width: "100%" }}
            >
              {occupations.map((occupation) => {
                return occupation != [] ? (
                  <Select.Option value={occupation.id}>
                    {occupation.name}
                  </Select.Option>
                ) : null;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label={<label style={{ fontSize: "large" }}> Telefone </label>}
          >
            <Input
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{ fontSize: "large" }}> Email </label>}
          >
            <Input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <div className="acessarConfigAluno">
              <button className="buttonVoltarAluno" onClick={handleClose}>
                Voltar
              </button>
              <button className="buttonConfigAluno" onClick={handleSubmit}>
                Salvar
              </button>
            </div>
          </Form.Item>
        </Form>
      </>
    );
  }

  if (open)
    return (
      <Base>
        <div className="configUser">
          <EditUser />
          <div className="acessarConfigAluno">
            <button className="buttonVoltarAluno" onClick={handleClose}>
              Voltar
            </button>
          </div>
        </div>
      </Base>
    );
  else if (!open) {
    return (
      <Base>
        <div className="configUser">
          <Info />
        </div>
      </Base>
    );
  }
}
