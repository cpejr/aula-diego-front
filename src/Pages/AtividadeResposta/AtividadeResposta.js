import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, message } from "antd";
import {
  AnswerText,
  AnswerAlternatives,
} from "../../Components/DynamicForms/dynamicForms";
import { useSession } from "../../Context/SessionContext";
import "./AtividadeResposta.css";

export default function AtividadeResposta(props) {
  const [answer, setAnswer] = useState(false);

  const { session } = useSession();

  const answer_id = props.match.params.id;

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    api
      .get(`/answer/${answer_id}`, config)
      .then(async (response) => {
        Promise.all(
          Object.values(response.data.questions)
            .map((question) => question.image)
            .map(async (image, index) => {
              if (image !== undefined)
                await api.get(`/file_get/${image}`, config).then((file_res) => {
                  response.data.questions[index].image = file_res.data.url;
                  console.log(response.data.questions[index].image);
                  Promise.resolve("");
                });
            })
        ).then(() => setAnswer(response.data));
      })
      .catch((err) => {
        console.log(err);
        message.error("Não foi possível carregar dados da prova!");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Base>
      <div className="resultRoot">
        <div className="resultFormWrapper">
          <p className="resultTitle">{answer && answer.exercise_name}</p>
          {answer && (
            <Form name="answerForm" size={"large"}>
              {answer &&
                Object.values(answer.questions).map((question, index) => {
                  console.log(question);
                  if (question.alternatives === undefined)
                    return (
                      <AnswerText
                        index={index}
                        heading={question.heading}
                        image={question.image}
                        initialValue={answer.answers[index]}
                        disabled
                      />
                    );
                  else
                    return (
                      <AnswerAlternatives
                        index={index}
                        heading={question.heading}
                        image={question.image}
                        initialValue={answer.answers[index]}
                        alternatives={question.alternatives}
                        disabled
                      />
                    );
                })}
            </Form>
          )}
        </div>
      </div>
    </Base>
  );
}
