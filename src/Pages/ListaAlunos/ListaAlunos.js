import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import {
  Table,
  Tag,
  Input,
  Select,
  message,
  Popconfirm,
  Tabs,
  Button,
} from "antd";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import Supervisor from "@material-ui/icons/SupervisorAccount";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";
import "./ListaAlunos.css";
import userEvent from "@testing-library/user-event";

export default function ListaAlunos() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [editUserId, setEditUserId] = useState();
  const [dataForm, setDataForm] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");

  const [filtered, setFiltered] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([]);

  const { session } = useSession();
  const { TabPane } = Tabs;

  const organizationId = session.user.organization_id;
  console.log(organizationId);
  const type = session.user.type;
  console.log(type);

  useEffect(() => {
    var config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };

    if (type === "admin") {
      console.log("OLAAAAA É AQUI");
      config = {
        headers: {
          authorization: "BEARER " + session.accessToken,
        },
        query: {
          organization_id: organizationId,
        },
      };
      console.log({ config });
    }

    api.get("/user", config).then((data) => {
      setData(data.data);
      console.log(data.data);
      setFilteredData(data.data);
    });
  }, []);

  function loadOrgs() {
    api
      .get("/organization", config)
      .then((data) => {
        setOrganizations(data.data);
      })
      .catch(() => message.error("Não foi possível carregar organizações"));
  }

  function handleSelectChange(value) {
    setStatus(value);
  }

  function handleSubmit(user) {
    api
      .put(`/user/${user.id}`, { status: status }, config)
      .then(() => message.success(`Status do usuário alterado com sucesso!`))
      .catch((err) =>
        message.error("Não foi possível alterar o status do usuário!")
      );
  }

  function loadOccups(value) {
    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
      params: {
        organization_id: value,
      },
    };
    if (value)
      api
        .get("/occupation", config)
        .then((data) => {
          console.log(data);
          setOccupations(data.data);
        })
        .catch((error) =>
          message.error("Não foi possível carregar ocupações\n" + error)
        );
  }

  useEffect(() => {
    if (dataForm["organization_id"]) loadOccups();
  }, [dataForm["organization_id"]]);

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
      dataIndex: "registration",
      align: "left",
    },
    {
      title: "Organização",
      className: "column-organization",
      dataIndex: "organization_name",
      align: "left",
      key: "tags",
      render: (tag) => {
        if (tag) {
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
        }
        return null;
      },
    },
    {
      title: "Ocupação",
      className: "column-turma",
      dataIndex: "occupation_name",
      align: "left",
      key: "tags",
      render: (tag) => {
        if (tag) {
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
        }
      },
    },
    {
      title: "Ações",
      dataIndex: "id",
      className: session.user.type === "master" ? "" : "hide",
      render: (id) => {
        return session.user.type === "master" ? (
          <>
            <EditIcon
              className="clickable icon icon-edit"
              onClick={() => openEditModal(id)}
            />
            <span className="hint-edit hint">Editar</span>
            <Popconfirm
              title="Tem certeza que deseja tornar este user admin?"
              onConfirm={() => tournIntoAdmin(id)}
            >
              <Supervisor
                className="clickable icon icon-admin"
                aria-label="Tornar admin"
              />
              <span className="hint-admin hint">Tornar admin</span>
            </Popconfirm>
            <Popconfirm
              title="Tem certeza que deseja excluir este item?"
              onConfirm={() => handleDelete(id)}
            >
              <DeleteIcon className="clickable icon icon-delete" />
              <span className="hint-delete hint">Deletar</span>
            </Popconfirm>
          </>
        ) : null;
      },
    },
  ];

  const aprovarAlunos = [
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
      title: "Organização",
      className: "column-organization",
      dataIndex: "organization_name",
      align: "left",
      key: "tags",
      render: (tag) => {
        if (tag) {
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
        }
        return null;
      },
    },
    {
      title: "Ocupação",
      className: "column-turma",
      dataIndex: "occupation_name",
      align: "left",
      key: "tags",
      render: (tag) => {
        if (tag) {
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
        }
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, id) => {
        return (
          <>
            <Select
              style={{ width: "120px" }}
              defaultValue={status}
              size="small"
              onChange={(e) => handleSelectChange(e)}
            >
              <Select.Option name="approved" value="approved">
                Aprovado
              </Select.Option>
              <Select.Option name="pending" value="pending">
                Pendente
              </Select.Option>
              <Select.Option name="refused" value="refused">
                Reprovado
              </Select.Option>
            </Select>
            <Button
              type="primary"
              size="small"
              style={{ marginLeft: "5px" }}
              onClick={() => {
                handleSubmit(id);
              }}
            >
              Ok
            </Button>
          </>
        );
      },
    },
  ];

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  function tournIntoAdmin(id) {
    api
      .put(`/user/${id}`, { type: "admin" }, config)
      .then(() => message.success(`O usuário agora é admin`))
      .catch((err) => message.error("não foi possível tornar usuário admin"));
  }

  function openEditModal(id) {
    loadOrgs();
    setEditUserId(id);
    setIsModalEditVisible(true);
  }

  function handleDelete(id) {
    const wantsToDelete = window.confirm(
      "Você tem certeza que deseja alterar esse usuário?"
    );
    if (!wantsToDelete) return;
    api
      .put(`/user/${id}`, {}, config)
      .then(() => message.success(`Usuário deletado com sucesso`))
      .catch(() =>
        message.error(
          "Não foi possível deletar usuário. Tente novamente mais tarde"
        )
      );
  }

  function handleOk() {
    const wantsToEdit = window.confirm(
      "Você tem certeza que deseja alterar esse usuário?"
    );
    if (!wantsToEdit) return;
    else
      api
        .post(`/user/${editUserId}`, dataForm, config)
        .then(() => message.success("Usuário alterado com sucesso"))
        .catch(() => message.success("não foi possível editar usuário"));
  }

  function handleCancel() {
    setIsModalEditVisible(false);
    return message.error("Operação cancelada");
  }

  function handleTabChange(key) {
    setActiveTab(key);
    setFiltered(tabs[key]);
  }

  function handleChange(value) {
    setSearch(value);

    // retorna os dados de acordo com o que estiver na barra de pesquisa
    setFilteredData(
      data.filter((student) => {
        if (value === "") return student;
        return (
          student.name.toLowerCase().includes(value.toLowerCase()) ||
          student.registration.toString().includes(value.toLowerCase()) ||
          student.organization_name
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          student.occupation_name.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }
  return (
    <Base>
      <h1 className="page-title">Lista de Alunos</h1>
      <div className="table-container">
        <Tabs defaultActiveKey="0" onChange={handleTabChange}>
          <TabPane tab="Alunos" key="0">
            <Input
              className="search-input"
              placeholder="procurar por nome, matricula, curso"
              onChange={(e) => handleChange(e.target.value)}
              value={search}
            />
            <Table columns={columns} dataSource={filteredData} />
          </TabPane>
          {session.user.type === "master" ? (
            <TabPane tab="Aprovar Cadastro de Usuários" key="1">
              <Input
                className="search-input"
                placeholder="procurar por nome, matricula, curso"
                onChange={(e) => handleChange(e.target.value)}
                value={search}
              />
              <Table columns={aprovarAlunos} dataSource={filteredData} />
            </TabPane>
          ) : null}
        </Tabs>
      </div>
    </Base>
  );
}
