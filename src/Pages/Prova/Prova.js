import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Button, DatePicker, message } from 'antd';
import { AnswerText, AnswerAlternatives } from "../../Components/DynamicForms/dynamicForms"
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./Prova.css";

const examLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
};

const examTailLayout = {
  wrapperCol: { offset: 3, span: 16 },
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

  const configFile = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    responseType: "blob",
  };

  useEffect(() => {
    api
      .get(`/exam/${exam_id}`, config)
      .then(async response => {
        let exam = response.data;

        if (session.user.type === "student" && response.data.status !== "open") {
          message.error("Você não tem permissão para ver essa prova!");
          history.push("/dashboard");
        }

        const keys = Object.keys(response.data.questions);

        for (const key of keys) {
          if (exam.questions[key].image !== undefined)
            await api
              .get(`/file_get/${exam.questions[key].image}`, configFile)
              .then(response => {
                exam.questions[key].image = URL.createObjectURL(response.data);
              });
        }

        setExam(exam);
      })
      .catch((err) => { message.error("Não foi possível carregar dados da prova!") });

  }, [])

  const answerSubmit = async values => {
    const answer = {
      exam_id: exam.id,
      user_id: session.user.id,
      answers,
    }

    console.log(answer)

    /* api
      .post("exam/answer", exam, config)
      .then(message.success("Prova criada com sucesso!"))
      .catch(err => {
        message.error("Não foi possível criar a prova!");
      }) */
  };

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value })
  }

  return (
    <Base>
      <div className="examRoot">
        <div className="formWrapper">
          <text className="examTitle">{exam && exam.name}</text>
          {exam &&
            <Form
              {...examLayout}
              name="answerForm"
              onFinish={answerSubmit}
              size={"large"}
              scrollToFirstError
            >
              {exam && Object.values(exam.questions).map((question, index) => {
                if (question.alternatives === undefined)
                  return <AnswerText
                    index={index}
                    header={question.header}
                    image={question.image}
                    onChange={handleChange}
                    layout={examLayout}
                    tailLayout={examTailLayout}
                  />

                else
                  return <AnswerAlternatives
                    index={index}
                    header={question.header}
                    image={question.image}
                    alternatives={question.alternatives}
                    onChange={handleChange}
                    layout={examLayout}
                    tailLayout={examTailLayout}
                  />
              })}
              <Form.Item {...examTailLayout}>
                <Button type="primary" htmlType="submit">
                  Enviar
                </Button>
              </Form.Item>
            </Form>
          }
        </div>
      </div>
    </Base>
  );
}
