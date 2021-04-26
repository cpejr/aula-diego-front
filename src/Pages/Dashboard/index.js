import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import CardCurso from "../../Components/CardCurso/CardCurso";
import TabelaAtividades from "../../Components/TabelaAtividades/TabelaAtividades";
import "./index.css";
import { useSession } from "../../Context/SessionContext";
import api from "../../services/api";
import { message, Carousel, Timeline } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";

export default function Dashboard(props) {
  const [organization, setOrganization] = useState([]);
  const [score, setScore] = useState(0);
  const { session } = useSession();
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);

  const configCourse = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    params: {
      "course.organization_id": session.user.organization_id,
    },
  };

  useEffect(() => {
    api
      .get(`/course/user/${session.user.id}`, configCourse)
      .then((response) => {
        console.log(response);
        setCourses(response.data);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados dos cursos");
      });
  }, []);

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
            {courses
              ? courses.map((course) => {
                  return (
                    <CardCurso
                      title={course.course_name}
                      organization={course.organization_name}
                      description={course.course_description}
                      path={
                        session.user.type === "student"
                          ? `/curso/${course.course_id}`
                          : `/curso/gerenciar/${course.course_id}`
                      }
                    />
                  );
                })
              : null}
          </div>

          <h3 className="DashboardSubTitle">Próximas Atividades</h3>
          <Timeline style={{ margin: "3%", fontSize: "100px" }}>
            <Timeline.Item color="green">
              Create a services site 2015-09-01
            </Timeline.Item>
            <Timeline.Item color="green">
              Create a services site 2015-09-01
            </Timeline.Item>
            <Timeline.Item color="red">
              <p>Solve initial network problems 1</p>
              <p>Solve initial network problems 2</p>
              <p>Solve initial network problems 3 2015-09-01</p>
            </Timeline.Item>
            <Timeline.Item>
              <p>Technical testing 1</p>
              <p>Technical testing 2</p>
              <p>Technical testing 3 2015-09-01</p>
            </Timeline.Item>
            <Timeline.Item color="gray">
              <p>Technical testing 1</p>
              <p>Technical testing 2</p>
              <p>Technical testing 3 2015-09-01</p>
            </Timeline.Item>
            <Timeline.Item color="gray">
              <p>Technical testing 1</p>
              <p>Technical testing 2</p>
              <p>Technical testing 3 2015-09-01</p>
            </Timeline.Item>
          </Timeline>
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
