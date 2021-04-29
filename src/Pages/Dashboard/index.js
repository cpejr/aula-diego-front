import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import CardCurso from "../../Components/CardCurso/CardCurso";
import TabelaAtividades from "../../Components/TabelaAtividades/TabelaAtividades";
import "./index.css";
import { useSession } from "../../Context/SessionContext";
import api from "../../services/api";
import { message, Carousel, Timeline } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { LeftOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";

export default function Dashboard(props) {
  const [organization, setOrganization] = useState([]);
  const [score, setScore] = useState(0);
  const { session } = useSession();
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          color: "black",
          fontSize: "25px",
          lineHeight: "1.5715",
        }}
        onClick={onClick}
      >
        <RightOutlined />
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          color: "black",
          fontSize: "25px",
          lineHeight: "1.5715",
        }}
        onClick={onClick}
      >
        <LeftOutlined />
      </div>
    );
  };

  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

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
          <h1 style={{ fontWeight: 600, marginLeft: "15px" }}>
            {organization.name}
          </h1>
          <div
            style={{ marginLeft: "auto", marginRight: "5%", color: "black" }}
          >
            <label>{session.user.name}</label>
            <p>{score} XP</p>
          </div>
        </div>
        <div className="DashboardContainer">
          <h3 className="DashboardSubTitle">Meus Cursos</h3>
          <Carousel
            arrows
            {...settings}
            dots={false}
            className="carouselMobile"
          >
            <div className="cursosContainer">
              <div className="centralize">
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
                <CardCurso
                  title="{course.course_name}"
                  organization="{course. organization_ name}"
                  description="{course.course_description}"
                />
                <CardCurso
                  title="{course.course_name}"
                  organization="{course.organization_name}"
                  description="{course.course_description}"
                />
              </div>
            </div>
            <div className="cursosContainer">
              <div className="centralize">
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
                <CardCurso
                  title="{course.course_name}"
                  organization="{course.organization_name}"
                  description="{course.course_description}"
                />
                <CardCurso
                  title="{course.course_name}"
                  organization="{course.organization_name}"
                  description="{course.course_description}"
                />
              </div>
            </div>
            {/*<div className="cursosContainer">
                <div style={{ display: "flex", margin: "0% 5%" }}>
                  <div>
                    <CardCurso
                      title="{course.course_name}"
                      organization="{course.organization_name}"
                      description="{course.course_description}"
                    />
                  </div>
                  <div>
                    <CardCurso
                      title="{course.course_name}"
                      organization="{course.organization_name}"
                      description="{course.course_description}"
                    />
                  </div>
                  <div>
                    <CardCurso
                      title="{course.course_name}"
                      organization="{course.organization_name}"
                      description="{course.course_description}"
                    />
                  </div>
                </div>
              </div>
              <div className="cursosContainer">
                <div style={{ display: "flex", margin: "0% 5%" }}>
                  <div>
                    <CardCurso
                      title="{course.course_name}"
                      organization="{course.organization_name}"
                      description="{course.course_description}"
                    />
                  </div>
                  <div>
                    <CardCurso
                      title="{course.course_name}"
                      organization="{course.organization_name}"
                      description="{course.course_description}"
                    />
                  </div>
                  <div>
                    <CardCurso
                      title="{course.course_name}"
                      organization="{course.organization_name}"
                      description="{course.course_description}"
                    />
                  </div>
                </div>
              </div>
              <div className="cursosContainer">
                <div style={{ display: "flex", margin: "0% 5%" }}>
                  <div>
                    <CardCurso
                      title="{course.course_name}"
                      organization="{course.organization_name}"
                      description="{course.course_description}"
                    />
                  </div>
                  <div>
                    <CardCurso
                      title="{course.course_name}"
                      organization="{course.organization_name}"
                      description="{course.course_description}"
                    />
                  </div>
                  <div>
                    <CardCurso
                      title="{course.course_name}"
                      organization="{course.organization_name}"
                      description="{course.course_description}"
                    />
                  </div>
                </div>
              </div>*/}
          </Carousel>

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
    </>
  );
}
