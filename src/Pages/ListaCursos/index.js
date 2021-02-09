import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import { Table, Tag, Input } from "antd";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import data from "./dados.js";
import "./ListaCursos.css";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";

export default function ListaCursos() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const { session } = useSession();

  //   useEffect(() => {
  //     const config = {
  //       headers: {
  //         authorization: "BEARER " + accessToken,
  //       },
  //     };
  //     api.get("/", config).then((data) => setFilteredData(data)); // MUDAR O PATH
  //   }, []);

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
    {
      title: "Ações",
      render: () => (
        <>
          <EditIcon className="clickable" onClick={handleEdit} />{" "}
          <DeleteIcon className="clickable" onClick={handleDelete} />
        </>
      ),
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
      <h1 className="page-title">Lista de Cursos</h1>
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
