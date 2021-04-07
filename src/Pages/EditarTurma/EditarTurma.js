import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, DatePicker, Input, Button, message, Table } from "antd";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./EditarTurma.css";

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    offset: 4,
  },
};

export default function EditarTurma(props) {
  const [classes, SetClasses] = useState([]);
  const [edit, setEdit] = useState({});
  const [name, SetName] = useState("");
  const [description, SetDescription] = useState("");
  const [courseId, setCourseId] = useState("");
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const { session } = useSession();
  const id = props.match.params.id;
  const history = useHistory();

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
    api.get("/user", configStudents)
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
        
    api.get(`/class/${id}`, config).then((response) => {
      SetClasses(response.data);
      SetName(response.data.name);
      SetDescription(response.data.description);
      setCourseId(response.data.course_id);
      console.log(response.data);
      console.log(response.data.name);
      // setFilteredData(response.data);
      
    });
  }, []);
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
  
  function handleChangeDate(e) {
    setEdit({ ...edit, date: e._d });
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
    setLoading(true);

    const data = {
      id,
      name: name,
      description: description,
      course_id: classes.course_id,
    };
    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };
    
    api
      .put(`/class`, data, config)
      .then(() => {
        message.success("Turma editada com sucesso!");
        history.push(`/curso/gerenciar/${courseId}`);
      })
      .catch((err) => {
        message.error("Não foi possível editar a turma!\n" + err);
      });
  }
  return (
    <Base>
      <div className="pageRoot">
        <div className="pageBody">
          <div className="formWrapper">
            <Form
              {...formItemLayout}
              name="newClass"
              className="ClassForm"
              onFinish={handleSubmit}
              size={"large"}
            >
              <Form.Item {...tailFormItemLayout}>
                <h1>Editar Turma</h1>
              </Form.Item>
              <Form.Item
                label={<label style={{ fontSize: "large" }}> Título </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o nome da turma!",
                  },
                ]}
              >
                <Input
                  name="name"
                  value={name}
                  onChange={(e) => SetName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label={<label style={{ fontSize: "large" }}> Descrição </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira a descrição da turma!",
                  },
                ]}
              >
                <Input
                  name="description"
                  value={description}
                  onChange={(e) => SetDescription(e.target.value)}
                />
              </Form.Item>   
              <Form.Item
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
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  style={{ fontSize: "large" }}
                  loading={loading}
                >
                  Editar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Base>
  );
}