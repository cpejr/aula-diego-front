import React, { useEffect, useState } from "react";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

import { Table, Tag, Input, Tooltip, message, Popconfirm } from "antd";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from '@material-ui/icons/Add';

import Base from "../../Components/Base/Base";
import "./ListaOrganizacoes.css";


export default function ListaOrganizacoes() {
  const [organization, setOrganizations] = useState([]);
  const [data, setData] = useState("");
  const [search, setSearch] = useState(data);
  const { session } = useSession();
  const history = useHistory();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    api
      .get(`/organization`, config)
      .then((response) => {
        setOrganizations(response.data);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das organizações");
      });
  }, 
  []);

  const columns = [
    {
      title: "Organização",
      className: "column-organization",
      dataIndex: "name",
      align: "left",
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
        title: "Descrição",
        className: "column-description",
        dataIndex: "description",
        align: "left",
    },
    {
      title: <h5>Ações</h5>,
      dataIndex: ("id"),
      render: (id) => (
        <>
          <EditIcon className="clickable" onClick={handleEdit} />{" "}
          <Popconfirm
            title="Tem certeza que deseja excluir este item?"
            onConfirm={() => handleDelete(id)}
          >
            <DeleteIcon className="clickable" onClick={handleDelete} />
          </Popconfirm>
        </>
      ),
    },
  ];

  function handleDelete(organization_id) {
    api
      .put(`/organization/${organization_id}`, {}, config)
      .then(() => message.success("Deletado com sucesso"))
      .then(() => {
        api.get("/organization", config)
          .then((response) => { 
            setOrganizations(response.data); 
          })
      })
      .catch((error) => {
        message.error("Não foi possível excluir");
        console.log(error);
        }
      );
  }

  function handleEdit() {
    alert("EDIT ainda não faz nada. tururu");
  }

  function handleChange(value) {
    setSearch(value);
  }

  return (
    <Base>
      <h1 className="page-title">Lista de Organizações</h1>
      <div className="table-container">
        <div style={{display:"flex"}}>
          <Input
            className="search-input"
            placeholder="procurar por organização"
            onChange={(e) => handleChange(e.target.value)}
            value={search}
          />
          <Tooltip title="Adicionar Organização">
            <AddIcon style={{height:"30px", width:"30px"}} className="clickable" onClick={() => history.push("/cadastro/organizacao")} />
          </Tooltip>
        </div>
        <Table
          columns={columns}
          dataSource={organization}
        />
      </div>
    </Base>
  );
}
