import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Button, DatePicker, message } from 'antd';
import { AnswerText, AnswerAlternatives } from "../../Components/DynamicForms/dynamicForms"
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./Avaliar.css";
import { CompassOutlined } from "@ant-design/icons";

const examLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
};

const examTailLayout = {
  wrapperCol: { offset: 3, span: 16 },
};

export default function NovaProva(props) {

  const [exam, setExam] = useState(false);

  const { session } = useSession();
  const { history } = useHistory();

  const answer_id = props.match.params.id;

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
      .get(`/answer/${answer_id}`, config)
      .then(async response => {
        let exam = response.data;
        const keys = Object.keys(exam.questions);

        for (const key of keys) {
          if (exam.questions[key].image !== undefined)
            await api
              .get(`/file_get/${exam.questions[key].image}`, configFile)
              .then(response => {
                exam.questions[key].image = URL.createObjectURL(response.data);
              });

          exam.questions[key].answer = exam.answers[key];
        }

        setExam(exam);
      })
      .catch((err) => { console.log(err);message.error("Não foi possível carregar dados da prova!") });

  }, [session])

  /* const answerSubmit = async () => {
    const answer = {
      exam_id: exam.id,
      user_id: session.user.id,
      answers,
    }

    api
      .post("answer", answer, config)
      .then(() => message.success("Resposta enviada com sucesso!"))
      .catch(err => {message.error("Não foi possível criar a prova!");})
  }; */

  /* const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value })
  } */

  console.log(exam)

  return (
    <Base>
      <div className="examRoot">
        <div className="formWrapper">
          <text className="examTitle">{exam && exam.name}</text>
          {exam &&
            <Form
              {...examLayout}
              name="answerForm"
              /* onFinish={answerSubmit} */
              size={"large"}
              scrollToFirstError
            >
              {exam && Object.values(exam.questions).map((question, index) => {
                if (question.alternatives === undefined)
                  return <AnswerText
                    index={index}
                    header={question.header}
                    image={question.image}
                    value={question.answer}
                    /* onChange={handleChange} */
                    layout={examLayout}
                    tailLayout={examTailLayout}
                    disabled
                  />

                else
                  return <AnswerAlternatives
                    index={index}
                    header={question.header}
                    image={question.image}
                    value={question.answer}
                    alternatives={question.alternatives}
                    /* onChange={handleChange} */
                    layout={examLayout}
                    tailLayout={examTailLayout}
                    disabled
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
