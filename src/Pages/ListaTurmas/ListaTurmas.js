import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Table, Input, Popconfirm, message, Tooltip, Modal } from "antd";
import Base from "../../Components/Base/Base";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { useSession } from "../../Context/SessionContext";
import "./ListaTurmas.css";

export default function ListaOrganizacoes() {
  const [classes, setClasses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [editIsVisible, setEditIsVisible] = useState(false);
  const [id, setId] = useState("");
  const [editInfo, setEditInfo] = useState({});
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
      .get("/class", config)
      .then((classes) => {
        setClasses(classes.data);
        setFilteredData(classes.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: <h5>Nome</h5>,
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
      title: <h5>Descrição</h5>,
      dataIndex: "description",
      render: (name) => {
        return (
          <p className="clickable" onClick={() => handleChange(name)}>
            {name}
          </p>
        );
      },
    },
    {
      title: <h5>Curso</h5>,
      dataIndex: "course_name",
      render: (name) => {
        return (
          <p className="clickable" onClick={() => handleChange(name)}>
            {name}
          </p>
        );
      },
    },
    {
      title: <h5>Ações</h5>,
      dataIndex: "id",
      render: (id) => (
        <>
          <Popconfirm
            title="Deseja editar esta turma?"
            onConfirm = {() => history.push(`/turma/editar/${id}`)}
          >
            <EditIcon className="clickable" />
          </Popconfirm>
          <Popconfirm
            title="Tem certeza que deseja excluir esta turma?"
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
    setFilteredData(
      classes.filter((cl4ss) => {
        if (value === "") return cl4ss;
        return (
          cl4ss.name.toLowerCase().includes(value.toLowerCase()) ||
          cl4ss.description.toLowerCase().includes(value.toLowerCase()) ||
          cl4ss.organization_name.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  };

  function handleDelete(class_id) {
    setLoading(true);

    api
      .put(`/class/${class_id}`, {}, config)
      .then(() => message.success("Deletado com sucesso"))
      .then(() => {
        api
          .get("/class", config)
          .then((response) => {
            setClasses(response.data);
            setFilteredData(response.data);
          })
          .then(setLoading(false));
      })
      .catch((error) => {
        message.error("Não foi possível exluir");
        console.log(error);
      });
  }

  function handleEdit() {
    api
      .put(`/class/`, { ...editInfo, id }, config)
      .then(() => {
        message.success("Modificações feitas com sucesso");
        setEditIsVisible(false);
      })
      .then(() => {
        api
          .get("/class", config)
          .then((classes) => {
            setClasses(classes.data);
            setFilteredData(classes.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(() => message.error("não foi possível alterar turma"));
  }

  function handleModalChange(e) {
    setEditInfo({ ...editInfo, [e.target.name]: e.target.value });
  }

  return (
    <Base>
      <h1 className="page-title">Turmas</h1>
      <div className="table-container">
        <div style={{ display: "flex" }}>
          <Input
            className="search-input"
            placeholder="Pesquisar..."
            onChange={(e) => handleChange(e.target.value)}
            value={search}
          />
          <Tooltip title="Adicionar Turma">
            <AddIcon
              style={{ height: "30px", width: "30px", marginLeft: "1%" }}
              className="clickable"
              onClick={() => history.push("/turma/cadastro")}
            />
          </Tooltip>
        </div>
        <Table columns={columns} dataSource={filteredData} loading={loading} />
      </div>
      <Modal
        visible={editIsVisible}
        onCancel={() => setEditIsVisible(false)}
        onOk={handleEdit}
      >
        <Input
          placeholder="Nome"
          name="name"
          onChange={handleModalChange}
          value={editInfo["name"]}
        />
        <Input
          placeholder="Descrição"
          name="description"
          onChange={handleModalChange}
          value={editInfo["description"]}
        />
      </Modal>
    </Base>
  );
}
