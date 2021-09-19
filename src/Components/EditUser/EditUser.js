/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { useSession } from "../../Context/SessionContext";
import api from "../../services/api";
import { message, Card, Col, Row, Input, Select, Button } from "antd";
import ActionButton from "../../Components/ActionButton/actionButton";
import { useHistory } from "react-router-dom";

export default function EditUser() {
  const [dataAluno, setDataAluno] = useState([]);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [email, setEmail] = useState("");
  const [cpf, setCpf]= useState("");

  const { session } = useSession();
  const history = useHistory();
  const [formData, setFormData] = useState([]);

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    api.get(`/user/${session.user.id}`, config).then((response) => {
      setDataAluno(response.data);
      setName(response.data.name);
      setBirthdate(response.data.birthdate);
      setPhone(response.data.phone);
      setEmail(response.data.email);
      var v = response.data.cpf;
      v=v.replace(/\D/g,"")                    //Remove tudo o que não é dígito
      v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
      v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
                                              //de novo (para o segundo bloco de números)
      v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
      setCpf(v);
    });

    api
      .get("/organization", config)
      .then((data) => {
        setOrganizations(data.data);
      })
      .catch(() => message.error("Não foi possível carregar organizações"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelectChange(value, field) {
    if (field === "organization_id") loadOccups(value);
    console.log(`${field}: ${value}`);
    setFormData({ ...formData, [field]: value });
  }

  function loadOccups(value) {
    console.log(value);
    const configOccupation = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
      params: {
        organization_id: value,
      },
    };
    if (value)
      api
        .get("/occupation", configOccupation)
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

    console.log(data["phone"]);

    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };

    api
      .put(`/user/${session.user.id}`, data, config)
      .then(() => {
        message.success("Usuário alterado com sucesso");
        history.push(`/config`);
      })
      .catch((error) =>
        message.error("Não foi possível editar o usuário\n" + error)
      );
  }

  function getType() {
    if (dataAluno.type === "student") return "Estudante";
    else if (dataAluno.type === "admin") return "Professor";
    else if (dataAluno.type === "master") return "Administrador";
    else return null;
  }

  function dateFormate(date) {
    const birthdate = new Date(date).toLocaleDateString("pt-BR");
    return birthdate;
  }

  return (
    <>
      <Card title={<h4>Editar as suas Informações:</h4>}>
        <Row gutter={26}>
          <Col span={12}>
            <Card type="inner" title="Nome" bordered={true}>
              <Input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={dateFormate(birthdate)}
                onChange={(e) => setBirthdate(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card type="inner" title="Tipo" bordered={false}>
              {getType()}
            </Card>
          </Col>
          <Col span={12}>
            <Card type="inner" title="Email" bordered={false}>
              <Input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card type="inner" title="CPF" bordered={false}>
              {cpf}
            </Card>
          </Col>
        </Row>
      </Card>
      <div className="acessarConfigAluno">
        <ActionButton
          confirm="Deseja alterar as informações?"
          onConfirm={() => handleSubmit()}
        >
          <Button type="primary" size="large" className="actionButton">
            Salvar
          </Button>
        </ActionButton>
      </div>
    </>
  );
}
