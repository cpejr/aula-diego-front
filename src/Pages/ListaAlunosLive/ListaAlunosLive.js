import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";
import { Table, Input, Statistic } from "antd";
import { BsPeople } from "react-icons/bs";
import "./ListaAlunosLive.css";
import handleError from "../../utils/handleError";

export default function ListaAlunoLIve(props) {
  const { session } = useSession();
  const [presentStudents, setPresentStudents] = useState([]);
  const [search, setSearch] = useState("");
  const { id } = props.match.params;

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    params: {
      live_id: id,
      "user.type": "student",
    },
  };

  useEffect(() => {
    api
      .get(`/presence/live`, config)
      .then((response) => {
        setPresentStudents(response.data);
      })
      .catch((err) => {
        handleError(err, "Não foi possível carregar a presença das lives!");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Aluno",
      dataIndex: "user_name",
      render: (user_name) => (
        <p className="clickable" onClick={() => setSearch(user_name)}>
          {user_name === null ? null : user_name}
        </p>
      ),
    },
    {
      title: "Matrícula",
      dataIndex: "user_registration",
      render: (user_registration) => (
        <p className="clickable" onClick={() => setSearch(user_registration)}>
          {user_registration}
        </p>
      ),
    },
    {
      title: "Curso",
      dataIndex: "course_name",
      render: (course_name) => (
        <p className="clickable" onClick={() => setSearch(course_name)}>
          {course_name}
        </p>
      ),
    },
  ];

  return (
    <Base>
      <h1 className="page-title">Lista de Presença da Live:</h1>
      <div className="table-container">
        <h5 className="greyish">
          <Statistic
            title="Nº de Espectadores"
            value={presentStudents.length}
            prefix={<BsPeople />}
          />
        </h5>
        <Input
          placeholder="Pesquise por nome, organização curso..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Table
          columns={columns}
          dataSource={presentStudents.filter((row) => {
            if (search === "" || !search) return row;
            if (
              row.user_name
                .toString()
                .toLowerCase()
                .includes(search.toString().toLocaleLowerCase()) ||
              row.user_registration
                .toString()
                .toLowerCase()
                .includes(search.toString().toLocaleLowerCase()) ||
              row.course_name
                .toString()
                .toLowerCase()
                .includes(search.toString().toLocaleLowerCase()) ||
              row.class_name
                .toString()
                .toLowerCase()
                .includes(search.toString().toLocaleLowerCase())
            )
              return row;
            return null;
          })}
        />
      </div>
    </Base>
  );
}
