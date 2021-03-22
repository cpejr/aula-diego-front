import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Table, Tag, Input, Tooltip, message, Popconfirm, Modal } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./ListaOrganizacoes.css";


export default function ListaOrganizacoes() {
  const [organization, setOrganizations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { session } = useSession();
  const history = useHistory();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  const configFile = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    responseType: 'blob',
  };

  useEffect(() => {
    api
      .get(`/organization`, config)
      .then((response) => {
        getLogo(response.data)
          .then(response => {
            setOrganizations(response);
            setFiltered(response)
            setLoading(false);
          });
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das organizações");
      });
  }, []);

  const getLogo = async (organizations) => {
    const result = [];
    console.log(organizations)
    for (const organization of organizations) {
      await api
        .get(`/file_get/${organization.file_id}`, configFile)
        .then(response => {
          const img = URL.createObjectURL(response.data);
          result.push({
            ...organization,
            logo: img
          })
        })
        .catch((err) => {
          message.error("Não foi possível carregar dados dos arquivos");
        });
    }

    return result;
  }

  const columns = [
    {
      title: <h5 style={{ "textAlign": "center" }}>Logo</h5>,
      dataIndex: "logo",
      width: "10%",
      render: (logo) => (
        <div className="logo">
          <img
            src={logo}
          />
        </div>
      )
    },
    {
      title: <h5>Organização</h5>,
      dataIndex: "name",
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
      title: <h5>Descrição</h5>,
      dataIndex: "description",
    },
    {
      title: <h5>Ações</h5>,
      dataIndex: ("id"),
      render: (id) => (
        <>
          <Popconfirm
            title="Excluir item?"
            onConfirm={() => handleDelete(id)}
          >
            <EditOutlined className="actionButton" onClick={handleEdit} />
          </Popconfirm>
          <Popconfirm
            title="Excluir item?"
            onConfirm={() => handleDelete(id)}
          >
            <DeleteOutlined className="actionButton" />
          </Popconfirm>
        </>
      ),
    },
  ];

  function handleEdit() {
    alert("EDIT ainda não faz nada. tururu");
  }

  function handleSearch(value) {
    setFiltered(filtered.filter(data => {
      if (value === "") return data;
      return (
        data.name.toLowerCase().includes(value.toLowerCase())
      )
    }));
  }

  function handleDelete(organization_id) {
    setLoading(true);
    api
      .delete(`/organization/${organization_id}`, config)
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

  function handleChange(value) {
    setSearch(value);
  }

  return (
    <Base>
      <h1 className="page-title">Organizações</h1>
      <div className="table-container">
        <div className="inputWrapper">
          <Input
            className="search"
            placeholder="Pesquisar..."
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
          />
          <Tooltip title="Nova Organização">
            <PlusOutlined
              className="addButton"
              onClick={() =>
                history.push('/organizacao/cadastro')
              }
            />
          </Tooltip>
        </div>
        <Table
          columns={columns}
          dataSource={filtered}
          loading={loading}
        />
      </div>
    </Base>
  );
}
