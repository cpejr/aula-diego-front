import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Table, Input, Popconfirm, message, Tooltip } from "antd";
import Base from "../../Components/Base/Base";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from '@material-ui/icons/Add';
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./ListaOcupacoes.css";

export default function ListaOrganizacoes() {
  const [occupations, setOccupations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true)
  const { session } = useSession();
  const history = useHistory();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken
    }
  };

  useEffect(() => {
    api.get("/occupation", config)
      .then((occupations) => {
        setOccupations(occupations.data);
        setFilteredData(occupations.data);
        setLoading(false);
      })
      .catch(err => { console.log(err) });
  }, []);

  const columns = [
    {
      title: <h5>Ocupação</h5>,
      dataIndex: "name",
      render: (name) => {
        return (
          <p className="clickable" onClick={() => handleChange(name)}>
            {name}
          </p>
        );
      }
    },
    {
      title: <h5>Descrição</h5>,
      dataIndex: "description",
      render: (name) => {
        return (
          <p className="clickable" onClick={() => handleChange(name)}>
            {name}
          </p>
        );
      }
    },
    {
      title: <h5>Organização</h5>,
      dataIndex: "organization_name",
      render: (name) => {
        return (
          <p className="clickable" onClick={() => handleChange(name)}>
            {name}
          </p>
        );
      }
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
            <DeleteIcon className="clickable"/>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleChange = (value) => {
    setSearch(value);
    setFilteredData(
      occupations.filter((occupation) => {
        if (value === "") return occupation;
        return (
          occupation.name.toLowerCase().includes(value.toLowerCase()) ||
          occupation.description.toLowerCase().includes(value.toLowerCase()) ||
          occupation.organization_name.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }

  function handleDelete(occupation_id) {
    setLoading(true);

    api
      .put(`/occupation/${occupation_id}`, {}, config)
      .then(() => message.success("Deletado com sucesso"))
      .then(() => {
        api.get("/occupation", config)
          .then((response) => { 
            setOccupations(response.data); 
            setFilteredData(response.data);
          })
          .then(setLoading(false));
      })
      .catch((error) => {
        message.error("Não foi possível exluir");
        console.log(error);
        }
      );
  }

  function handleEdit() {
    alert("EDIT ainda não faz nada. tururu");
  }

  return (
    <Base>
      <h1 className="page-title">Ocupações</h1>
      <div className="table-container">
        <div style={{display:"flex"}}>
          <Input
            className="search-input"
            placeholder="Pesquisar..."
            onChange={(e) => handleChange(e.target.value)}
            value={search}
          />
          <Tooltip title="Adicionar Ocupação">
            <AddIcon style={{height:"30px", width:"30px"}} className="clickable" onClick={() => history.push("/cadastro/ocupacao")} />
          </Tooltip>
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
        />
      </div>
    </Base>
  );
}
