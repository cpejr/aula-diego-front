import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Input, Tag } from "antd";
import Base from "../../Components/Base/Base";
import { useSession } from "../../Context/SessionContext";
import api from "../../services/api";
import data from "./dados.js";
import cursos from "./dados.js";

export default function ListaMeusCursos() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const { session } = useSession();
  const history = useHistory();

  // useEffect(() => {
  // const config = {
  //     headers: {
  //     authorization: "BEARER " + accessToken,
  //     },
  //     params: {
  //     id: session.id //CONFIRMAR SE É ISSO AQUI MESMO, DEPENDE DA ARQUITETURA DO BACK
  //     }
  // };
  // api.get("/curso", config).then((data) => setFilteredData(data)); // MUDAR O PATH
  // }, []);

  const columns = [
    {
      title: "Curso",
      dataIndex: "name",
      render: (name) => {
        return (
          <p
            className="clickable"
            onClick={() =>
              history.push(
                `/curso/${
                  filteredData.find(
                    (course) =>
                      course.name === name && course.is_deleted === false
                  ).id // acha o curso que tem esse nome e não está deletado, daí manda o aluno para a rota
                }`
              )
            }
          >
            {name}
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
      dataIndex: "organization",
      align: "left",
      key: "tags",
      render: (tag) => {
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
      },
    },
  ];

  function handleDelete() {
    alert("DELETE ainda não faz nada. tururu");
  }

  function handleEdit() {
    alert("EDIT ainda não faz nada. tururu");
  }

  function handleChange(value) {
    setSearch(value);

    // retorna os dados de acordo com o que estiver na barra de pesquisa
    setFilteredData(
      data.filter((course) => {
        if (value === "") return course;
        return (
          course.name.toLowerCase().includes(value.toLowerCase()) ||
          course.organization.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }
  return (
    <Base>
      <h1 className="page-title">Meus Cursos</h1>
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
