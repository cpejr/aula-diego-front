import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import CardCurso from "../../Components/CardCurso/CardCurso";
import TabelaAtividades from "../../Components/TabelaAtividades/TabelaAtividades";
import "./index.css";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { message, Carousel, Timeline, Divider } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import {
  LeftOutlined,
  RightOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

export default function Dashboard(props) {
  const [organization, setOrganization] = useState([]);
  const { session } = useSession();
  const history = useHistory();

  const [courses, setCourses] = useState([]);
  const [past, setPast] = useState(false);
  const [future, setFuture] = useState(false);
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
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,

    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  const configCourse = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    params: {
      organization_id: session.user.organization_id,
    },
  };

  useEffect(() => {
    api
      .get(`/course/user/${session.user.id}`, configCourse)
      .then((response) => {
        setCourses(response.data);
        console.log(response.data);
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
        });
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das organizações");
      });

    const list = [];

    api
      .get(`/course`, {
        ...config,
        params: { organization_id: session.user.organization_id },
      })
      .then((response) => {
        const turmas = [];
        const items = [];

        Promise.all(
          response.data
            .map((course) => course.id)
            .map(async (id) => {
              api
                .get(`/class`, { ...config, params: { course_id: id } })
                .then((response) => turmas.push(...response.data))
                .catch((err) => {
                  message.error("Não foi possível carregar dados das turmas");
                });

              await api
                .get(`/course/${id}/all`, config)
                .then((response) => {
                  items.push(...response.data);
                  Promise.resolve("");
                })
                .catch((err) => {
                  message.error("Não foi possível carregar dados das aulas");
                });
            })
        ).then(() => {
          const sorted = items
            .map((item) => {
              let color = "RoyalBlue";
              let url = "/aula";

              if (item.type === "live") {
                color = "Purple";
                url = "/live";
              }

              if (item.type === "exercise-start")
                return {
                  ...item,
                  name: `${item.name} - Início`,
                  time: new Date(item.date).getTime(),
                  date: new Date(item.date).toLocaleDateString("pt-BR"),
                  color: "Pink",
                  link: `/atividade/responder/${item.id}`,
                };

              if (item.type === "exercise-end")
                return {
                  ...item,
                  name: `${item.name} - Fim`,
                  time: new Date(item.date).getTime(),
                  date: new Date(item.date).toLocaleDateString("pt-BR"),
                  color: "PaleVioletRed",
                  link: `/atividade/responder/${item.id}`,
                };

              return {
                ...item,
                time: new Date(item.date).getTime(),
                date: new Date(item.date).toLocaleDateString("pt-BR"),
                color: color,
                link: `${url}/${item.id}`,
              };
            })
            .sort((a, b) => a.time - b.time)
            .filter((item) => (item.type === "class" ? false : true))
            .slice(0, 20);

          const now = Date.now();

          setPast(sorted.filter((item) => (item.time < now ? true : false)));
          setFuture(sorted.filter((item) => (item.time > now ? true : false)));
          setClasses(turmas);
        });

        setCourses(response.data);
      })
      .catch((err) => {
        message.error("Não foi possível carregar dados das aulas");
      });
  }, []);

  const getLogo = async (organizations) => {
    const result = [];
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
            <p>{session.user.score} XP</p>
          </div>
        </div>
        <div className="DashboardContainer">
          <h3 className="DashboardSubTitle">Meus Cursos</h3>
          <Carousel
            arrows
            nextArrow={<RightOutlined />}
            prevArrow={<LeftOutlined />}
            responsive
            {...settings}
            className="carouselMobile"
          >
            {courses
              ? courses.map((course) => {
                  return (
                    <CardCurso
                      title={course.name}
                      organization={course.organization_name}
                      description={course.description}
                      path={
                        session.user.type === "student"
                          ? `/curso/${course.id}`
                          : `/curso/gerenciar/${course.id}`
                      }
                    />
                  );
                })
              : null}
          </Carousel>

          <h3 className="DashboardSubTitle">Próximas Atividades</h3>
          <div className="adminTimelinesWrapper">
            <div className="adminTimelineFuture">
              <Timeline mode={"left"} reverse={true}>
                {future &&
                  future.map((item) => (
                    <Timeline.Item
                      label={`${item.course_name} - ${item.date}`}
                      color={item.color}
                    >
                      <div
                        className="adminLink"
                        onClick={() => history.push(item.link)}
                      >
                        {item.name}
                      </div>
                    </Timeline.Item>
                  ))}
              </Timeline>
            </div>
            <div style={{ width: "30%", margin: "auto" }}>
              <Divider style={{ marginBottom: "60px", marginTop: "0px" }}>
                <ClockCircleOutlined />
              </Divider>
            </div>
            <div className="adminTimelinePast">
              <Timeline mode={"right"} reverse={true}>
                {past &&
                  past.map((item) => (
                    <Timeline.Item
                      label={`${item.course_name} - ${item.date}`}
                      color={item.color}
                    >
                      <div
                        className="adminLink"
                        onClick={() => history.push(item.link)}
                      >
                        {item.name}
                      </div>
                    </Timeline.Item>
                  ))}
              </Timeline>
            </div>
          </div>
        </div>
      </Base>
    </>
  );
}
