import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { message, Tabs, Table, Input, Popconfirm, Tooltip } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import ActionButton from "../../Components/ActionButton/actionButton";
import { useSession } from "../../Context/SessionContext";
import "./cursoAdmin.css";

export default function CursoAdmin(props) {
  const [course, setCourse] = useState();
  const [lessons, setLessons] = useState([]);
  const [lives, setLives] = useState([]);
  const [classes, setClasses] = useState([]);

  const [done, setDone] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(false);

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

    if (requests == 3) setDone(true);
  };

  useEffect(() => {
    if (done === true) {
      setTabs([lessons, lives, classes]);
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
      title: "Título",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      width: "35%",
    },
    {
      title: "Data",
      dataIndex: "date",
      width: "20%",
    },
  ];

  const lessonTable = [
    ...generalTable,
    {
      title: "Ações",
      dataIndex: "id",
      render: (id) => (
        <>
          <ActionButton
            title="Visitar"
            confirm="Visitar aula?"
            onConfirm={() => handleVisit(id)}
          >
            <EyeOutlined className="actionButton" />
          </ActionButton>
          <ActionButton
            title="Editar"
            confirm="Editar aula?"
            onConfirm={() => handleEdit(id)}
          >
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
      title: "Ações",
      dataIndex: "id",
      render: (id) => (
        <>
          <ActionButton
            title="Visitar"
            confirm="Visitar live?"
            onConfirm={() => handleVisit(id)}
          >
            <EyeOutlined className="actionButton" />
          </ActionButton>
          <ActionButton
            title="Editar"
            confirm="Editar live?"
            onConfirm={() => handleEdit(id)}
          >
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
      render: (id) => (
        <>
          <ActionButton
            title="Editar"
            confirm="Editar turma?"
            onConfirm={() => handleEdit(id)}
          >
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

  function getData() {
    setLoading(true);

    api
      .get(`/lesson`, configTables)
      .then((response) => {
        const lessons = [];
        response.data.map((lesson) =>
          lessons.push({
            ...lesson,
            date: new Date(lesson.created_at).toLocaleDateString("pt-BR"),
            key: lesson.id,
          })
        );

        setLessons(lessons);
        setFiltered(lessons);
        requestDone(lessons);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das aulas");
      });

    api
      .get(`/live`, configTables)
      .then((response) => {
        const lives = [];
        response.data.map((live) =>
          lives.push({
            ...live,
            date: new Date(live.created_at).toLocaleDateString("pt-BR"),
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
        response.data.map((cl4ss) => classes.push({ ...cl4ss, key: cl4ss.id }));

        setClasses(classes);
        requestDone(classes);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das aulas");
      });
  }

  useEffect(() => {
    api
      .get(`/course/${course_id}`, config)
      .then((response) => {
        if (
          session.user.type !== "master" &&
          response.data.organization_id === session.user.organization_id
        ) {
          setCourse(response.data);
          getData();
        } else {
          message.error("Você não tem permissão para ver esse curso");
          history.push("/");
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
    setLoading(true);
    setDone(false);

    const requests = ["lesson", "live", "class"];
    const method = [setLessons, setLives, setClasses];

    api
      .delete(`/${requests[activeTab]}/${id}`, config)
      .then(() => message.success("Deletado com sucesso"))
      .then(() => {
        const content = tabs[activeTab].filter((elem) => elem.id !== id);

        method[activeTab](content);
        setFiltered(content);
        setDone(true);
      })
      .catch((error) => {
        message.error("Não foi possível exluir");
      });
  }

  function handleVisit(id) {
    const requests = ["aula", "live", "turma"];
    history.push(`/${requests[activeTab]}/${id}`);
  }

  function handleEdit(id) {
    const requests = ["aula", "live", "turma"];
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
            <TabPane tab="Turmas" key="2">
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
