import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Input, Button, message, Upload } from "antd";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./EditarAula.css";
import {
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

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

const formLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function EditarAula(props) {
  const [lesson, setLesson] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [defaultFileList, setDefaultFileList] = useState([]);

  const [loading, setLoading] = useState(false);
  const { session } = useSession();
  const id = props.match.params.id;
  const history = useHistory();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
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
    defaultFileList: [...defaultFileList],
    files,
  };

  useEffect(() => {
    api.get(`/lesson/${id}`, config).then((response) => {
      setLesson(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setCourseId(response.data.course_id);
      setFiles(response.data.files);
      setDefaultFileList(
        response.data.files.map((file) => {
          return {
            uid: file.id,
            name: file.name,
            status: "done",
            url: file.path,
          };
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const data = {
      id,
      name: name,
      description: description,
      course_id: lesson.course_id,
    };

    setUploading(true);
    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };

    if (files) {
      const formData = new FormData();
      files.forEach((item, index) => {
        if (!defaultFileList.includes(item)) {
          return formData.append(index, files[index]);
        }
      });

      api
        .post("/file_upload", formData, config)
        .then((response) => {
          api
            .put(
              `/lesson/${id}`,
              { ...data, file_ids: response.data.file_ids },
              config
            )
            .then(() => {
              message.success("Aula atualizada com sucesso!");
              history.push(`/curso/gerenciar/${courseId}`);
              setUploading(false);
            });
        })
        .catch((err) => {
          message.error("Não foi possível editar a aula!\n" + err);
        });

      return;
    }

    api.put(`/lesson/${id}`, data, config).then(() => {
      message.success("Aula atualizada com sucesso!");
      history.push(`/curso/gerenciar/${courseId}`);
      setUploading(false);
    });
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
                <h1>Editar Aula</h1>
              </Form.Item>
              <Form.Item
                label={<label style={{ fontSize: "large" }}> Título </label>}
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o nome da aula!",
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
                    message: "Por favor insira a descrição da aula!",
                  },
                ]}
              >
                <Input
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>
              <Form.List name="videos">
                {(fields, { add, remove }) => (
                  <Form.Item {...formLayout} label="Vídeos">
                    {fields.map((field, index) => (
                      <div className="inputVideoWrapper">
                        <Form.Item
                          {...field}
                          className="inputURL"
                          onChange={(e) => handleChangeVideo(e, index)}
                          rules={[
                            { required: true, message: "Insira URL do vídeo" },
                          ]}
                        >
                          <Input placeholder="URL do vídeo" />
                        </Form.Item>
                        <MinusCircleOutlined
                          style={{ fontSize: "large" }}
                          onClick={() => {
                            remove(index);
                            removeVideo();
                          }}
                        />
                      </div>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                          addVideo();
                        }}
                        icon={<PlusOutlined />}
                      >
                        Adicionar vídeo
                      </Button>
                    </Form.Item>
                  </Form.Item>
                )}
              </Form.List>
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
                {defaultFileList.length > 0 && (
                  <Upload {...fileProps} defaultFileList={defaultFileList}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  style={{ fontSize: "large" }}
                  loading={loading}
                >
                  {uploading ? "Editando" : "Editar aula"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Base>
  );
}
