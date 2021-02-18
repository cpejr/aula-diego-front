import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import { Table, Tag, Input, Modal, DatePicker, Select, message } from "antd";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";
import "./ListaAlunos.css";

export default function ListaAlunos() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [editUserId, setEditUserId] = useState();
  const [formData, setformData] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [data, setData] = useState([]);
  const { session } = useSession();

  useEffect(() => {
    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };
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
    if (formData["organization_id"]) loadOccups();
  }, [formData["organization_id"]]);

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
      render: (id) => (
        <>
          <EditIcon className="clickable" onClick={() => openEditModal(id)} />{" "}
          <DeleteIcon className="clickable" onClick={() => handleDelete(id)} />
        </>
      ),
    },
  ];

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  function openEditModal(id) {
    loadOrgs();
    setEditUserId(id);
    setIsModalEditVisible(true);
  }

  function handleDelete(id) {
    const wantsToDelete = window.confirm(
      "Você tem certeza que deseja alterar esse usuário?"
    );
    if (!wantsToDelete) return message.error("Operação cancelada");
    else
      api
        .put(`/user/${id}`, {}, config)
        .then(() => alert(`Usuário deletado com sucesso`))
        .catch(() =>
          alert("Não foi possível deletar usuário. Tente novamente mais tarde")
        );
  }

  function handleOk() {
    const wantsToEdit = window.confirm(
      "Você tem certeza que deseja alterar esse usuário?"
    );
    if (!wantsToEdit) return message.error("Operação cancelada");
    else
      api
        .post(`/user/${editUserId}`, formData, config)
        .then(() => message.success("Usuário alterado com sucesso"))
        .catch(() => message.success("não foi possível editar usuário"));
  }

  function handleCancel() {
    setIsModalEditVisible(false);
    return message.error("Operação cancelada");
  }

  function handleFormChange(e) {
    setformData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSelectChange(value, field) {
    if (field === "organization_id") loadOccups(value);
    console.log(`${field}: ${value}`);
    setformData({ ...formData, [field]: value });
  }

  function handleDateChange(date, dateString) {
    setformData({ ...formData, birthdate: new Date(dateString) });
  }

  function handleChange(value) {
    setSearch(value);

    // retorna os dados de acordo com o que estiver na barra de pesquisa
    setFilteredData(
      data.filter((student) => {
        if (value === "") return student;
        return (
          student.name.toLowerCase().includes(value.toLowerCase()) ||
          student.registration.toString().includes(value.toLowerCase())
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
        <Table columns={columns} dataSource={filteredData} />
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
          placeholder="nome"
        />
        <Select
          name="organization_id"
          value={formData["organization_id"]}
          onChange={(e) => handleSelectChange(e, "organization_id")}
          placeholder="organização"
        >
          {organizations.map((organization) => {
            return organization != [] ? (
              <Select.Option name="organization_id" value={organization.id}>
                {organization.name}
              </Select.Option>
            ) : null;
          })}
        </Select>
        <Select
          name="occupation_id"
          onChange={() => handleSelectChange("occupation_id")}
          placeholder="Ocupação"
        >
          {occupations.map((occupation) => {
            return occupation != [] ? (
              <Select.Option value={occupation.id}>
                {occupation.name}
              </Select.Option>
            ) : null;
          })}
        </Select>
        <DatePicker
          name="birthdate"
          onChange={handleDateChange}
          placeholder="Data de Nascimento"
        />
        <Select
          name="state"
          value={formData["state"]}
          onChange={() => handleSelectChange("state")}
          placeholder="Estado"
        >
          <Select.Option value="AC">Acre</Select.Option>
          <Select.Option value="AL">Alagoas</Select.Option>
          <Select.Option value="AP">Amapá</Select.Option>
          <Select.Option value="AM">Amazonas</Select.Option>
          <Select.Option value="BA">Bahia</Select.Option>
          <Select.Option value="CE">Ceará</Select.Option>
          <Select.Option value="DF">Distrito Federal</Select.Option>
          <Select.Option value="ES">Espírito Santo</Select.Option>
          <Select.Option value="GO">Goiás</Select.Option>
          <Select.Option value="MA">Maranhão</Select.Option>
          <Select.Option value="MT">Mato Grosso</Select.Option>
          <Select.Option value="MS">Mato Grosso do Sul</Select.Option>
          <Select.Option value="MG">Minas Gerais</Select.Option>
          <Select.Option value="PA">Pará</Select.Option>
          <Select.Option value="PB">Paraíba</Select.Option>
          <Select.Option value="PR">Paraná</Select.Option>
          <Select.Option value="PE">Pernambuco</Select.Option>
          <Select.Option value="PI">Piauí</Select.Option>
          <Select.Option value="RJ">Rio de Janeiro</Select.Option>
          <Select.Option value="RN">Rio Grande do Norte</Select.Option>
          <Select.Option value="RS">Rio Grande do Sul</Select.Option>
          <Select.Option value="RO">Rondônia</Select.Option>
          <Select.Option value="RR">Roraima</Select.Option>
          <Select.Option value="SC">Santa Catarina</Select.Option>
          <Select.Option value="SP">São Paulo</Select.Option>
          <Select.Option value="SE">Sergipe</Select.Option>
          <Select.Option value="TO">Tocantins</Select.Option>
        </Select>
      </Modal>
    </Base>
  );
}
