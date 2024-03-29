import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Table, Tag, Input, Tooltip, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ActionButton from "../../Components/ActionButton/actionButton";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import handleError from "../../utils/handleError";
import building from "../../images/building.png";
import "./ListaOrganizacoes.css";

export default function ListaOrganizacoes() {
  const [organizations, setOrganizations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { session } = useSession();
  const history = useHistory();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  function getOrganizations() {
    api
      .get("/organization", config)
      .then((response) => {
        setOrganizations(response.data);
        setFiltered(response.data);
        setLoading(false);
      })
      .catch((err) => {
        handleError(err, "Não foi possível carregar dados das organizações");
      });
  }

  useEffect(() => {
    getOrganizations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: <h5 style={{ textAlign: "center" }}>Logo</h5>,
      dataIndex: "logo",
      width: "10%",
      render: (logo) => (
        <div className="logo">
          <img src={logo || building} alt="logo" />
        </div>
      ),
    },
    {
      title: <h5>Organização</h5>,
      dataIndex: "name",
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
              onClick={() => handleChange(tag)}
            >
              {" "}
              {tag}{" "}
            </Tag>
          );
        }
        return null;
      },
    },
    {
      title: <h5>Descrição</h5>,
      dataIndex: "description",
      className: "column-description",
    },
    {
      title: <h5>Ações</h5>,
      dataIndex: "id",
      render: (id) => (
        <>
          <ActionButton
            title="Editar"
            confirm="Editar organização?"
            onConfirm={() => history.push(`organizacao/editar/${id}`)}
          >
            <EditOutlined />
          </ActionButton>
          <ActionButton
            title="Exluir"
            confirm="Excluir organização?"
            onConfirm={() => handleDelete(id)}
          >
            <DeleteOutlined />
          </ActionButton>
        </>
      ),
    },
  ];

  function handleSearch(value) {
    setSearch(value);
    setFiltered(
      organizations.filter((data) => {
        if (value === "") return data;
        return (
          data?.name?.toLowerCase().includes(value.toLowerCase()) ||
          data?.description?.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }

  function handleDelete(organization_id) {
    setLoading(true);
    api
      .delete(`/organization/${organization_id}`, config)
      .then(() => {
        message.success("Deletado com sucesso");
        getOrganizations();
      })
      .catch((error) => {
        handleError(error, "Não foi possível excluir");
      });
  }

  function handleChange(value) {
    setSearch(value);
  }

  return (
    <Base>
      <h1 className="page-title">Organizações</h1>
      <div className="table-container">
        <div className="inputWrapper">
          <Input
            className="search"
            placeholder="Pesquisar..."
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
          />
          <Tooltip title="Nova Organização">
            <PlusOutlined
              className="addButton"
              onClick={() => history.push("/organizacao/cadastro")}
            />
          </Tooltip>
        </div>
        <Table columns={columns} dataSource={filtered} loading={loading} />
      </div>
    </Base>
  );
}
