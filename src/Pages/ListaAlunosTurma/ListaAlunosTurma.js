import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Table, Input, Popconfirm, message } from "antd";
import Base from "../../Components/Base/Base";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { useSession } from "../../Context/SessionContext";
import "./ListaAlunosTurma.css";

import handleError from "../../utils/handleError";

export default function ListaOrganizacoes(props) {
  const [students, setStudents] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { session } = useSession();
  const cl4ss = new URLSearchParams(props.location.search);

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    api
      .get(`/class/users/${cl4ss.get("id")}`, config)
      .then((students) => {
        setStudents(students.data);
        setFilteredData(students.data);
        setLoading(false);
      })
      .catch((err) => {
        handleError(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: <h5>Alunos</h5>,
      dataIndex: "name",
      render: (name) => {
        return (
          <p className="clickable" onClick={() => handleChange(name)}>
            {name}
          </p>
        );
      },
    },
    {
      title: <h5>Registration</h5>,
      dataIndex: "registration",
      render: (name) => {
        return (
          <p className="clickable" onClick={() => handleChange(name)}>
            {name}
          </p>
        );
      },
    },
    {
      title: <h5>Organização</h5>,
      dataIndex: "organization",
      render: (name) => {
        return (
          <p className="clickable" onClick={() => handleChange(name)}>
            {name}
          </p>
        );
      },
    },
    {
      title: <h5>Ocupação</h5>,
      dataIndex: "occupation",
      render: (name) => {
        return (
          <p className="clickable" onClick={() => handleChange(name)}>
            {name}
          </p>
        );
      },
    },
    {
      title: <h5>Ações</h5>,
      dataIndex: "id",
      render: (id) => (
        <>
          <EditIcon className="clickable" onClick={handleEdit} />{" "}
          <Popconfirm
            title="Tem certeza que deseja excluir este item?"
            onConfirm={() => handleDelete(id)}
          >
            <DeleteIcon className="clickable" />
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleChange = (value) => {
    setSearch(value);
    setFilteredData(
      students.filter((cl4ss) => {
        if (value === "") return cl4ss;
        return (
          cl4ss.name.toLowerCase().includes(value.toLowerCase()) ||
          cl4ss.description.toLowerCase().includes(value.toLowerCase()) ||
          cl4ss.organization_name.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  };

  function handleDelete(user_id) {
    setLoading(true);

    api
      .delete(`/class/user/${cl4ss.get("id")}/${user_id}`, config)
      .then(() => {
        message.success("Deletado com sucesso");
        api
          .get(`/class/users/${cl4ss.get("id")}`, config)
          .then((students) => {
            setStudents(students.data);
            setFilteredData(students.data);
            setLoading(false);
          })
          .catch((err) => {
            handleError(err);
          });
      })
      .catch((error) => {
        handleError(error, "Não foi possível exluir");
      });
  }

  function handleEdit() {
    alert("EDIT ainda não faz nada. tururu");
  }

  return (
    <Base>
      <h1 className="page-title">Alunos</h1>
      <div className="table-container">
        <Input
          className="search-input"
          placeholder="Pesquisar..."
          onChange={(e) => handleChange(e.target.value)}
          value={search}
        />
        <Table columns={columns} dataSource={filteredData} loading={loading} />
      </div>
    </Base>
  );
}
