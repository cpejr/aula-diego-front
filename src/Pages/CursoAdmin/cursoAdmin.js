import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { message, Tabs, Table, Input, Tag, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, SelectOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import ActionButton from "../../Components/ActionButton/actionButton"
import { useSession } from "../../Context/SessionContext";
import "./cursoAdmin.css";

export default function CursoAdmin(props) {
  const [course, setCourse] = useState();
  const [lessons, setLessons] = useState([]);
  const [lives, setLives] = useState([]);
  const [classes, setClasses] = useState([]);
  const [exams, setExams] = useState([]);

  const [done, setDone] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selected, setSelected] = useState([]);

  const history = useHistory();
  const course_id = props.match.params.id;
  const { session } = useSession();
  const { TabPane } = Tabs;

  let requests = 0;

  const requestDone = (data) => {
    requests += 1;

    if (requests == 4) setDone(true);
  };

  useEffect(() => {
    if (done === true) {
      const tabs = [lessons, lives, exams, classes];

      setTabs(tabs);
      setFiltered(tabs[activeTab]);
      setLoading(false);
    }
  }, [done]);

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  const configTables = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    params: {
      course_id: course_id,
    },
  };

  const generalTable = [
    {
      title: <h5>Título</h5>,
      dataIndex: "name",
      width: "25%",
    },
    {
      title: <h5>Descrição</h5>,
      dataIndex: "description",
      width: "35%",
    },
  ];

  const lessonTable = [
    ...generalTable,
    {
      title: <h5>Data</h5>,
      dataIndex: "date",
      width: "20%",
    },

    {
      title: <h5>Ações</h5>,
      dataIndex: "id",
      width: "15%",
      render: (id) => (
        <>
          <ActionButton title="Visitar" confirm="Visitar aula?" onConfirm={() => history.push(`/aula/${id}`)}>
            <SelectOutlined className="actionButton" />
          </ActionButton>
          <ActionButton title="Editar" confirm="Editar aula?" onConfirm = {() => history.push(`/aula/editar/${id}`)}>
            <EditOutlined className="actionButton" />
          </ActionButton>
          <ActionButton
            title="Deletar"
            confirm="Deletar aula?"
            onConfirm={() => handleDelete(id)}
          >
            <DeleteOutlined className="actionButton" />
          </ActionButton>
        </>
      ),
    },
  ];

  const liveTable = [
    ...generalTable,
    {
      title: <h5>Data</h5>,
      dataIndex: "date",
      width: "20%",
    },
    {
      title: <h5>Ações</h5>,
      dataIndex: "id",
      width: "15%",
      render: (id) => (
        <>
          <ActionButton title="Visitar" confirm="Visitar live?" onConfirm={() => history.push(`/live/${id}`)}>
            <SelectOutlined className="actionButton" />
          </ActionButton>
          <ActionButton title="Editar" confirm="Editar live?" onConfirm = {() => history.push(`/live/editar/${id}`)}>
            <EditOutlined className="actionButton" />
          </ActionButton>
          <ActionButton
            title="Deletar"
            confirm="Deletar live?"
            onConfirm={() => handleDelete(id)}
          >
            <DeleteOutlined className="actionButton" />
          </ActionButton>
        </>
      ),
    },
  ];

  const classTable = [
    ...generalTable,
    {
      title: "Ações",
      dataIndex: "id",
      width: "15%",
      render: (id) => (
        <>
          <ActionButton title="Visitar" confirm="Visitar turma?" onConfirm={() => history.push(`/turma/${id}`)}>
            <SelectOutlined className="actionButton" />
          </ActionButton>
          <ActionButton title="Editar" confirm="Editar turma?" onConfirm = {() => history.push(`/turma/editar/${id}`)}>
            <EditOutlined className="actionButton" />
          </ActionButton>
          <ActionButton
            title="Deletar"
            confirm="Deletar turma?"
            onConfirm={() => handleDelete(id)}
          >
            <DeleteOutlined className="actionButton" />
          </ActionButton>
        </>
      ),
    },
  ];

  const examTable = [
    {
      title: <h5>Título</h5>,
      dataIndex: "name",
      width: "20%",
    },
    {
      title: <h5>Curso</h5>,
      dataIndex: "course_name",
      width: "20%",
    },
    {
      title: <h5>Início</h5>,
      dataIndex: "start_date",
      width: "15%",
    },
    {
      title: <h5>Término</h5>,
      dataIndex: "end_date",
      width: "15%",
    },
    {
      title: <h5>Status</h5>,
      dataIndex: "status",
      width: "15%",
      render: (status) => (
        <>
          {status === "open" &&
            <Tag color="green">Aberta</Tag>
          }
          {status === "hidden" &&
            <Tag color="default">Oculta</Tag>
          }
          {status === "closed" &&
            <Tag color="red">Finalizada</Tag>
          }
        </>
      )
    },
    {
      title: <h5>Ações</h5>,
      dataIndex: ("id"),
      width: "15%",
      render: (id, exam) => (
        <>
          {exam.status === "hidden" &&
            <ActionButton title="Publicar" confirm="Publicar prova?" onConfirm={() => handlePublish(id)}>
              <CheckCircleOutlined />
            </ActionButton>
          }
          {exam.status === "open" &&
            <ActionButton title="Fechar" confirm="Fechar prova?" onConfirm={() => handleClose(id)}>
              <CloseCircleOutlined />
            </ActionButton>
          }
          {exam.status === "closed" &&
            <ActionButton title="Extender" confirm="Extender tempo de prova?" /* onConfirm={() => handlePublish(id)} */>
              <ClockCircleOutlined />
            </ActionButton>
          }
          <ActionButton title="Visualizar" confirm="Visualizar prova?" onConfirm={() => history.push(`/prova/${id}`)}>
            <SelectOutlined />
          </ActionButton>
          <ActionButton title="Editar" confirm="Editar prova?" onConfirm={() => history.push(`/prova/editar/${id}`)}>
            <EditOutlined />
          </ActionButton>
          <ActionButton title="Exluir" confirm="Excluir prova?" onConfirm={() => handleDelete(id)}>
            <DeleteOutlined />
          </ActionButton>
        </>
      ),
    },
  ];

  function getData() {
    requests = 0;
    setLoading(true);
    setDone(false);

    api
      .get(`/lesson`, configTables)
      .then((response) => {
        const lessons = [];
        console.log(response);
        response.data.map((lesson) =>
          lessons.push({
            ...lesson,
            date: new Date(lesson.created_at).toLocaleDateString("pt-BR"),
            key: lesson.id,
          })
        );

        setLessons(lessons);
        requestDone(lessons);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das aulas");
      });

    api
      .get(`/live`, configTables)
      .then((response) => {
        const lives = [];
        console.log(response.data);
        response.data.map((live) =>
          lives.push({
            ...live,
            date: new Date(live.date).toLocaleDateString("pt-BR"),
            key: live.id,
          })
        );

        setLives(lives);
        requestDone(lives);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das lives");
      });

    api
      .get(`/class`, configTables)
      .then((response) => {
        const classes = [];
        console.log(response);
        response.data.map((cl4ss) => 
        classes.push({ 
          ...cl4ss,
          date: new Date(cl4ss.created_at).toLocaleDateString("pt-BR"),
          key: cl4ss.id }));

        setClasses(classes);
        requestDone(classes);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das aulas");
      });

    api
      .get(`/exam`, config)
      .then((response) => {
        const exams = []

        response.data.map(exam => {
          const now = Date.now();
          const end = new Date(exam.end_date);

          let status = exam.open ? "open" : "hidden";

          if (Date.parse(end) < now)
            status = "closed";

          exams.push({
            ...exam,
            start_date: new Date(exam.start_date).toLocaleDateString("pt-BR"),
            end_date: new Date(exam.end_date).toLocaleDateString("pt-BR"),
            status: status
          })
        });

        setExams(exams);
        requestDone(exams);
      })
      .catch((err) => {
        message.error("Não foi possível carregar dados das provas");
      });
  }

  useEffect(() => {
    api
      .get(`/course/${course_id}`, config)
      .then((response) => {
        if (session.user.type === "student" || response.data.organization_id !== session.user.organization_id) {
          message.error("Você não tem permissão para ver esse curso");
          history.push("/")
        }
        else {
          setCourse(response.data);
          getData();
        }
      })
      .catch(() => {
        message.error("Não foi possível carregar curso");
      });
  }, []);

  function handleSearch(value) {
    setSearch(value);
    setFiltered(
      tabs[activeTab].filter((data) => {
        if (value === "") return data;
        return (
          data.name.toLowerCase().includes(value.toLowerCase()) ||
          (data.description !== null &&
            data.description.toString().includes(value)) ||
          (data.organization_name !== undefined &&
            data.organization_name
              .toLowerCase()
              .includes(value.toLowerCase())) ||
          (data.date !== undefined && data.date.includes(value))
        );
      })
    );
  }

  function handleTabChange(key) {
    setActiveTab(key);
    setFiltered(tabs[key]);
  }

  function handleDelete(id) {

    const requests = ["lesson", "live", "exam", "class"];
    const method = [setLessons, setLives, setClasses];
    setLoading(true);

    api
      .delete(`/${requests[activeTab]}/${id}`, config)
      .then(() => message.success("Deletado com sucesso"))
      .then(() => {
        getData();
      })
      .catch((error) => {
        message.error("Não foi possível exluir");
      });
  }

  function handlePublish(id) {

    setLoading(true);

    api
      .put(`/exam/${id}`, {open: true}, config)
      .then(() => {
        message.success("Prova publicada com sucesso");
        getData();
      })
      .catch((err) => message.error("Não foi possível publicar a prova"));
  }

  function handleClose(id) {

    console.log(new Date(Date.now()).toISOString())

    /* api
      .put(`/exam/close/${id}`, {}, config)
      .then(() => {
        message.success("Prova fechada com sucesso");
        getData();
      })
      .catch((err) => message.error("Não foi possível fechar a prova")); */
  }

  /* function getNow() {
    let now = new Date(Date.now()).toISOString();
    console.log(now)
    now = now.slice(0, -5)
    now = now.replace('T', ' ')
    console.log(now)
  } */

  function handleEdit(id) {
    const requests = ["aula", "live", "prova", "turma"];
    history.push(`/${requests[activeTab]}/editar/${id}`);
  }

  return (
    <Base>
      <div className="pageBodyCurso">
        {course !== undefined ? <h1>{course.name}</h1> : <></>}
        <h5>Gerenciar</h5>
        <div className="tabsWrapper">
          <Tabs defaultActiveKey="0" onChange={handleTabChange}>
            <TabPane tab="Aulas" key="0">
              <div className="inputWrapper">
                <Input
                  className="search"
                  placeholder="Pesquisar..."
                  onChange={(e) => handleSearch(e.target.value)}
                  value={search}
                />
                <Tooltip title="Adicionar Aula">
                  <PlusOutlined
                    className="addButton"
                    onClick={() =>
                      history.push(`/aula/cadastro?course=${course.id}`)
                    }
                  />
                </Tooltip>
              </div>
              <Table
                rowSelection={selected}
                columns={lessonTable}
                dataSource={filtered}
                loading={loading}
              />
            </TabPane>
            <TabPane tab="Lives" key="1">
              <div className="inputWrapper">
                <Input
                  className="search"
                  placeholder="Pesquisar..."
                  onChange={(e) => handleSearch(e.target.value)}
                  value={search}
                />
                <Tooltip title="Adicionar Live">
                  <PlusOutlined
                    className="addButton"
                    onClick={() =>
                      history.push(`/live/cadastro?course=${course.id}`)
                    }
                  />
                </Tooltip>
              </div>
              <Table
                rowSelection={selected}
                columns={liveTable}
                dataSource={filtered}
                loading={loading}
              />
            </TabPane>
            <TabPane tab="Provas" key="2">
              <div className="inputWrapper">
                <Input
                  className="search"
                  placeholder="Pesquisar..."
                  onChange={(e) => handleSearch(e.target.value)}
                  value={search}
                />
                <Tooltip title="Adicionar prova">
                  <PlusOutlined
                    className="addButton"
                    onClick={() =>
                      history.push(`/prova/cadastro?course=${course.id}`)
                    }
                  />
                </Tooltip>
              </div>
              <Table
                rowSelection={selected}
                columns={examTable}
                dataSource={filtered}
                loading={loading}
              />
            </TabPane>
            <TabPane tab="Turmas" key="3">
              <div className="inputWrapper">
                <Input
                  className="search"
                  placeholder="Pesquisar..."
                  onChange={(e) => handleSearch(e.target.value)}
                  value={search}
                />
                <Tooltip title="Adicionar Turma">
                  <PlusOutlined
                    className="addButton"
                    onClick={() =>
                      history.push(`/turma/cadastro?course=${course.id}`)
                    }
                  />
                </Tooltip>
              </div>
              <Table
                rowSelection={selected}
                columns={classTable}
                dataSource={filtered}
                loading={loading}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Base>
  );
}
