import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { message, Timeline, Divider, Card, Statistic } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  ProfileOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./Master.css";
import { CallMissedSharp } from "@material-ui/icons";

export default function Master() {
  const [approved, setApproved] = useState(false);
  const [pending, setPending] = useState(false);
  const [courses, setCourses] = useState(false);
  const [classes, setClasses] = useState(false);
  const [organization, setOrganization] = useState(false);
  const [past, setPast] = useState(false);
  const [future, setFuture] = useState(false);

  const [loading, setLoading] = useState(true);

  const { session } = useSession();
  const history = useHistory();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
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
      .get(`/user`, config)
      .then((response) => {
        let app = 0;
        let pen = 0;

        response.data.map((student) => {
          if (student.status === "approved") app += 1;
          if (student.status === "pending") pen += 1;
        });

        setApproved(app);
        setPending(pen);
      })
      .catch((err) => {
        message.error("Não foi possível carregar dados dos estudantes");
      });

    api
      .get(`/organization/${session.user.organization_id}`, config)
      .then(async (response) => {
        await api
          .get(`/file_get/${response.data.file_id}`, configFile)
          .then((file) => {
            const image = URL.createObjectURL(file.data);
            setOrganization({
              ...response.data,
              logo: image,
            });
          })
          .catch((err) => {
            message.error("Não foi possível carregar dados dos arquivos");
          });
      })
      .catch((err) => {
        message.error("Não foi possível carregar dados das organizações");
      });

    api
      .get(`/course`, config)
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
            .slice(-30)

          console.log(sorted)

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

  useEffect(() => {

    if (future || past)
      setLoading(false)

  }, [future, past])

  return (
    <Base>
      {!loading &&
        <div className="adminRoot">
          <div className="adminTitleWrapper">
            <img src={organization.logo} className="adminImg" />
            <h1 className="adminTitle">{organization.name}</h1>
          </div>
          <Divider />
          <h3>Estatísticas</h3>
          <div className="adminCardsWrapper">
            <Card bordered={false} style={{ width: "20%" }}>
              <Statistic
                title="Usuários na Organização"
                className="adminStatistic"
                value={approved}
                prefix={<UserOutlined />}
              />
            </Card>
            <Card bordered={false} style={{ width: "20%" }}>
              <Statistic
                title="Pendentes"
                className="adminStatistic"
                value={pending}
                prefix={<ExclamationCircleOutlined />}
              />
            </Card>
            <Card bordered={false} style={{ width: "20%" }}>
              <Statistic
                title="Cursos"
                className="adminStatistic"
                value={courses.length}
                prefix={<ProfileOutlined />}
              />
            </Card>
            <Card bordered={false} style={{ width: "20%" }}>
              <Statistic
                title="Turmas"
                className="adminStatistic"
                value={classes.length}
                prefix={<TeamOutlined />}
              />
            </Card>
          </div>
          <Divider />
          <h3 className="adminTimelineTitle">Linha do Tempo</h3>
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
      }
    </Base>
  );
}
