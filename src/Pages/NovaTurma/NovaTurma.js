import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Input, Button, message, Table } from "antd";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./NovaTurma.css";

export default function NovaAula(props) {
  const [cl4ss, setClass] = useState({});
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { session } = useSession();
  const history = useHistory();
  const course = new URLSearchParams(props.location.search);

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  const configStudents = {
    ...config,
    params: {
      "user.organization_id": session.user.organization_id,
      "user.type": "student",
    },
  };

  useEffect(() => {
    api
      .get("/user", configStudents)
      .then((users) => {
        let students = [];

        users.data.map((user) => {
          students.push({ ...user, key: user.id });
        });

        setStudents(students);
        setFilteredStudents(students);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [configStudents]);

  const formLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const formTailLayout = {
    wrapperCol: {
      offset: 4,
    },
  };

  const studentsTable = [
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "Matrícula",
      dataIndex: "registration",
    },
    {
      title: "Ocupação",
      dataIndex: "occupation_name",
    },
  ];

  const selectedRows = {
    onChange: (selected) => {
      setSelectedStudents(selected);
    },
  };

  function handleChange(e) {
    setClass({ ...cl4ss, [e.target.name]: e.target.value });
  }

  function handleSearch(value) {
    setSearch(value);
    setFilteredStudents(
      students.filter((student) => {
        if (value === "") return student;
        return (
          student.name.toLowerCase().includes(value.toLowerCase()) ||
          student.registration.toString().includes(value) ||
          student.occupation_name.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      ...cl4ss,
      students: selectedStudents,
      course_id: course.get("course"),
      organization_id: session.user.organization_id,
    };
    
    if(data.students.length === 0){
      message.error("Não se pode criar uma turma vazia!");
      return;
    };
    
    api
      .post("/class_create", data, config)
      .then((response) => {
        
        message.success("Turma criada com sucesso!");
        history.push(`/curso/gerenciar/${data.course_id}`);
      })
      .catch((err) => {
        console.log(err);
        message.error("Não foi possível criar a turma!");
      });
  }

  return (
    <Base>
      <div className="pageRoot">
        <div className="pageBody">
          <div className="formWrapper">
            <Form
              {...formLayout}
              name="newClass"
              className="classForm"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              size={"large"}
              scrollToFirstError
            >
              <Form.Item {...formTailLayout}>
                <h1>Nova Turma</h1>
              </Form.Item>
              <Form.Item
                name="name"
                label={<label style={{ fontSize: "large" }}> Nome </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o nome da turma!",
                  },
                ]}
              >
                <Input
                  placeholder="Nome da turma"
                  name="name"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="description"
                label={<label style={{ fontSize: "large" }}> Descrição </label>}
              >
                <Input
                  placeholder="Descreva o detalhes da turma"
                  name="description"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="students"
                label={<label style={{ fontSize: "large" }}> Alunos </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor selecione pelo menos um aluno!",
                  },
                ]}
              >
                <Input
                  className="search-students"
                  placeholder="Pesquisar..."
                  onChange={(e) => handleSearch(e.target.value)}
                  value={search}
                />
                <Table
                  rowSelection={selectedRows}
                  columns={studentsTable}
                  dataSource={filteredStudents}
                  loading={loading}
                />
              </Form.Item>
              <Form.Item {...formTailLayout}>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  style={{ fontSize: "large" }}
                >
                  Criar Turma
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Base>
  );
}
