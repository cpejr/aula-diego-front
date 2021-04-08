import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Table, Input, message, Tabs } from "antd";
import {
  CrownOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckSquareTwoTone,
  CloseSquareTwoTone,
} from "@ant-design/icons";
import { useSession } from "../../Context/SessionContext";
import ActionButton from "../../Components/ActionButton/actionButton";

import "./ListaAlunos.css";

export default function ListaAlunos() {
  const [students, setStudents] = useState([]);
  const [pending, setPending] = useState([]);

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const { session } = useSession();
  const { TabPane } = Tabs;

  const organizationId = session.user.organization_id;
  const type = session.user.type;

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  const getData = (tab) => {
    if (session.user.type === "admin")
      config.params = { "user.organization_id": session.user.organization_id };

    api.get("/user", config).then((res) => {
      setStudents(res.data.filter((user) => user.status === "approved"));
      setPending(res.data.filter((user) => user.status === "pending"));
      setFiltered(
        res.data.filter(
          (user) => user.status === (tab === 0 ? "approved" : "pending")
        )
      );
    });
  };

  useEffect(() => {
    getData(0);
  }, []);

  useEffect(() => {
    setFiltered(students);
  }, [students]);

  useEffect(() => {
    setLoading(false);
  }, [filtered]);

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      with: "25%",
    },
    {
      title: "Matrícula",
      dataIndex: "registration",
      align: "left",
      with: "20%",
    },
    {
      title: "Organização",
      className: "column-organization",
      dataIndex: "organization_name",
      with: "20%",
    },
    {
      title: "Ocupação",
      className: "column-turma",
      dataIndex: "occupation_name",
      with: "25%",
    },
  ];

  const studentsTable = [
    ...columns,
    {
      title: "Ações",
      dataIndex: "id",
      with: "10%",
      className: type === "master" ? "" : "hide",
      render: (id) => {
        return type === "master" ? (
          <>
            <ActionButton
              title="Promover"
              confirm="Promover para admin?"
              onConfirm={() => handlePromote(id)}
            >
              <CrownOutlined className="actionButton" />
            </ActionButton>
            <ActionButton title="Editar" confirm="Editar turma?">
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
        ) : null;
      },
    },
  ];

  const pendingTable = [
    ...columns,
    {
      title: "Aprovar",
      dataIndex: "id",
      with: "10%",
      render: (id) => {
        return (
          <>
            <ActionButton
              title="Aprovar"
              confirm="Aprovar usuário?"
              onConfirm={() => handleApprove(id, "approved")}
            >
              <CheckSquareTwoTone twoToneColor="limeGreen" />
            </ActionButton>
            <ActionButton
              title="Negar"
              confirm="Negar usuário?"
              onConfirm={() => handleApprove(id, "refused")}
            >
              <CloseSquareTwoTone twoToneColor="red" />
            </ActionButton>
          </>
        );
      },
    },
  ];

  function handleTabChange(key) {
    setFiltered(key === "0" ? students : pending);
  }

  function handlePromote(id) {
    api
      .put(`/user/`, { id, type: "admin" }, config)
      .then(() => message.success(`O usuário agora é admin`))
      .catch((err) => message.error("não foi possível tornar usuário admin"));
  }

  function handleApprove(id, status) {
    setLoading(true);

    api
      .put(`/user`, { id, status: status }, config)
      .then(() => {
        if (status === "approved") message.success(`Usuário aprovado!`);
        if (status === "refused") message.success(`Usuário negado!`);
        getData();
      })
      .catch((err) => {
        message.error("Não foi possível alterar o status do usuário!");
      });
  }

  function handleDelete(id) {
    console.log(config);
    api
      .put(`/user/${id}`, {}, config)
      .then(() => message.success(`Usuário deletado com sucesso`))
      .catch((err) =>
        message.error(
          "Não foi possível deletar usuário. Tente novamente mais tarde"
        )
      );
  }

  function handleSearch(value, key) {
    setSearch(value);
    const source = [students, pending];

    setFiltered(
      source[key].filter((student) => {
        if (value === "") return student;
        return (
          student.name.toLowerCase().includes(value.toLowerCase()) ||
          student.registration.toString().includes(value.toLowerCase()) ||
          student.organization_name
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          student.occupation_name.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }
  return (
    <Base>
      <h1 className="page-title">Lista de Alunos</h1>
      <div className="table-container">
        <Tabs defaultActiveKey="0" onChange={handleTabChange}>
          <TabPane tab="Alunos" key="0">
            <Input
              className="search-input"
              placeholder="Pesquisar..."
              onChange={(e) => handleSearch(e.target.value, 0)}
              value={search}
            />
            <Table
              columns={studentsTable}
              dataSource={filtered}
              loading={loading}
            />
          </TabPane>
          {type === "master" ? (
            <TabPane tab="Pendentes" key="1">
              <Input
                className="search-input"
                placeholder="Pesquisar..."
                onChange={(e) => handleSearch(e.target.value, 1)}
                value={search}
              />
              <Table
                columns={pendingTable}
                dataSource={filtered}
                loading={loading}
              />
            </TabPane>
          ) : null}
        </Tabs>
      </div>
    </Base>
  );
}
