import React, { useState, useEffect } from "react";
import { useSession } from "../../Context/SessionContext";
import api from "../../services/api";
import "./ConfiguracaoUser.css";
import EditUser from "../../Components/EditUser/EditUser";
import Base from "../../Components/Base/Base";
import { message, Card, Col, Row, Input, Select, Form, DatePicker } from "antd";

export default function ConfiguracaoAluno(props) {
  const [dataAluno, setDataAluno] = useState([]);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState([]);
  const [phone, setPhone] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [occupation, setOccupation] = useState([]);
  const [email, setEmail] = useState([]);

  const { session } = useSession();
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
  }, []);

  const handleEditOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                {birthdate}
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Ocupação" bordered={false}>
                {occupation.name}
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Telefone" bordered={false}>
                {phone}
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Tipo" bordered={false}>
                {getType()}
              </Card>
            </Col>
            <Col span={24}>
              <Card type="inner" title="Email" bordered={false}>
                {email}
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
