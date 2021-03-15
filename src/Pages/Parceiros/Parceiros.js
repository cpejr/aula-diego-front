import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Table, Input, Popconfirm, message, Tooltip } from "antd";
import Base from "../../Components/Base/Base";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from "react-router-dom";
import { useSession } from "../../Context/SessionContext"
import "./Parceiros.css";

export default function ListaOrganizacoes() {
  const [partners, setPartners] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true)
  const { session } = useSession();
  const history = useHistory();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken
    }
  };

  const configFile = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    responseType: 'blob',
  };

  useEffect(() => {
    api.get("/partner", config)
      .then(async response => {
        getLogo(response.data)
          .then(response => {
            setPartners(response);
            setLoading(false)
          });
      })
      .catch(err => {
        console.log(err)
        message.error("Não foi possível carregador dados da página") 
      });
  }, []);

  const getLogo = async (list) => {
    const result = [];

    for (const partner of list) {
      await api
        .get(`/file_get/${partner.file_id}`, configFile)
        .then(response => {
          console.log(response.data)
          const img = URL.createObjectURL(response.data);
          result.push({
            ...partner,
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
      title: <h5>Logo</h5>,
      dataIndex: "logo",
      render: (logo) => (
        <img 
          src={logo}
          style={{"maxWidth": "15%", "maxHeight": "15%"}}
        />
      )
    },
    {
      title: <h5>Nome</h5>,
      dataIndex: "name",
    },
    {
      title: <h5>Ações</h5>,
      dataIndex: ("id"),
      render: (id) => (
        <>
          <EditIcon className="clickable" onClick={handleEdit} />{" "}
          <Popconfirm
            title="Excluir item?"
            onConfirm={() => handleDelete(id)}
          >
            <DeleteIcon className="clickable" />
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleChange = (value) => {
    setSearch(value);
    setFiltered(
      partners.filter((partner) => {
        if (value === "") return partner;
        return (
          partner.name.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }

  function handleDelete(id) {
    setLoading(true);

    api
      .delete(`/partner/${id}`, config)
      .then(() => message.success("Deletado com sucesso"))
      .then(() => {
        const deleted = partners.filter(elem => elem.id !== id);

        setPartners(deleted);
        setFiltered(deleted);
        setLoading(false);
      })
      .catch(err => { message.error("Não foi possível exluir item!"); console.log(err) });
  }

  function handleEdit() {
    alert("EDIT ainda não faz nada. tururu");
  }

  return (
    <Base>
      <h1 className="page-title">Parceiros</h1>
      <div className="table-container">
        <div style={{ display: "flex" }}>
          <Input
            className="search-input"
            placeholder="Pesquisar..."
            onChange={(e) => handleChange(e.target.value)}
            value={search}
          />
          <Tooltip title="Adicionar Turma">
            <AddIcon style={{ height: "30px", width: "30px" }} onClick={() => history.push("/parceiros/cadastro")} />
          </Tooltip>
        </div>
        <Table
          columns={columns}
          dataSource={partners}
          loading={loading}
        />
      </div>
    </Base>
  );
}