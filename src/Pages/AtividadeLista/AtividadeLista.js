import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Table, Input, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ActionButton from "../../Components/ActionButton/actionButton"
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./AtividadeLista.css";


export default function AtividadeLista(props) {
  const [answers, setAnswers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const { session } = useSession();
  const history = useHistory();

  const exercise_id = props.match.params.id;

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    params: {
      exercise_id: exercise_id,
    },
  };

  useEffect(() => {
    api
      .get(`/answer`, config)
      .then((response) => {
        const answers = []

        response.data.map(answer => {
          answers.push({
            ...answer,
            date: new Date(answer.created_at).toLocaleDateString("pt-BR"),
            grade: answer.grade !== null ? answer.grade : 'Não avaliativa'
          })
        });

        console.log(response.data)

        setAnswers(answers);
        setFiltered(answers)
        setLoading(false);
      })
      .catch(err => { console.log(err); message.error("Não foi possível carregar dados das respostas!") });
  }, [config]);

  const columns = [
    {
      title: <h5>Aluno</h5>,
      dataIndex: "user_name",
      width: "40%",
    },
    {
      title: <h5>Envio</h5>,
      dataIndex: "date",
      width: "20%",
    },
    {
      title: <h5>Nota</h5>,
      dataIndex: "grade",
      width: "20%",
    },
    {
      title: <h5>Ações</h5>,
      dataIndex: ("id"),
      width: "20%",
      render: (id) => (
        <ActionButton title="Visualizar" confirm="Visualizar resposta?" onConfirm={() => history.push(`/atividade/resposta/${id}`)}>
          <EyeOutlined />
        </ActionButton>
      ),
    },
  ];

  function handleSearch(value) {
    setFiltered(answers.filter(data => {
      if (value === "") return data;
      return (
        data.name.toLowerCase().includes(value.toLowerCase()) ||
        data.description.toLowerCase().includes(value.toLowerCase()) ||
        data.organization_name.toLowerCase().includes(value.toLowerCase())
      )
    }));
  }

  return (
    <Base>
      <div className="exerciseListRoot">
        <h1 className="exerciseListTitle">Respostas</h1>
        <div className="exerciseListWrapper">
          <div className="inputWrapper">
            <Input
              className="search"
              placeholder="Pesquisar..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Table
            columns={columns}
            dataSource={filtered}
            loading={loading}
          />
        </div>
      </div>

    </Base>
  );
}