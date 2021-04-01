import React, { useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Upload, Input, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./NovaAula.css";

export default function NovaAula(props) {
  const [lesson, setLesson] = useState({});
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const course = props.location.search;
  const course_id = course.split("=", 2)[1];
  const { session } = useSession();
  const history = useHistory();

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

  const fileProps = {
    name: "file",
    multiple: "true",
    onRemove: (file) => {
      const index = files.indexOf(file);
      const newFiles = files;
      newFiles.splice(index, 1);
      setFiles(newFiles);
    },
    beforeUpload: (file) => {
      setFiles([...files, file]);
      return false;
    },
    files,
  };

  function handleChange(e) {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fileIds = [];

    const data = {
      ...lesson,
      course_id: course_id,
      user_id: session.user.id,
      files: files,
    };

    console.log(data);
    setUploading(true);

    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };

    const configFiles = {
      headers: {
        authorization: "BEARER " + session.accessToken,
        "Content-Type": "multipart/form-data",
        processData: false,
        contentType: false,
      },
    };

    console.log(course.id);

    api
      .post("/lesson_create", data, config)
      .then((response) => {
        fileIds.push(response.data);

        for (let i = 0; i < fileIds.length; i++) {
          const formData = new FormData();
          formData.append(fileIds[i], files[i]);

          api.post("file_upload", formData, configFiles).catch((err) => {
            message.error("Não foi possível criar a aula!");
          });
        }

        setUploading(false);
        message.success("Aula criada com sucesso!");
        history.push(`/curso/${course_id}`);
      })
      .catch((err) => {
        message.error("Não foi possível criar a aula!");
        console.log(course.id);
        setUploading(false);
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
                <h1>Nova Aula</h1>
              </Form.Item>
              <Form.Item
                name="name"
                label={<label style={{ fontSize: "large" }}> Título </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o título da aula!",
                  },
                ]}
              >
                <Input
                  placeholder="Título da aula"
                  name="name"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="description"
                label={<label style={{ fontSize: "large" }}> Descrição </label>}
              >
                <Input
                  placeholder="Descreva o temas que serão abordados na aula"
                  name="description"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="files"
                label={<label style={{ fontSize: "large" }}> Arquivos </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira no mínimo um arquivo!",
                  },
                ]}
              >
                <Upload {...fileProps}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item {...formTailLayout}>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  loading={uploading}
                  style={{ fontSize: "large" }}
                >
                  {uploading ? "Criando" : "Criar aula"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Base>
  );
}
