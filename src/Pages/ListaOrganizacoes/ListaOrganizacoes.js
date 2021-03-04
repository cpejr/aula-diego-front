import React, { useEffect, useState } from "react";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

import { Table, Tag, Input, Tooltip, message, Popconfirm, Modal } from "antd";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from '@material-ui/icons/Add';

import Base from "../../Components/Base/Base";
import "./ListaOrganizacoes.css";


export default function ListaOrganizacoes() {
  const [organization, setOrganizations] = useState([]);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [editOrganizationId, setEditOrganizationId] = useState();
  const [formData, setformData] = useState([]);
  const [data, setData] = useState("");
  const [search, setSearch] = useState(data);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
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
          <EditIcon className="clickable" onClick={() => openEditModal(id)} />{" "}
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

  function handleFormChange(e) {
    setformData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleDelete(organization_id) {
    setLoading(true);
    api
      .put(`/organization/${organization_id}`, {}, config)
      .then(() => message.success("Deletado com sucesso"))
      .then(() => {
        api.get("/organization", config)
          .then((response) => { 
            setOrganizations(response.data); 
          })
          .then(setLoading(false));
      })
      .catch((error) => {
        message.error("Não foi possível excluir");
        console.log(error);
        }
      );
  }

  function openEditModal(id) {
    setEditOrganizationId(id);
    setIsModalEditVisible(true);
  }

  function handleOk() {
    const wantsToEdit = window.confirm(
      "Você tem certeza que deseja alterar essa organização?"
    );
    if (!wantsToEdit) return message.error("Operação cancelada");
    else
      api
        .post(`/organization/${editOrganizationId}`, formData, config)
        .then(() => message.success("Organização alterada com sucesso"))
        .then(() => {
          api.get("/organization", config)
            .then((response) => { 
              setOrganizations(response.data); 
            })
            .then(setLoading(false));
        })
        .catch(() => message.error("Não foi possível editar a organização"));
  }

  function handleCancel() {
    setIsModalEditVisible(false);
    return message.error("Operação cancelada");
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
            <AddIcon style={{height:"30px", width:"30px"}} className="clickable" onClick={() => history.push("/organizacao/cadastro")} />
          </Tooltip>
        </div>
        <Table
          columns={columns}
          dataSource={organization}
          loading={loading}
        />
      </div>
      <Modal
        title="Editar usuário"
        visible={isModalEditVisible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      >
        <Input
          name="name"
          value={formData["name"]}
          onChange={handleFormChange}
          placeholder="Nome"
        />
        <Input
          name="description"
          value={formData["description"]}
          onChange={handleFormChange}
          placeholder="Descrição"
        />
      </Modal>
    </Base>
  );
}
