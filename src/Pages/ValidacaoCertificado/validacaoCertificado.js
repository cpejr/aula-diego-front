import React, { useState } from "react";
import { Button, Input, Form, Typography, message } from "antd";
import { useHistory, useLocation } from "react-router";
import Logo from "../../images/Logo2.png";
import api from "../../services/api";
import "./validacaoCertificado.css";
import "antd/dist/antd.css";

export default function ValidacaoCertificado() {
  const history = useHistory();
  const location = useLocation();
  const { search } = location;
  const { Title, Link } = Typography;
  const params = new URLSearchParams(search);
  const certificate_id = params.get("certificate");
  const [course] = useState("React Native: básico ao avançado");
  const [user] = useState("Renan Castro");

  const [certificate, setCertificate] = useState(certificate_id);
  const [hidden, setHidden] = useState(false);
  const [okHidden, setOkHidden] = useState(true);
  const [failHidden, setFailHidden] = useState(true);

  function handleChange(e) {
    const value = e.target.value;
    setCertificate(value);
  }

  function handleSubmit() {
    api
      .get(`/course-cerificate/${certificate}`)
      .then((res) => {
          // api
          //   .get(`user/${res.data.user_id}`)
          //   .then((res) => {
          //     setUser(res.data.name);
          //   })
          //   .catch((error) => {
          //     message.warn(error.message);
          //   });
          // api
          //   .get(`course/${res.data.course_id}`)
          //   .then((res) => {
          //     setCourse(res.data.name);
          //   })
          //   .catch((error) => {
          //     message.warn(error.message);
          //   });
        if (res.data) {
          setOkHidden(false);
          setHidden(!hidden);
        } else {
          setFailHidden(false);
          setHidden(!hidden);
        }
      })
      .catch((error) => {
        message.error("Problema ao validar o certificado!");
        setFailHidden(false);
        setHidden(!hidden);
      });
  }

  function handleBack() {
    if (!failHidden) {
      setFailHidden(!failHidden);
    } else {
      setOkHidden(!okHidden);
    }
    setHidden(!hidden);
  }

  function handleCheckCertificate() {
    history.push("/");
  }

  return (
    <>
      <div
        className="headerHome"
        style={{ backgroundColor: "#25003c", marginBottom: "0px" }}
      >
        <div className="imgLogo">
          <Link to="/dashboard">
            <img
              className="logodark"
              style={{ margin: "7px" }}
              src={Logo}
              alt="Logo da Recstudio"
            ></img>
          </Link>
        </div>
        <div className="btns">
          <Link to="/login">
            <button className="btnLogin">Entrar</button>
          </Link>
          <Link to="/cadastro">
            <button
              className="btnCadastro"
              style={{ backgroundColor: "#25003c", color: "white" }}
              route="/cadastro"
            >
              Cadastre-se
            </button>
          </Link>
        </div>
      </div>

      <div className="formWrapper">
        <Form>
          <Form.Item>
            <h1>Verificação de Certificado</h1>
          </Form.Item>
          <Form.Item hidden={hidden} label="Código">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Input
                defaultValue={certificate_id}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
              <div style={{ width: "auto" }}>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleSubmit}
                  style={{ marginTop: "20px" }}
                >
                  Verificar certificado
                </Button>
              </div>
            </div>
          </Form.Item>
          <Form.Item hidden={okHidden}>
            <Title level={2}>
              O certificado de {user} do curso {course} foi verificado com
              sucesso!
              <br />
            </Title>
            <div style={{ display: "flex", flexDirection: "row" }}>
            <Button onClick={handleCheckCertificate} type="primary">
                Ver Certificado
            </Button>
            <div style={{ marginLeft: "15px", width: "auto" }}>
              <Button onClick={handleBack} type="default">
                Voltar
              </Button>
            </div>
            </div>
          </Form.Item>
          <Form.Item hidden={failHidden}>
            <Title level={2}>
              O certificado {certificate} não existe para ser verificado!
            </Title>
            <Button onClick={handleBack}>Voltar</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
