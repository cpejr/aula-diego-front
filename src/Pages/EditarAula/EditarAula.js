/* import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, DatePicker, Input, Button, message, Upload } from "antd";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./EditarAula.css";
import { UploadOutlined } from "@ant-design/icons";

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
  const [lesson, SetLesson] = useState([]);
  const [edit, setEdit] = useState({});
  const [name, SetName] = useState("");
  const [description, SetDescription] = useState("");
  const [courseId, setCourseId] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

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
    files,
  };
  
  
  
  useEffect(() => {
    api.get(`/lesson/${id}`, config).then((response) => {
      SetLesson(response.data);
      SetName(response.data.name);
      SetDescription(response.data.description);
      setCourseId(response.data.course_id);
      console.log(response.data.description);
      console.log(response.data.files);
      // setFilteredData(response.data);
      
    });
  }, []);

  function handleChangeDate(e) {
    setEdit({ ...edit, date: e._d });
  }

  
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
    console.log(lesson);
    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };

    api
      .put(`/lesson`, data, config)
      .then(() => {
        message.success("Aula editada com sucesso!");
        history.push(`/curso/gerenciar/${courseId}`);
      })
      .catch((err) => {
        message.error("Não foi possível editar a aula!\n" + err);
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
                  onChange={(e) => SetName(e.target.value)}
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
                  onChange={(e) => SetDescription(e.target.value)}
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
                <Upload {...fileProps} >
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

