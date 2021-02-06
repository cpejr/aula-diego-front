import React, { useEffect, useState } from "react";
import api from "../../services/api";

import { Table, Tag, Input } from "antd";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

import Base from "../../Components/Base/Base";
import "./ListaOcupacoes.css";

// TEMPORARIO
import data from "./data";

export default function ListaOrganizacoes() {
  const [occupations, setOccupations] = useState([]);
  const [filteredData, setfilteredData] = useState(data);
  const [search, setSearch] = useState("");

  // const orgId = props.match.params

  // useEffect(() => {
  //   const config = {
  //     headers: {
  //       authorization: "BEARER " + accessToken,
  //     },
  //   };
  //   api.get("/", config).then((data) => setOccupations(data)); // MUDAR O PATH
  // }, []);

  const columns = [
    {
      title: "Ocupação",
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
      className: "column-description",
      dataIndex: "description",
      align: "left",
    },
    {
      title: "Organização",
      className: "column-organization",
      dataIndex: "organization",
      align: "left",
      key: "tags",
      render: (tag) => {
        let color = tag.length > 5 ? "geekblue" : "green";
        color = tag.length > 7 ? "blueviolet" : color;
        color = tag.length > 8 ? "orchid" : color;
        color = tag.length > 9 ? "turquoise" : color;
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
    setfilteredData(
      data.filter((occupation) => {
        if (value === "") return occupation;
        return (
          occupation.organization.toLowerCase().includes(value.toLowerCase()) ||
          occupation.name.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }

  return (
    <Base>
      <h1 className="page-title">Lista de Ocupações</h1>
      <div className="table-container">
        <Input
          className="search-input"
          placeholder="procurar por ocupação, empresa"
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
