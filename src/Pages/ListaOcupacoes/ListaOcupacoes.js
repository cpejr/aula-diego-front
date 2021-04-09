import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Table, Input, Popconfirm, message, Tooltip } from "antd";
import Base from "../../Components/Base/Base";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ActionButton from "../../Components/ActionButton/actionButton";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./ListaOcupacoes.css";

export default function ListaOrganizacoes() {
  const [occupations, setOccupations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { session } = useSession();
  const history = useHistory();

  let size = screen.width;

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    api
      .get("/occupation", config)
      .then((occupations) => {
        setOccupations(occupations.data);
        setFilteredData(occupations.data);
        setLoading(false);
        console.log(occupations);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let columns = [
    {
      title: <h6>Ocupação</h6>,
      dataIndex: "name",
      render: (name) => {
        return (
          <p className="clickable" onClick={() => handleSearch(name)}>
            {name}
          </p>
        );
      },
    },
    {
      title: <h6>Descrição</h6>,
      dataIndex: "description",
      className: "column-description",
      render: (name) => {
        return (
          <p className="clickable" onClick={() => handleSearch(name)}>
            {name}
          </p>
        );
      },
    },
    {
      title: <h6>Organização</h6>,
      dataIndex: "organization_name",
      render: (name) => {
        return (
          <p className="clickable" onClick={() => handleSearch(name)}>
            {name}
          </p>
        );
      },
    },
    {
      title: <h6>Ações</h6>,
      dataIndex: "id",
      render: (id) => (
        <>
          <ActionButton
            title="Editar"
            confirm="Editar ocupação?"
            onConfirm={() => history.push(`ocupacao/editar/${id}`)}
          >
            <EditOutlined />
          </ActionButton>
          <ActionButton
            title="Exluir"
            confirm="Excluir ocupação?"
            onConfirm={() => handleDelete(id)}
          >
            <DeleteOutlined />
          </ActionButton>
        </>
      ),
    },
  ];

  function handleDelete(occupation_id) {
    setLoading(true);

    api
      .put(`/occupation/${occupation_id}`, {}, config)
      .then(() => message.success("Deletado com sucesso"))
      .then(() => {
        api
          .get("/occupation", config)
          .then((response) => {
            setOccupations(response.data);
            setFilteredData(response.data);
          })
          .then(setLoading(false));
      })
      .catch((error) => {
        message.error("Não foi possível exluir");
        console.log(error);
      });
  }

  function handleEdit() {
    alert("EDIT ainda não faz nada. tururu");
  }

  return (
    <Base>
      <h1 className="page-title">Ocupações</h1>
      <div className="table-container">
        <div className="inputWrapper">
          <Input
            className="search"
            placeholder="Pesquisar..."
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
          />
          <Tooltip title="Nova Ocupação">
            <PlusOutlined
              className="addButton"
              onClick={() => history.push("/ocupacao/cadastro")}
            />
          </Tooltip>
        </div>
        <Table columns={columns} dataSource={filteredData} loading={loading} />
      </div>
    </Base>
  );
}
