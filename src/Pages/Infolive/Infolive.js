import React, { useState, useEffect } from "react";
import "./Infolive.css";
import Base from "../../Components/Base/Base";
import InfoIcon from "@material-ui/icons/Info";
import { Table, Tag, Input } from "antd";
import DATA from "./data";

export default function Infolive() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(DATA);

  const columns = [
    {
      title: "Ocupação",
      dataIndex: "occupation",
      align: "left",
      render: (occupation) => {
        return (
          <p className="clickable" onClick={() => handleChange(occupation)}>
            {occupation}
          </p>
        );
      },
    },
    {
      title: "Data",
      dataIndex: "date",
      align: "left",
      render: (date) => {
        return (
          <p className="clickable" onClick={() => handleChange(date)}>
            {date}
          </p>
        );
      },
    },
    {
      title: "Nº espectadores",
      dataIndex: "qntd",
      align: "left",
      className: "column-numEspec",
    },
    {
      title: "Curso",
      className: "column-organization",
      dataIndex: "course",
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
      title: "Ações",
      render: () => (
        <>
          <InfoIcon className="clickable" onClick={handleInfo} />
        </>
      ),
    },
  ];

  function handleInfo() {
    alert("DELETE ainda não faz nada. tururu");
  }

  function handleChange(value) {
    setSearch(value);

    // retorna os dados de acordo com o que estiver na barra de pesquisa
    setFilteredData(
      DATA.filter((live) => {
        if (value === "") return live;
        return (
          live.occupation.toLowerCase().includes(value.toLowerCase()) ||
          live.date.toLowerCase().includes(value.toLowerCase()) ||
          live.course.toLowerCase().includes(value.toLowerCase())
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
