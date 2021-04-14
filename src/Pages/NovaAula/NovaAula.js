import React, { useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Upload, Input, Button, message } from "antd";
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./NovaAula.css";

const { TextArea } = Input

export default function NovaAula(props) {
  const [lesson, setLesson] = useState({videos: []});
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { session } = useSession();
  const history = useHistory();

  const query = new URLSearchParams(props.location.search);
  const course = query.get("course");

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

  function addVideo() {
    lesson.videos.push("");
    setLesson(lesson);
  }

  function removeVideo() {
    lesson.videos.pop();
    setLesson(lesson);
  }

  function handleChangeVideo(e, index) {
    lesson.videos[index] = e.target.value;
    setLesson(lesson);
  }

  console.log(lesson)

  function handleSubmit(e) {
    e.preventDefault();

    const fileNames = files.map(file => file.name);

    const fileIds = [];

    const data = {
      ...lesson,
      course_id: course,
      user_id: session.user.id,
      file_names: fileNames
    };

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
        history.push(`/curso/${course}`);
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
                label="Título"
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
                label="Descrição"
              >
                <Input
                  placeholder="Temas que serão abordados"
                  name="description"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="text"
                label="Texto"
              >
                <TextArea
                  placeholder="Conteúdo da aula"
                  onChange={handleChange}
                  autoSize={{ minRows: 3 }}
                />
              </Form.Item>
              <Form.List name="videos" >
                {(fields, { add, remove }) => (
                  <Form.Item {...formLayout} label="Vídeos" >
                    {fields.map((field, index) => (
                      <div className="inputVideoWrapper">
                        <Form.Item
                          {...field}
                          className="inputURL"
                          onChange={(e) => handleChangeVideo(e, index)}
                          rules={[{ required: true, message: 'Insira URL do vídeo' }]}
                        >
                          <Input placeholder="URL do vídeo" />
                        </Form.Item>
                        <MinusCircleOutlined style={{fontSize: "large"}} onClick={() => {remove(index); removeVideo()}} />
                      </div>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => {add(); addVideo()}} icon={<PlusOutlined />}>
                        Adicionar vídeo
                      </Button>
                    </Form.Item>
                  </Form.Item>
                )}
              </Form.List>
              <Form.Item
                name="files"
                label="Arquivos"
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
