import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Timeline, Divider, Card, Statistic } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  ProfileOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./Admin.css";

import building from "../../images/building.png";
import handleError from "../../utils/handleError";

export default function Admin() {
  const [approved, setApproved] = useState([]);
  const [pending, setPending] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [past, setPast] = useState(false);
  const [future, setFuture] = useState(false);

  const { session } = useSession();
  const history = useHistory();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    api
      .get(`/user`, {
        ...config,
        params: { "user.organization_id": session.user.organization_id },
      })
      .then((response) => {
        let app = 0;
        let pen = 0;

        // eslint-disable-next-line array-callback-return
        response.data.map((student) => {
          if (student.status === "approved") app += 1;
          if (student.status === "pending") pen += 1;
        });

        setApproved(app);
        setPending(pen);
      })
      .catch((err) => {
        handleError(err, "Não foi possível carregar dados dos estudantes");
      });

    api
      .get(`/organization/${session.user.organization_id}`, config)
      .then(async (response) => {
        setOrganization(response.data);
      })
      .catch((err) => {
        handleError(err, "Não foi possível carregar dados das organizações");
      });

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
                  handleError(
                    err,
                    "Não foi possível carregar dados das turmas"
                  );
                });

              await api
                .get(`/course/${id}/all`, config)
                .then((response) => {
                  items.push(...response.data);
                  Promise.resolve("");
                })
                .catch((err) => {
                  handleError(err, "Não foi possível carregar dados das aulas");
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
            .slice(-20);

          const now = Date.now();

          setPast(sorted.filter((item) => (item.time < now ? true : false)));
          setFuture(sorted.filter((item) => (item.time > now ? true : false)));
          setClasses(turmas);
        });

        setCourses(response.data);
      })
      .catch((err) => {
        handleError(err, "Não foi possível carregar dados das aulas");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Base>
      <div className="adminRoot">
        <div className="adminTitleWrapper">
          <img
            src={organization.logo || building}
            className="adminImg"
            alt="Logo da RecStudio"
          />
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
    </Base>
  );
}
