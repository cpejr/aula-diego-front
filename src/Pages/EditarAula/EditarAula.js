/* import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Upload, Input, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "../EditarLive/EditarLive.css";

const { TextArea } = Input;

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

export default function EditarAula(props) {
  const [lesson, setLesson] = useState([]);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [courseId, setCourseId] = useState("");

  const [loading, setLoading] = useState(false);
  const { session } = useSession();
  const id = props.match.params.id;
  const history = useHistory();

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

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    api.get(`/lesson/${id}`, config).then((response) => {
      setLesson(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setText(response.data.text);
      setCourseId(response.data.course_id);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: name,
      description: description,
      text: text,
    };

    console.log(data);

    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };

    api
      .put(`/lesson/${id}`, data, config)
      .then(() => {
        message.success("Aula editada com sucesso!");
        history.push(`/curso/gerenciar/${courseId}`);
      })
      .catch((err) => {
        message.error("Não foi possiível editar a aula!\n" + err);
      });

    const fileNames = files.map((file) => file.name);

    const fileIds = [];

    const dataFile = {
      ...lesson,
      course_id: course,
      user_id: session.user.id,
      file_names: fileNames,
    };

    console.log(dataFile);

    setUploading(true);

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
              {...formItemLayout}
              name="newLive"
              className="liveForm"
              onFinish={handleSubmit}
              size={"large"}
            >
              <Form.Item {...tailFormItemLayout}>
                <h1>Editar Aula</h1>
              </Form.Item>
              <Form.Item
                label={<label style={{ fontSize: "large" }}> Título </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o nome da live!",
                  },
                ]}
              >
                <Input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label={<label style={{ fontSize: "large" }}> Descrição </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira a descrição da live!",
                  },
                ]}
              >
                <Input
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label={<label style={{ fontSize: "large" }}> Texto </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o texto da aula!",
                  },
                ]}
              >
                <TextArea
                  name="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  size="large"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
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
 */