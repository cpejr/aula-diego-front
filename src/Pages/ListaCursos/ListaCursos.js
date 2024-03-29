/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Table, Input, Tooltip, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ActionButton from "../../Components/ActionButton/actionButton";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./ListaCursos.css";
import handleError from "../../utils/handleError";

export default function ListaOrganizacoes() {
  const [course, setCourse] = useState([]);
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
    if (session.user.type === "admin")
      config.params = { organization_id: session.user.organization_id };

    api
      .get(`/course`, config)
      .then((response) => {
        setCourse(response.data);
        setFiltered(response.data);
      })
      .catch((err) => {
        handleError(err, "Não foi possível carregar dados dos cursos");
      })
      .finally(() => setLoading(false));
  }, [session]);

  const columns = [
    {
      title: <h5>Nome</h5>,
      dataIndex: "name",
      width: "20%",
    },
    {
      title: <h5>Descrição</h5>,
      className: "column-description",
      dataIndex: "description",
    },
    {
      title: <h5>Organização</h5>,
      dataIndex: "organization_name",
      width: "25%",
      align: "center",
      key: "tags",
    },
    {
      title: <h5>Ações</h5>,
      dataIndex: "id",
      className: "column-action",

      render: (id) => (
        <>
          <ActionButton
            title="Editar"
            confirm="Editar curso?"
            onConfirm={() => history.push(`/curso/gerenciar/${id}`)}
          >
            <EditOutlined />
          </ActionButton>
          <ActionButton
            title="Excluir"
            confirm="Excluir curso?"
            onConfirm={() => handleDelete(id)}
          >
            <DeleteOutlined />
          </ActionButton>
        </>
      ),
    },
  ];

  function handleSearch(value) {
    setFiltered(
      course.filter((data) => {
        if (value === "") return data;
        return (
          data.name.toLowerCase().includes(value.toLowerCase()) ||
          data.description.toLowerCase().includes(value.toLowerCase()) ||
          data.organization_name.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }

  function handleDelete(course_id) {
    setLoading(true);
    api
      .delete(`/course/${course_id}`, config)
      .then(() => message.success("Deletado com sucesso"))
      .then(() => {
        if (session.user.type === "admin")
          config.params = { organization_id: session.user.organization_id };

        api
          .get("/course", config)
          .then((response) => {
            setCourse(response.data);
            setFiltered(response.data);
            setLoading(false);
          })
          .catch((err) => {
            handleError(err, "Não foi possível excluir");
          });
      })
      .catch((err) => {
        handleError(err, "Não foi possível excluir");
      })
      .finally(() => setLoading(false));
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
              onClick={() => history.push("/curso/cadastro")}
            />
          </Tooltip>
        </div>
        <Table columns={columns} dataSource={filtered} loading={loading} />
      </div>
    </Base>
  );
}
