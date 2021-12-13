import React, { useState } from "react";
import { Button, Input, Form, Typography } from "antd";
import { useLocation } from "react-router";
import Logo from "../../images/Logo2.png";
import api from "../../services/api";
import "./validacaoCertificado.css";
import "antd/dist/antd.css";
import handleError from "../../utils/handleError";

export default function ValidacaoCertificado() {
  const location = useLocation();
  const { search } = location;
  const { Title, Link } = Typography;
  const params = new URLSearchParams(search);
  const certificate_id = params.get("certificate");

  const [certificate, setCertificate] = useState(certificate_id);
  const [certificateData, setCertificateData] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [okHidden, setOkHidden] = useState(true);
  const [failHidden, setFailHidden] = useState(true);

  function handleChange(e) {
    const value = e.target.value;
    setCertificate(value);
  }

  function handleSubmit() {
    api
      .get(`/cerificate/${certificate}`)
      .then((res) => {
        if (res.data) {
          setCertificateData(res.data);
          setOkHidden(false);
          setHidden(!hidden);
        } else {
          setFailHidden(false);
          setHidden(!hidden);
        }
      })
      .catch((error) => {
        handleError(error, "Problema ao validar o certificado!");
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
              O certificado de {certificateData.user_name} do curso{" "}
              {certificateData.course_name} foi verificado com sucesso!
              <br />
            </Title>
            <iframe
              title={`${certificateData.course_name} - ${certificateData.user_name}`}
              src={certificateData.url}
              type="application/pdf"
              style={{ height: "700px", width: "100%" }}
            />

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ width: "auto" }}>
                <Button onClick={handleBack} type="default">
                  Voltar
                </Button>
              </div>
            </div>
          </Form.Item>
          <Form.Item hidden={failHidden}>
            <Title level={2}>O certificado {certificate} não é válido!</Title>

            <Button onClick={handleBack}>Voltar</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
