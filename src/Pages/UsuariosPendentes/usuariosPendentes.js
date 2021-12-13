import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import { Input, message, Table } from "antd";
import { CheckCircle, Close } from "@material-ui/icons";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";
import "./usuariosPendents.css";
import handleError from "../../utils/handleError";

export default function UsuariosPendentes() {
  const { session } = useSession();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [search, setSearch] = useState("");
  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  function getData() {
    api
      .get("/user", {
        ...config,
        params: {
          "user.status": "pending",
          "user.organization_id":
            session.user.type === "admin" ? session.user.organization_id : null,
        },
      })
      .then((response) => setPendingUsers(response.data))
      .catch((error) => {
        handleError(error, "Não foi possível buscar usuários pendentes.");
      });
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function modifyStatus(id, status) {
    api
      .put(`/user`, { id, status }, config)
      .then(() => {
        message.success("Status do usuário modificado com sucesso");
        getData();
      })
      .catch((err) => {
        handleError(err, "Não foi possível modificar status do usuário");
      });
  }

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
      className: session.user.type === "master" ? null : "hide",
      render: (term) => {
        return session.user.type === "master" ? (
          <p className="clickable" onClick={() => setSearch(term)}>
            {term}
          </p>
        ) : null;
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
    {
      title: "Ações",
      dataIndex: "id",
      render: (id) => {
        return (
          <>
            <CheckCircle
              className="clickable"
              onClick={() => modifyStatus(id, "approved")}
            />
            <Close
              className="clickable"
              onClick={() => modifyStatus(id, "refused")}
            />
          </>
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
