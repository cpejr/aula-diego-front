/* eslint-disable eqeqeq */
import React, { useState, useEffect, useCallback } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Table, Input, message, Tabs, Statistic } from "antd";
import {
  CrownOutlined,
  DeleteOutlined,
  CheckSquareTwoTone,
  CloseSquareTwoTone,
} from "@ant-design/icons";
import { useSession } from "../../Context/SessionContext";
import ActionButton from "../../Components/ActionButton/actionButton";

import "./ListaAlunos.css";
import { BsPeople } from "react-icons/bs";
import handleError from "../../utils/handleError";

export default function ListaAlunos() {
  const [students, setStudents] = useState([]);
  const [pending, setPending] = useState([]);

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const { session } = useSession();
  const { TabPane } = Tabs;

  const type = session.user.type;

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = useCallback((tab) => {
    if (session.user.type !== "master")
      config.params = { "user.organization_id": session.user.organization_id };
    setLoading(true);
    api
      .get("/user", config)
      .then((res) => {
        setStudents(
          res.data
            .filter((user) => user.status === "approved")
            .sort((a, b) => b.score - a.score)
        );
        setPending(res.data.filter((user) => user.status === "pending"));
        setFiltered(
          res.data
            .filter(
              (user) => user.status === (tab === 0 ? "approved" : "pending")
            )
            .sort((a, b) => b.score - a.score)
        );
      })
      .finally(() => setLoading(false));
  });

  useEffect(() => {
    getData(0);
    setFiltered(students);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "Matrícula",
      dataIndex: "registration",
      className: type === "student" ? "hide" : "",
      align: "left",
      width: "20%",
      render: (registration) =>
        type === "student" ? null : <p>{registration}</p>,
    },
    {
      title: "Organização",
      className: type === "master" ? "column-organization" : "hide",
      dataIndex: "organization_name",
      width: "20%",
      render: (registration) =>
        type === "master" ? <p>{registration}</p> : null,
    },
    {
      title: "Ocupação",
      className: type === "student" ? "hide" : "column-turma",
      dataIndex: "occupation_name",
      width: "25%",
      render: (registration) =>
        type === "student" ? null : <p>{registration}</p>,
    },
  ];

  function isAdmin(id) {
    const user = filtered.filter((x) => x.id == id);
    if (user[0].type == "admin" || user[0].type == "master") {
      return (
        <ActionButton
          title="Rebaixar"
          confirm="Rebaixar para estudante?"
          onConfirm={() => handleDemote(id)}
        >
          <CrownOutlined
            className="actionButton"
            style={{ color: "#f0a500" }}
          />
        </ActionButton>
      );
    } else {
      return (
        <ActionButton
          title="Promover"
          confirm="Promover para admin?"
          onConfirm={() => handlePromote(id)}
        >
          <CrownOutlined className="actionButton" />
        </ActionButton>
      );
    }
  }

  const studentsTable = [
    {
      title: "Posição",
      dataIndex: "id",
      width: "10%",
      render: (id) => <p>{findPositionById(id)}º</p>,
    },
    ...columns,
    {
      title: "Pontuação",
      dataIndex: "score",
      render: (score) => <p>{score * 20} XP</p>,
    },
    {
      title: "Ações",
      dataIndex: "id",
      className: type === "master" ? "" : "hide",
      render: (id) => {
        return type === "master" ? (
          <>
            {isAdmin(id)}
            {/* <ActionButton title="Editar" confirm="Editar turma?">
              <EditOutlined className="actionButton" />
            </ActionButton> */}
            <ActionButton
              title="Deletar"
              confirm="Deletar usuário?"
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
      .then(() => {
        getData(0);
        message.success(`O usuário agora é admin`);
      })
      .catch((err) =>
        handleError(err, "não foi possível tornar usuário admin")
      );
  }

  function handleDemote(id) {
    api
      .put(`/user`, { id, type: "student" }, config)
      .then(() => {
        message.success(`O usuário agora é estudante`);
        getData(0);
      })
      .catch((err) =>
        handleError(err, "não foi possível tornar usuário estudante")
      );
  }

  function handleApprove(id, status) {
    setLoading(true);

    api
      .put(`/user`, { id, status: status }, config)
      .then(() => {
        if (status === "approved") message.success(`Usuário aprovado!`);
        if (status === "refused") message.success(`Usuário negado!`);
        getData(1);
      })
      .catch((err) => {
        handleError(err, "Não foi possível alterar o status do usuário!");
      });
  }

  function handleDelete(id) {
    api
      .put(`/user/${id}`, {}, config)
      .then(() => {
        message.success(`Usuário deletado com sucesso`);
        getData(0);
      })
      .catch((err) =>
        handleError(
          err,
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

  function findPositionById(id) {
    let position = -1;
    students.forEach((element, index) => {
      if (element.id === id) position = index + 1;
    });
    return position;
  }
  return (
    <Base>
      <h1 className="page-title">
        {session.user.type === "student" ? "Ranking" : "Lista de Alunos"}
      </h1>
      <div className="table-container">
        {session.user.type === "student" && (
          <h5 className="greyish">
            <Statistic
              title="Minha posição"
              value={findPositionById(session.user.id) + "º"}
              prefix={<BsPeople />}
            />
          </h5>
        )}
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
          ) : (
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
          )}
        </Tabs>
      </div>
    </Base>
  );
}
