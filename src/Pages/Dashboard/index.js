import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import CardCurso from "../../Components/CardCurso/CardCurso";
import TabelaAtividades from "../../Components/TabelaAtividades/TabelaAtividades";
import "./index.css";
import { useSession } from "../../Context/SessionContext";
import api from "../../services/api";
import { message } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";

export default function Dashboard(props) {
  const [organization, setOrganization] = useState([]);
  const [score, setScore] = useState(0);
  const { session } = useSession();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    params: {
      id: session.user.organization_id,
    },
  };

  const configFile = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    responseType: "blob",
  };

  useEffect(() => {
    api
      .get(`/organization`, config)
      .then((response) => {
        getLogo(response.data).then((response) => {
          setOrganization(response[0]);
          console.log(response);
        });
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das organizações");
      });
    api
      .post("/score", { user_id: session.user.id }, config)
      .then((res) => setScore(res.data.score))
      .catch(() =>
        message.error("Não foi possível receber pontuação do usuário.")
      );
  }, []);

  const getLogo = async (organizations) => {
    const result = [];
    console.log(organizations);
    for (const organization of organizations) {
      await api
        .get(`/file_get/${organization.file_id}`, configFile)
        .then((response) => {
          const img = URL.createObjectURL(response.data);
          result.push({
            ...organization,
            logo: img,
          });
        })
        .catch((err) => {
          console.log(err);
          message.error("Não foi possível carregar dados dos arquivos");
        });
    }

    return result;
  };

  return (
    <>
      <Base>
        <div className="DashboardTitle">
          <img src={organization.logo} className="TitleImg" />
          <h1 style={{ fontWeight: 600 }}>{organization.name}</h1>
          <div
            style={{ marginLeft: "auto", marginRight: "5%", color: "black" }}
          >
            <label>{session.user.name}</label>
            <p>{score} XP</p>
          </div>
        </div>

        <div className="DashboardContainer">
          <h3 className="DashboardSubTitle">Meus Cursos</h3>

          <div className="cursosContainer">
            <CardCurso
              title="Novo Curso"
              organization="ANBU"
              description="Como se tornar um ninja"
              path="/dashboard"
            />
            <CardCurso
              title="Novo Curso"
              organization="ANBU"
              description="Como se tornar um ninja"
              path="/dashboard"
            />
            <CardCurso
              title="Novo Curso"
              organization="ANBU"
              description="Como se tornar um ninja"
              path="/dashboard"
            />
          </div>
        </div>
      </Base>
      {/*<div className="DashboardCardContainer">
            <Cards
              title="SAMU"
              cardColor1="#A564E5"
              cardColor2="#9244E3"
              date="20/10/2020"
              hour="20:00"
              path={`/cadastrar/aula?course=3acce2d3-f52a-4cf0-bdc3-38c2621e46ca`}
            />
            <Cards
              title="UPA"
              cardColor1="#6AA1E4"
              cardColor2="#686AE9"
              date="20/10/2020"
              hour="20:00"
            />
            <Cards
              title="Bombeiros"
              cardColor1="#FD88A4"
              cardColor2="#EE3763"
              date="20/10/2020"
              hour="20:00"
            />
          </div> */}
    </>
  );
}
