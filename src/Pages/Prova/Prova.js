import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Button, DatePicker, message } from 'antd';
import { AnswerText, AnswerAlternatives } from "../../Components/DynamicForms/dynamicForms"
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

  const [exam, setExam] = useState(false);
  const [answers, setAnswers] = useState([])

  const { session } = useSession();
  const { history } = useHistory();

  const exam_id = props.match.params.id;

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    api
      .get(`/exam/${exam_id}`, config)
      .then(response => {

        if (session.user.type === "student" && response.data.status !== "open") {
          message.error("Você não tem permissão para ver essa prova!");
          history.push("/dashboard");
        }

        setExam(response.data);
      })
      .catch(() => {

      });

  }, [])

  const answerSubmit = async values => {
    const answer = {
      exam_id: exam.id,
      user_id: session.user.id,
      answers,
    }

    api
      .post("exam/answer", exam, config)
      .then(message.success("Prova criada com sucesso!"))
      .catch(err => {
        message.error("Não foi possível criar a prova!");
      })
  };

  const handleChange = (e) => {
    console.log(e)
  }

  return (
    <Base>
      <div className="pageRoot">
        <div className="formWrapper">
          <h1 className="examTitle">{exam && exam.name}</h1>
          {exam &&
            <Form
              {...examLayout}
              name="answerForm"
              onFinish={answerSubmit}
              size={"large"}
              scrollToFirstError
            >
              {exam && Object.values(exam.body).map((question, index) => {
                

                if (question.alternatives === undefined)
                  return <AnswerText
                    index={index}
                    header={question.header}
                    onChange={handleChange}
                  />

                else
                  return <AnswerAlternatives
                    index={index}
                    header={question.header}
                    alternatives={question.alternatives}
                    onChange={handleChange}
                  />
              })}
              <Form.Item {...examTailLayout}>
                <Button type="primary" htmlType="submit">
                  Criar
                </Button>
              </Form.Item>
            </Form>
          }
        </div>
      </div>
    </Base>
  );
}
