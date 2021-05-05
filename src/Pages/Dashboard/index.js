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
  
  const [score, setScore] = useState(0);
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [past, setPast] = useState(false);
  const [future, setFuture] = useState(false);

  let slides;

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

    dots: false,

    responsive: [
      {
        breakpoint: 1170,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 810,
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
      .get(`/user/${session.user.id}`, config)
      .then((response) => {
        
        setScore(response.data.score);
        
      })
      .catch(() => {
        message.error("Não foi possível carregar dados do usuário");
      });
    api
      .get(`/course/user/${session.user.id}`, configCourse)
      .then((response) => {
        setMyCourses(response.data);
        
      })
      .catch(() => {
        message.error("Não foi possível carregar dados dos cursos");
      });
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

    api
      .get(`/class_user`, {
        ...config,
        params: { user_id: session.user.id },
      })
      .then((response) => {
       

        const items = [];

        Promise.all(
          response.data
            .map((item) => item.course_id)
            .map(async (id) => {
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
          message.error("Não foi possível carregar dados dos arquivos");
        });
    }

    return result;
  };

  slides = myCourses.length < 3 ? myCourses.length : 3;

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
            <p>{score*20} XP</p>
          </div>
        </div>
        <div className="DashboardContainer">
          <h3 className="DashboardSubTitle">Meus Cursos</h3>
          <Carousel
            arrows
            responsive
            {...settings}
            className="carouselMobile"
            slidesToShow={slides}
            slidesToScroll={1}
            style={{ marginRight: "0px" }}
          >
            {myCourses
              ? myCourses.map((course) => {
                  return (
                    <CardCurso
                      title={course.course_name}
                      organization={course.organization_name}
                      description={course.course_description}
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
