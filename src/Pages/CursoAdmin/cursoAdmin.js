import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { message, Tabs, Table, Input, Popconfirm, Tooltip, Modal } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState();
  const [editData, setEditData] = useState({});

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

  const contentTable = [
    {
      title: "Título",
      dataIndex: "name",
    },
    {
      title: "Descrição",
      dataIndex: "description",
    },
    {
      title: "Data",
      dataIndex: "date",
    },
    {
      title: "Ações",
      dataIndex: "id",
      render: (id) => (
        <>
          <EyeOutlined className="editButton" onClick={() => handleVisit(id)} />
          <Popconfirm title="Editar item?" onConfirm={() => startEdit(id)}>
            <EditOutlined className="editButton" />
          </Popconfirm>
          <Popconfirm title="Excluir item?" onConfirm={() => handleDelete(id)}>
            <DeleteOutlined className="editButton" />
          </Popconfirm>
        </>
      ),
    },
  ];

  const classTable = [
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "Descrição",
      dataIndex: "description",
    },
    {
      title: "Organização",
      dataIndex: "organization_name",
    },
    {
      title: "Ações",
      dataIndex: "id",
      render: (id) => (
        <>
          <EyeOutlined className="editButton" onClick={() => handleVisit(id)} />
          <Popconfirm title="Editar item?" onConfirm={() => startEdit(id)}>
            <EditOutlined className="editButton" />
          </Popconfirm>
          <Popconfirm title="Excluir item?" onConfirm={() => handleDelete(id)}>
            <DeleteOutlined className="editButton" />
          </Popconfirm>
        </>
      ),
    },
  ];

  function startEdit(id) {
    setId(id);
    setIsModalVisible(true);
  }

  function getData() {
    setLoading(true);

    api
      .get(`/course/${course_id}`, config)
      .then((response) => {
        setCourse(response.data);
        requestDone();
      })
      .catch(() => {
        message.error("Não foi possível carregar curso");
      });

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
        console.log({ lessons });
        console.log(course_id);

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

        console.log({ lives });
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

        console.log({ classes });
        setClasses(classes);
        requestDone(classes);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das aulas");
      });
  }

  useEffect(() => {
    getData();
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

  function handleEditChange(e) {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }

  function handleEdit(id) {
    let route;
    if (activeTab === 0) route = "/lesson";
    if (activeTab === 1) route = "/live";
    if (activeTab === 2) route = "/class";

    console.log(editData);

    api
      .put(route, { ...editData, id }, config)
      .then(() => {
        message.success("Alteração concluída com sucesso");
        getData();
        setIsModalVisible(false);
      })
      .catch(() => {
        message.error("Não foi possível alterar dados.");
      })
      .finally(() => setLoading(false));
  }

  function handleVisit(id) {
    const requests = ["aula", "live", "turma"];
    history.push(`/${requests[activeTab]}/${id}`);
  }

  return (
    <Base>
      <div className="pageBody">
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
                <Tooltip title="Adicionar Turma">
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
                columns={contentTable}
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
                <Tooltip title="Adicionar Turma">
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
                columns={contentTable}
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

      <Modal
        title={id}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => handleEdit(id)}
      >
        <Input
          placeholder="Nome"
          name="name"
          value={editData["name"]}
          onChange={handleEditChange}
        />
        <Input
          placeholder="Descrição"
          name="description"
          value={editData["description"]}
          onChange={handleEditChange}
        />
      </Modal>
    </Base>
  );
}
