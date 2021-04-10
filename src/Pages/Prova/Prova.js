/* import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Button, DatePicker, message } from 'antd';
import { Field, InputField, QuestionText, QuestionAlternatives } from "../../Components/DynamicForms/dynamicForms"
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./Prova.css";

const examLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 },
};

const examTailLayout = {
  wrapperCol: { offset: 2, span: 20 },
};

export default function NovaProva(props) {
  const [exam, setExam] = useState({});
  const [answers, setAnswers] = useState([])

  const { session } = useSession();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    api
      .get(`/exam`, config)
      .then(response => {
        setExam(response.data);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das aulas");
      });

  }, [])

  const examSubmit = async values => {

    const answer = {
      exam_id: exam.id,
      user_id: session.user.id,
      answers,
    }

    const keys = Object.keys(images);

    for await (const key of keys) {
      if (images[key] !== undefined) {
        const file = {
          user_id: session.user.id,
          file_name: `${exam.name} ${key}`,
          file_type: images[key].type,
          file_original: images[key].name
        }

        await api
          .post("file", file, config)
          .then(fileId => {
            const formData = new FormData();
            formData.append(fileId.data.file_id, images[key]);

            api
              .post("file_upload", formData, configFiles)
              .catch(err => {
                message.error("Não foi possível criar a prova!");
              })

            exam.body[key].image = fileId.data.file_id;

            console.log(exam)
          })
          .catch(err => {
            message.error("Não foi possível criar a prova!");
          })
      }
    }

    api
      .post("exam", exam, config)
      .then(message.success("Prova criada com sucesso!"))
      .catch(err => {
        message.error("Não foi possível criar a prova!");
      })
  };

  return (
    <Base>
      <div className="pageRoot">
        <div className="formWrapper">
          <Form
            {...examLayout}
            name="examForm"
            onFinish={examSubmit}
            size={"large"}
            scrollToFirstError
          >
            <Form.Item {...examTailLayout}>
              <Button type="primary" htmlType="submit">
                Criar
            </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Base>
  );
}
 */