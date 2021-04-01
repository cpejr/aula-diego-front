import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Table, Tag, Input, Tooltip, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ActionButton from "../../Components/ActionButton/actionButton"
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./ListaCursos.css";


export default function ListaOrganizacoes() {
  const [course, setCourse] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
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
      config.params = { organization_id: session.user.organization_id }

    api
      .get(`/course`, config)
      .then((response) => {
        setCourse(response.data);
        setFiltered(response.data)
        setLoading(false);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados dos cursos");
      });
  }, [session]);

  const columns = [
    {
      title: <h5>Nome</h5>,
      dataIndex: "name",
      width: "20%",
    },
    {
      title: <h5>Descrição</h5>,
      dataIndex: "description",
    },
    {
      title: <h5>Organização</h5>,
      dataIndex: "organization",
      width: "25%",
      key: "tags",
      render: (tag) => {
        if (tag) {
          let color = tag.length > 3 ? "geekblue" : "green";
          color = tag.length > 4 ? "coral" : color;
          color = tag.length > 5 ? "volcano" : color;
          color = tag.length > 6 ? "turquoise" : color;
          color = tag.length > 7 ? "yellowgreen" : color;
          color = tag.length > 8 ? "salmon" : color;
          return (
            <Tag
              color={color}
              key={tag}
              className="clickable"
              onClick={() => handleSearch(tag)}
            >
              {" "}
              {tag}{" "}
            </Tag>
          );
        }
        return null;
      }
    },
    {
      title: <h5>Ações</h5>,
      dataIndex: ("id"),
      width: "15%",
      render: (id) => (
        <>
          <ActionButton title="Editar" confirm="Editar organização?">
            <EditOutlined />
          </ActionButton>
          <ActionButton title="Exluir" confirm="Excluir organização?" onConfirm={() => handleDelete(id)}>
            <DeleteOutlined />
          </ActionButton>
        </>
      ),
    },
  ];

  function handleSearch(value) {
    setFiltered(filtered.filter(data => {
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
      .delete(`/course/${course_id}`, config)
      .then(() => message.success("Deletado com sucesso"))
      .then(() => {
        api
          .get("/course", config)
          .then((response) => {
            setCourse(response.data);
            setFiltered(response.data);
            setLoading(false);
          })
          .catch((err) => {message.error("Não foi possível excluir")});
      })
      .catch((err) => {message.error("Não foi possível excluir")});
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
            value={search}
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
