import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Base from "../../Components/Base/Base";
import { Table, Tag, Input, Popconfirm, message, Button } from "antd";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import "./ListaCursos.css";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";

export default function ListaCursos() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const history = useHistory();
  const { session } = useSession();

  useEffect(() => {
    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
      params: {
        organization_id: session.user.organization_id,
      },
    };
    const configMaster = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };
    if (session.user.type == "master") {
      api.get("/course", configMaster).then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      });
    } else {
      api.get(`/course/user/${session.user.id}`, config).then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      });
    }
  }, []);

  const columns = [
    {
      title: "Curso",
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
      title: "Ver Curso",
      dataIndex: "id",
      render: (course_id) => {
        return (
          <p
            className="clickable link"
            onClick={() => history.push(`/curso/${course_id}`)}
          >
            Ver curso
          </p>
        );
      },
    },
    {
      title: "Descrição",
      dataIndex: "description",
      className: "column-description",
    },
    {
      title: "Organização",
      dataIndex: "organization_name",
      key: "tags",
      render: (tag) => {
        if (tag) {
          let color = tag.length > 3 ? "geekblue" : "green";
          color = tag.length > 4 ? "coral" : color;
          color = tag.length > 5 ? "volcano" : color;
          color = tag.length > 7 ? "turquoise" : color;
          color = tag.length > 9 ? "yellowgreen" : color;
          color = tag.length > 11 ? "salmon" : color;
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
      title: "Ações",
      dataIndex: "actions",
      className: session.user.type === "master" ? null : "hide",
      render: (course_id) => (
        <>
          {session.user.type === "master" ? (
            <DeleteIcon
              className="clickable"
              onClick={() => handleDelete(course_id)}
            />
          ) : null}
        </>
      ),
    },
  ];

  function handleDelete(course_id) {
    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };

    const answer = window.confirm("Você deseja apagar esse curso?");
    if (answer === true)
      api
        .put(`/course/${course_id}`, {}, config)
        .then(() => alert("Curso deletado com sucesso"))
        .then(() => {
          const config = {
            headers: {
              authorization: "BEARER " + session.accessToken,
            },
            query: {
              organization_id: session.user.organization_id,
            },
          };
          const configMaster = {
            headers: {
              authorization: "BEARER " + session.accessToken,
            },
          };
          if (session.user.type == "master") {
            api.get("/course", configMaster).then((response) => {
              setData(response.data);
              setFilteredData(response.data);
            });
          } else {
            api
              .get(`/course/user/${session.user.id}`, config)
              .then((response) => {
                setData(response.data);
                setFilteredData(response.data);
              });
          }
        })
        .catch((error) =>
          alert(
            "Não foi possível deletar o curso. Tente novamente mais tarde.\nErro:" +
              error
          )
        );
    else alert("Operação cancelada.");
  }

  function handleChange(value) {
    setSearch(value);

    // retorna os dados de acordo com o que estiver na barra de pesquisa
    setFilteredData(
      data.filter((course) => {
        if (value === "") return course;
        return (
          course.course_name.toLowerCase().includes(value.toLowerCase()) ||
          course.class_name.toLowerCase().includes(value.toLowerCase()) ||
          course.organization_name.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }

  return (
    <Base>
      <h1 className="page-title">Lista de Cursos</h1>
      {session.user.type == "master" ? (
        <>
          <Button
            className="new-course-btn course-btn"
            type="primary"
            ghost
            onClick={() => history.push("/cadastro/curso")}
          >
            Novo Curso
          </Button>
        </>
      ) : null}
      <div className="table-container">
        <Input
          className="search-input"
          placeholder="procurar por curso, empresa"
          onChange={(e) => handleChange(e.target.value)}
          value={search}
        />
        <Table columns={columns} dataSource={filteredData} />
      </div>
    </Base>
  );
}
