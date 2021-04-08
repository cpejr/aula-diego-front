import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Table, Tag, Input, Tooltip, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ActionButton from "../../Components/ActionButton/actionButton"
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./ListaProva.css";


export default function ListaOrganizacoes() {
  const [exam, setExam] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const { session } = useSession();
  const history = useHistory();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {

    /* if (session.user.type === "admin")
      config.params = { organization_id: session.user.organization_id } */

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

        setExam(exams);
        setFiltered(exams)
        setLoading(false);
      })
      .catch((err) => {
        message.error("Não foi possível carregar dados das provas");
      });
  }, [session]);

  const columns = [
    {
      title: <h5>Nome</h5>,
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
            <ActionButton title="Publicar" confirm="Publicar prova?" /* onConfirm={() => handlePublish(id)} */>
              <CheckCircleOutlined />
            </ActionButton>
          }
          {exam.status === "open" &&
            <ActionButton title="Fechar" confirm="Fechar prova?" /* onConfirm={() => handlePublish(id)} */>
              <CloseCircleOutlined />
            </ActionButton>
          }
          <ActionButton title="Visualizar" confirm="Visualizar prova?" onConfirm={() => history.push(`/prova/${id}`)}>
            <EyeOutlined />
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

  function handleSearch(value) {
    setFiltered(exam.filter(data => {
      if (value === "") return data;
      return (
        data.name.toLowerCase().includes(value.toLowerCase()) ||
        data.description.toLowerCase().includes(value.toLowerCase()) ||
        data.organization_name.toLowerCase().includes(value.toLowerCase())
      )
    }));
  }

  function handleDelete(course_id) {
    setLoading(true);
    api
      .delete(`/exam/${course_id}`, config)
      .then(() => message.success("Deletado com sucesso"))
      .then(() => {
        api
          .get("/exam", config)
          .then((response) => {
            setExam(response.data);
            setFiltered(response.data);
            setLoading(false);
          })
          .catch((err) => { message.error("Não foi possível excluir") });
      })
      .catch((err) => { message.error("Não foi possível excluir") });
  }

  return (
    <Base>
      <h1 className="page-title">Cursos</h1>
      <div className="table-container">
        <div className="inputWrapper">
          <Input
            className="search"
            placeholder="Pesquisar..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Tooltip title="Novo Curso">
            <PlusOutlined
              className="addButton"
              onClick={() => history.push('/curso/cadastro')}
            />
          </Tooltip>
        </div>
        <Table
          columns={columns}
          dataSource={filtered}
          loading={loading}
        />
      </div>
    </Base>
  );
}
