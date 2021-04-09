import React, { useState, useEffect, useRef } from "react";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import "./Infolive.css";
import Base from "../../Components/Base/Base";
import InfoIcon from "@material-ui/icons/Info";
import { Table, Tag, Input, Tooltip, message } from "antd";

export default function Infolive() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [lives, setLives] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [spec, setSpec] = useState({});
  const { session } = useSession();
  const history = useHistory();

  function dateFormate(date) {
    var data = new Date(date);
    return data.toLocaleDateString("pt-BR");
  }

  let config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    if (session.user.type !== "master")
      config = {
        ...config,
        params: {
          organization_id: session.user.organization_id,
        },
      };
    api
      .get(`/live`, config)
      .then((lives) => {
        setLives(lives.data);
        setFilteredData(lives.data);
        setLoading(false);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das lives");
      });
  }, []);

  const columns = [
    {
      title: "Organização",
      dataIndex: "organization_name",
      className: session.user.type === "master" ? "" : "hide",
      align: "left",
      key: "tags",
      render: (tag) => {
        if (session.user.type !== "master") return;
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
      title: "Nome",
      dataIndex: "name",
      align: "left",
      render: (name) => {
        return (
          <p className="clickable" onClick={() => setSearch(name)}>
            {name}
          </p>
        );
      },
    },
    {
      title: "Data",
      dataIndex: "date",
      align: "left",
      render: (date) => {
        return <p>{dateFormate(date)}</p>;
      },
    },
    {
      title: "Curso",
      dataIndex: "course_name",
      align: "left",
      key: "tags",
      render: (tag) => {
        if (tag) {
          let color = tag.length > 5 ? "geekblue" : "green";
          color = tag.length > 7 ? "coral" : color;
          color = tag.length > 9 ? "volcano" : color;
          color = tag.length > 12 ? "turquoise" : color;
          color = tag.length > 15 ? "yellowgreen" : color;
          color = tag.length > 17 ? "salmon" : color;
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
      dataIndex: "id",
      render: (id) => (
        <>
          <InfoIcon
            className="clickable"
            onClick={() => {
              history.push(`/live/presenca/${id}`);
            }}
          />
        </>
      ),
    },
  ];

  function handleChange(value) {
    setSearch(value);

    // retorna os dados de acordo com o que estiver na barra de pesquisa
    setFilteredData(
      lives.filter((live) => {
        if (value === "") return live;
        return (
          live.name.toLowerCase().includes(value.toLowerCase()) ||
          live.organization_name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          live.course_name
            .toLowerCase()
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      })
    );
  }

  return (
    <Base>
      <h1 className="page-title">Informações sobre as Lives:</h1>
      <div className="table-container">
        <div style={{ display: "flex" }}>
          <Input
            className="search-input"
            placeholder="procurar por nome, matricula, curso"
            value={search}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <Table
          // title={() => `Lista de Ocupações da empresa ${organization}`}
          columns={columns}
          dataSource={filteredData}
          loading={loading}
        />
      </div>
    </Base>
  );
}
