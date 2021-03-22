import React, { useState, useEffect } from "react";
import { useSession } from "../../Context/SessionContext";
import api from "../../services/api";
import "./ConfiguracaoUser.css";
import Base from "../../Components/Base/Base";
import { UTCToLocal } from "../../utils/convertDate";
import { message, Card, Col, Row, Input, Select } from "antd";

export default function ConfiguracaoAluno(props) {
  const [dataAluno, setDataAluno] = useState([]);
  const [name, setName] = useState([]);
  const [birthdate, setBirthdate] = useState([]);
  const [phone, setPhone] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [occupation, setOccupation] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [email, setEmail] = useState([]);

  const { session } = useSession();
  const [formData, setFormData] = useState([]);
  const [editInputs, setEditInputs] = useState([]);
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
        setOrganization(response.data.name);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados da organização");
      });

    api
      .get(`/occupation/${session.user.occupation_id}`, config)
      .then((response) => {
        setOccupation(response.data.name);
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

    api
      .get("/occupation", config)
      .then((data) => {
        setOccupations(data.data);
      })
      .catch(() => message.error("Não foi possível carregar ocupações"));
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSelectChange(value, field) {
    if (field === "organization_id") loadOccups(value);
    console.log(`${field}: ${value}`);
    setFormData({ ...formData, [field]: value });
  }

  const handleEditOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditInputs({});
    setOpen(false);
  };

  function loadOccups(value) {
    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
      params: {
        organization_id: value,
      },
    };
    if (value)
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
    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };

    const wantsToEdit = window.confirm(
      "Você tem certeza que deseja alterar suas informações?"
    );
    if (!wantsToEdit) return message.error("Operação cancelada");
    api
      .put(`/user/${session.user.id}`, formData, configOrganization)
      .then(() => message.success("Organização alterada com sucesso"))
      .catch(() => message.error("Não foi possível editar a organização"));

    let birthdate = new Date(editInputs["birthdate"]);
    birthdate = UTCToLocal(birthdate).getTime();
    const editedData = editInputs;
    editedData["birthdate"] = birthdate;
    api
      .put(`/user/${session.user.user_id}`, editedData, config)
      .then(() => alert("dados enviados com sucesso"))
      .catch((error) => {
        handleClose();
        alert("não foi possível alterar informações");
      });

    //setFormData({ ...formData, id: organization_id });
    const configOrganization = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };
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
                {dataAluno.name}
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Empresa" bordered={false}>
                {organization}
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Data de Nascimento" bordered={false}>
                {dataAluno.birthdate}
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Ocupação" bordered={false}>
                {occupation}
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
    return (
      <>
        <Card title={<h2>Editar as suas Informações:</h2>}>
          <Row gutter={26}>
            <Col span={12}>
              <Card type="inner" title="Nome" bordered={false}>
                <Input
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={name}
                  value={formData["name"]}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Empresa" bordered={false}>
                <Select
                  name="organization_id"
                  value={formData["organization_id"]}
                  onChange={(e) => handleSelectChange(e, "organization_id")}
                  placeholder="Organização"
                  style={{ width: "100%" }}
                >
                  {organizations.map((organization) => {
                    return organization != [] ? (
                      <Select.Option
                        name="organization_id"
                        value={organization.id}
                      >
                        {organization.name}
                      </Select.Option>
                    ) : null;
                  })}
                </Select>
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Data de Nascimento" bordered={false}>
                <Input
                  name="birthdate"
                  onChange={(e) => setBirthdate(e.target.value)}
                  defaultValue={birthdate}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Ocupação" bordered={false}>
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
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Telefone" bordered={false}>
                <Input
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  defaultValue={phone}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Tipo" bordered={false}>
                {getType()}
              </Card>
            </Col>
            <Col span={24}>
              <Card type="inner" title="Email" bordered={false}>
                <Input
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={email}
                />
              </Card>
            </Col>
          </Row>
        </Card>
        <div className="acessarConfigAluno">
          <button className="buttonConfigAluno" onClick={handleSubmit}>
            Salvar
          </button>
        </div>
      </>
    );
  }

  if (open)
    return (
      <Base>
        <div className="configUser">
          <Editar />
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

/*<Visualizar
        name={dataAluno.name}
        organization={organization}
        birthdate={dataAluno.birthdate}
        email={dataAluno.email}
        occupation={occupation}
        phone={dataAluno.phone}
      /> 

function Visualizar(name, organization, birthdate, email, occupation, phone) {
  return (
    <>
      <div className="pageRoot">
        <div className="pageBody">
          <div className="formWrapper">
            <Form
              {...formLayout}
              name="informacoes"
              className="occupationForm"
              initialValues={{ remember: true }}
              size={"large"}
              scrollToFirstError
            >
              <Form.Item {...formTailLayout}>
                <h1>Suas Informações</h1>
              </Form.Item>
              <Form.Item
                name="name"
                label={<label style={{ fontSize: "large" }}> Nome </label>}
              >
                <p>{name}</p>
              </Form.Item>
              <Form.Item
                name="organization"
                label={<label style={{ fontSize: "large" }}> Empresa </label>}
              >
                <p>{organization}</p>
              </Form.Item>
              <Form.Item
                name="birthdate"
                label={
                  <label style={{ fontSize: "large" }}>
                    {" "}
                    Data de Nascimento{" "}
                  </label>
                }
              >
                <p>{birthdate}</p>
              </Form.Item>
              <Form.Item
                name="email"
                label={<label style={{ fontSize: "large" }}> Email </label>}
              >
                <p>{email}</p>
              </Form.Item>
              <Form.Item
                name="occupation"
                label={<label style={{ fontSize: "large" }}> Ocupação </label>}
              >
                <p>{occupation}</p>
              </Form.Item>
              <Form.Item
                name="phone"
                label={<label style={{ fontSize: "large" }}> Telefone </label>}
              >
                <p>{phone}</p>
              </Form.Item>
              <Form.Item {...formTailLayout} className="mt20">
                <button className="btnCurso" type="submit">
                  Editar
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

 Editar({ title, arquivo_url, description }) {
  return (
    <>
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
              <Form.Item
                name="name"
                label={<label style={{ fontSize: "large" }}> Nome </label>}
              >
                <Input
                  placeholder="Nome do Curso"
                  size="large"
                  name="name"
                  value={formData["name"]}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="description"
                label={<label style={{ fontSize: "large" }}> Descrição </label>}
              >
                <TextArea
                  onChange={handleChange}
                  size="large"
                  placeholder="Descrição sobre o conteúdo do curso"
                  name="description"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  value={formData["description"]}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item {...formTailLayout} className="mt20">
                <button
                  className="btnCurso"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Cadastrar
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}*/
