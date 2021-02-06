import React, { useState } from "react";
import Base from "../../Components/Base/Base";
import { Table, Tag, Input } from "antd";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import DATA from "./data.js";
import "./ListaAlunos.css";

export default function ListaAlunos() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(DATA);

  const columns = [
    {
      title: "Nome",
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
      title: "Matrícula",
      dataIndex: "matricula",
      align: "left",
    },
    {
      title: "Curso",
      className: "column-organization",
      dataIndex: "curso",
      align: "left",
      key: "tags",
      render: (tag) => {
        let color = tag.length > 5 ? "geekblue" : "green";
        color = tag.length > 7 ? "coral" : color;
        color = tag.length > 8 ? "volcano" : color;
        color = tag.length > 9 ? "turquoise" : color;
        color = tag.length > 10 ? "yellowgreen" : color;
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
      title: "Turma",
      className: "column-turma",
      dataIndex: "turma",
      align: "left",
      key: "tags",
      render: (tag) => {
        let color = tag.length > 5 ? "geekblue" : "green";
        color = tag.length > 7 ? "coral" : color;
        color = tag.length > 8 ? "volcano" : color;
        color = tag.length > 9 ? "turquoise" : color;
        color = tag.length > 10 ? "yellowgreen" : color;
        color = tag.length > 11 ? "salmon" : color;
        color = tag.length > 12 ? "volcano" : color;
        color = tag.length > 13 ? "turquoise" : color;
        color = tag.length > 14 ? "yellowgreen" : color;
        color = tag.length > 15 ? "salmon" : color;
        color = tag.length > 16 ? "coral" : color;
        color = tag.length > 17 ? "volcano" : color;
        color = tag.length > 18 ? "turquoise" : color;
        color = tag.length > 19 ? "yellowgreen" : color;
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
      DATA.filter((student) => {
        if (value === "") return student;
        return (
          student.name.toLowerCase().includes(value.toLowerCase()) ||
          student.matricula.toLowerCase().includes(value.toLowerCase()) ||
          student.curso.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }
  return (
    <Base>
      <h1 className="page-title">Lista de Alunos</h1>
      <div className="table-container">
        <Input
          className="search-input"
          placeholder="procurar por nome, matricula, curso"
          onChange={(e) => handleChange(e.target.value)}
          value={search}
        />
        <Table
          // title={() => `Lista de Ocupações da empresa ${organization}`}
          columns={columns}
          dataSource={filteredData}
        />
      </div>
    </Base>
  );
}
