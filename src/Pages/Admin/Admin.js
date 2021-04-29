import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { message, Timeline, Divider, Card, Statistic } from "antd";
import { UserOutlined, ClockCircleOutlined, ExclamationCircleOutlined, ProfileOutlined, TeamOutlined } from "@ant-design/icons"
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./Admin.css";


export default function Admin() {

  const [approved, setApproved] = useState([]);
  const [pending, setPending] = useState([]);
  const [courses, setCourses] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [past, setPast] = useState(false);
  const [future, setFuture] = useState(false);

  const { session } = useSession();
  const history = useHistory();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    }
  };

  const configFile = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    responseType: "blob",
  };

  useEffect(() => {
    api
      .get(`/user`, { ...config, params: { "user.organization_id": session.user.organization_id } })
      .then(response => {
        let app = 0;
        let pen = 0;

        response.data.map(student => {
          if (student.status === 'approved') app += 1;
          if (student.status === 'pending') pen += 1;
        });

        setApproved(app);
        setPending(pen);
      })
      .catch(err => { message.error("Não foi possível carregar dados dos estudantes"); })

    api
      .get(`/organization/${session.user.organization_id}`, config)
      .then(async response => {
        console.log(response.data)
        await api
          .get(`/file_get/${response.data.file_id}`, configFile)
          .then(file => {
            const image = URL.createObjectURL(file.data);
            setOrganization({
              ...response.data,
              logo: image
            });
          })
          .catch(err => { message.error("Não foi possível carregar dados dos arquivos") });
      })
      .catch(err => { message.error("Não foi possível carregar dados das organizações") });

    const list = []

    api
      .get(`/course`, { ...config, params: { organization_id: session.user.organization_id } })
      .then(response => {
        Promise.all(response.data.map(course => course.id).map(async id => {
          await api
            .get(`/course/${id}/all`, config)
            .then(response => { list.push(...response.data); Promise.resolve("") })
            .catch(err => { message.error("Não foi possível carregar dados das aulas"); })
        }))
          .then(() => {
            const sorted = (
              list.map(item => {
                let color = 'RoyalBlue'
                if (item.type === 'live') color = 'Purple'

                if (item.type === "exercise-start")
                  return {
                    ...item,
                    name: `${item.name} - Início`,
                    time: new Date(item.date).getTime(),
                    date: new Date(item.date).toLocaleDateString("pt-BR"),
                    color: 'Pink'
                  }

                if (item.type === "exercise-end")
                  return {
                    ...item,
                    name: `${item.name} - Fim`,
                    time: new Date(item.date).getTime(),
                    date: new Date(item.date).toLocaleDateString("pt-BR"),
                    color: 'PaleVioletRed'
                  }

                return {
                  ...item,
                  time: new Date(item.date).getTime(),
                  date: new Date(item.date).toLocaleDateString("pt-BR"),
                  color: color
                }
              })
                .sort((a, b) => (a.time - b.time))
                .filter(item => item.type === 'class' ? false : true)
                .slice(0, 20)
            )

            const now = Date.now();

            setPast(sorted.filter(item => item.time < now ? true : false));
            setFuture(sorted.filter(item => item.time > now ? true : false));
          })

        setCourses(response.data);
      })
      .catch(err => { message.error("Não foi possível carregar dados das aulas"); })

  }, []);

  return (
    <Base>
      <div className='adminRoot'>
        <div className="adminTitleWrapper">
          <img src={organization.logo} className="adminImg" />
          <h1 className="adminTitle">
            {organization.name}
          </h1>
        </div>
        <Divider />
        <h3>Estatísticas</h3>
        <div className="adminCardsWrapper">
        <Card bordered={false} style={{ width: "20%" }}>
            <Statistic
              title="Estudantes"
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
              value={pending}
              prefix={<ProfileOutlined />}
            />
          </Card>
          <Card bordered={false} style={{ width: "20%" }}>
            <Statistic
              title="Turmas"
              className="adminStatistic"
              value={pending}
              prefix={<TeamOutlined />}
            />
          </Card>
        </div>
        <Divider />
        <h3 className="adminTimelineTitle" >Linha do Tempo</h3>
        <div className="adminTimelinesWrapper" >
          <div className="adminTimelineFuture">
            <Timeline mode={'left'} reverse={true}>
              {future && future.map(item => (
                <Timeline.Item label={`${item.date} - ${item.course_name}`} color={item.color}>{item.name}</Timeline.Item>
              ))}
            </Timeline>
          </div>
          <div style={{ width: "30%", margin: "auto" }}>
            <Divider style={{ marginBottom: "60px", marginTop: "0px" }}>
              <ClockCircleOutlined />
            </Divider>
          </div>
          <div className="adminTimelinePast">
            <Timeline mode={'right'} reverse={true}>
              {past && past.map(item => (
                <Timeline.Item label={`${item.course_name} - ${item.date}`} color={item.color}>{item.name}</Timeline.Item>
              ))}
            </Timeline>
          </div>
        </div>
      </div>
    </Base>
  );
}
