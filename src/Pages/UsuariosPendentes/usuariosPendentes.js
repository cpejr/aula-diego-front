import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import { Input, message, Table } from "antd";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";
import "./usuariosPendents.css";

export default function UsuariosPendentes() {
  const { session } = useSession();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [search, setSearch] = useState("");
  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    params: {
      "user.status": "pending",
    },
  };
  useEffect(() => {
    api
      .get("/user", config)
      .then((response) => setPendingUsers(response.data))
      .catch((error) => {
        message.error("Não foi possível buscar usuários pendentes.");
        console.log(error);
      });
  }, []);

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      render: (term) => {
        return (
          <p className="clickable" onClick={() => setSearch(term)}>
            {term}
          </p>
        );
      },
    },
    {
      title: "Matrícula",
      dataIndex: "registration",
      render: (term) => {
        return (
          <p className="clickable" onClick={() => setSearch(term)}>
            {term}
          </p>
        );
      },
    },
    {
      title: "Organização",
      dataIndex: "organization_name",
      render: (term) => {
        return (
          <p className="clickable" onClick={() => setSearch(term)}>
            {term}
          </p>
        );
      },
    },
    {
      title: "Ocupação",
      dataIndex: "occupation_name",
      render: (term) => {
        return (
          <p className="clickable" onClick={() => setSearch(term)}>
            {term}
          </p>
        );
      },
    },
  ];
  return (
    <Base>
      <div className="page-container">
        <h1 className="title mb40">Usuários pendentes</h1>
        <Input
          placeholder="Pesquise por nome, matrícula, organização, ocupação"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Table
          columns={columns}
          dataSource={pendingUsers.filter((student) => {
            if (search === "") return student;
            if (
              student.name
                .toLowerCase()
                .includes(search.toString().toLowerCase()) ||
              student.registration
                .toString()
                .toLowerCase()
                .includes(search.toString().toLowerCase()) ||
              student.organization_name
                .toLowerCase()
                .includes(search.toString().toLowerCase()) ||
              student.occupation_name
                .toLowerCase()
                .includes(search.toString().toLowerCase())
            )
              return student;
            return null;
          })}
        />
      </div>
    </Base>
  );
}
