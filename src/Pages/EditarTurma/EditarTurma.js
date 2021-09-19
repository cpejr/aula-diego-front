import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Input, Button, message, Table } from "antd";
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
  const [name, SetName] = useState("");
  const [description, SetDescription] = useState("");
  const [courseId, setCourseId] = useState("");
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
 
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
  const configUserClass = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    params: {
      class_id: id,
    },
  };
  useEffect(() => {
    api.get("/user", configStudents)
        .then((users) => {
          let students = [];

          // eslint-disable-next-line array-callback-return
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
        
        api
        .get(`/class/${id}`, config).then((response) => {
          SetClasses(response.data);
          SetName(response.data.name);
          SetDescription(response.data.description);
          setCourseId(response.data.course_id);
          // setFilteredData(response.data);
          
        })
        .catch((err) => {
          console.log(err);
        });
        
       
        
        api
        .get("/class_user", configUserClass)
        .then((response) => {
          const students = [];
          for (let student of response.data){
            students.push(student.user_id);
          }
        
          setSelectedRowKeys(students);
        })
        .catch((err) => {
          message.error("Não foi possível editar a turma!\n" + err);
        });
        
    }, [config, configStudents, configUserClass, id]);
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

  const rowSelection = {
    selectedRowKeys,
    onChange: (selected) => {
      setSelectedRowKeys(selected);
    },
    
  };
  
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
      students: selectedRowKeys,
    };
    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };
    if(selectedRowKeys.length === 0){
      message.error("A turma não pode ser vazia!\n" );  
      setLoading(false);
      return;
    }
    
    

    api
      .put(`/class`, data, config)
      .then((response) => {
        
        setSelectedRowKeys(response.data);
        message.success("Turma editada com sucesso!");
        history.push(`/curso/gerenciar/${courseId}`);
      })
      .catch((err) => {
        message.error("Não foi possível editar a turma!\n" + err);
      });
      setLoading(false);
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
                  rowSelection={rowSelection}
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