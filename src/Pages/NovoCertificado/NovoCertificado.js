import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Input, Button, message, Table, Select } from "antd";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";

export default function NovaAula(props) {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [loading, setLoading] = useState(true);
  const { session } = useSession();
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
    api
      .get("/user", configStudents)
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
        message.error(err);
      });
  }, []);

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

  const selectedRow = {
    onChange: (selected) => {
      setSelectedStudent(selected);
      api
        .get(`/course/user/${selected}`, config)
        .then((response) => {
          if (
            session.user.type === "master" ||
            response.data[0].organization_id === session.user.organization_id
          )
            setCourses(response.data);
          else return;
        })
        .catch(() => {
          if (selectedStudent != [])
            message.error("Não foi possível carregar dados dos cursos");
        })
        .finally(() => setLoading(false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    type: "radio",
  };

  function handleCourseChange(value) {
    setCourse(value);
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
      user_id: selectedStudent[0],
      course_id: course,
    };

    if (data.user_id === null) {
      message.error("Não se pode gerar certificado sem um aluno!");
      return;
    }

    api
      .post("/certificate", data, config)
      .then((response) => {
        message.success("Certificado gerado com sucesso!");
        window.location = response.data.url;
      })
      .catch((error) => {
        if (
          error?.response?.data?.message ===
          "Certificado já existente na base de dados"
        ) {
          message.warning("Certificado já existente na base de dados");
          window.location = error?.response?.data?.url;
          return;
        }

        message.error("Não foi possível criar o certificado!");
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
                <h1>Novo Certificado</h1>
              </Form.Item>
              <Form.Item
                name="students"
                label={<label style={{ fontSize: "large" }}> Aluno </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor selecione um aluno!",
                  },
                ]}
              >
                <Input
                  className="search-students"
                  placeholder="Pesquisar..."
                  size="large"
                  onChange={(e) => handleSearch(e.target.value)}
                  value={search}
                />
                <Table
                  rowSelection={selectedRow}
                  columns={studentsTable}
                  dataSource={filteredStudents}
                  loading={loading}
                />
              </Form.Item>
              <Form.Item
                name="course_id"
                label="Curso"
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o curso!",
                  },
                ]}
              >
                <Select
                  onChange={handleCourseChange}
                  placeholder="Escolha o curso"
                >
                  {courses.map((course) => {
                    return (
                      <Select.Option
                        //key={course.course_id}
                        value={course.course_id}
                      >
                        {course.course_name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item {...formTailLayout}>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  style={{ fontSize: "large" }}
                >
                  Gerar Certificado
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Base>
  );
}
