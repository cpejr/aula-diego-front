import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Base from "../../Components/Base/Base";
import { Table, Tag, Input, Popconfirm, message, Button, Tooltip } from "antd";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from '@material-ui/icons/Add';
import "./ListaCursos.css";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";

export default function ListaCursos() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { session } = useSession();

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

  useEffect(() => {
    if (session.user.type == "master") {
      api.get("/course", configMaster).then((response) => {
        if (response.data) setData(response.data);
      })
      .then(setLoading(false));;
    } else {
      api.get(`/course/user/${session.user.id}`, config).then((response) => {
        if (response.data) setData(response.data);
      })
      .then(setLoading(false));
    }
  }, []);

  const columns = [
    {
      title: "Curso",
      dataIndex: "course_name",
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
      dataIndex: "course_id",
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
      dataIndex: "course_description",
      className: "column-description",
    },
    {
      title: "Turma",
      dataIndex: "class_name",
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
    const answer = window.confirm("Você deseja apagar esse curso?");
    if (answer === true){
      setLoading(true);

      api
        .put(`/course/${course_id}`, {}, config)
        .then(() => alert("Curso deletado com sucesso"))
        .then(() => {
          if (session.user.type == "master") {
            api.get("/course", configMaster).then((response) => {
              setData(response.data);
            })
            .then(setLoading(false));
          } else {
            api
              .get(`/course/user/${session.user.id}`, config)
              .then((response) => {
                setData(response.data);
              })
              .then(setLoading(false));
          }
        })
        .catch((error) =>
          alert(
            "Não foi possível deletar o curso. Tente novamente mais tarde.\nErro:" +
            error
          )
        );
    }
    else alert("Operação cancelada.");
  }

  function handleChange(value) {
    setSearch(value);
  }

  return (
    <Base>
      <h1 className="page-title">Lista de Cursos</h1>
      <div className="table-container">
        <div style={{display:"flex"}}>
          <Input
            className="search-input"
            placeholder="procurar por curso, empresa"
            onChange={(e) => handleChange(e.target.value)}
            value={search}
          />
          <Tooltip title="Adicionar Curso">
            <AddIcon style={{height:"30px", width:"30px"}} className="clickable" onClick={() => history.push("/cadastro/curso")} />
          </Tooltip>
        </div>
        <Table
          columns={columns}
          dataSource={data.map((course) => {
            if (search === "") return course;
            return (
              course.course_name.toLowerCase().includes(search.toLowerCase()) ||
              course.class_name.toLowerCase().includes(search.toLowerCase()) ||
              course.organization_name
                .toLowerCase()
                .includes(search.toLowerCase())
            );
          })}
          loading={loading}
        />
      </div>
    </Base>
  );
}
