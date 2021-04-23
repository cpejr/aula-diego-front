import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Button, DatePicker, message } from 'antd';
import { AnswerText, AnswerAlternatives } from "../../Components/DynamicForms/dynamicForms"
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./AtividadeResposta.css";

export default function AtividadeResposta(props) {

  const [answer, setAnswer] = useState(false);

  const { session } = useSession();
  const history = useHistory();

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
        Promise.all(
          Object.values(response.data.questions).map(question => question.image).map(async (image, index) => {
            await api
              .get(`/file_get/${image}`, configFile)
              .then(file => {
                response.data.questions[index].image = URL.createObjectURL(file.data);
                Promise.resolve("");
              });
          })
        )
        .then(() => setAnswer(response.data));
      })
      .catch(err => {message.error("Não foi possível carregar dados da prova!")});

  }, [])

  console.log(answer)

  return (
    <Base>
      <div className="resultRoot">
        <div className="resultFormWrapper">
          <p className="resultTitle">{answer && answer.exercise_name}</p>
          {answer &&
            <Form
              name="answerForm"
              size={"large"}
            >
              {answer && Object.values(answer.questions).map((question, index) => {
                console.log(question)
                if (question.alternatives === undefined)
                  return <AnswerText
                    index={index}
                    heading={question.heading}
                    image={question.image}
                    value={answer.answers[index]}
                    disabled
                  />

                else
                  return <AnswerAlternatives
                    index={index}
                    heading={question.heading}
                    image={question.image}
                    value={answer.answers[index]}
                    alternatives={question.alternatives}
                    disabled
                  />
              })}
            </Form>
          }
        </div>
      </div>
    </Base>
  );
}