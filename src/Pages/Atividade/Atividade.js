import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Button, message } from "antd";
import {
  AnswerText,
  AnswerAlternatives,
} from "../../Components/DynamicForms/dynamicForms";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./Atividade.css";
import handleError from "../../utils/handleError";

const examLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
};

const examTailLayout = {
  wrapperCol: { offset: 3, span: 16 },
};

export default function Atividade(props) {
  const [exercise, setExercise] = useState(false);
  const [submit, setSubmit] = useState({});

  const { session } = useSession();
  const history = useHistory();

  const exercise_id = props.match.params.id;

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    api
      .get(`/exercise/${exercise_id}`, config)
      .then(async (response) => {
        let exercise = response.data;
        const exerciseDueDate = new Date(exercise.end_date);
        const exerciseIsClosed = !exercise.open || exerciseDueDate < new Date();

        if (session.user.type === "student" && exerciseIsClosed) {
          message.error("Você não tem permissão para ver essa prova!");
          history.push("/dashboard");
        }

        const keys = Object.keys(response.data.questions);

        for (const key of keys) {
          if (exercise.questions[key].image !== undefined)
            await api
              .get(`/file_get/${exercise.questions[key].image}`, config)
              .then((response) => {
                exercise.questions[key].image = response.data.url;
              });
        }

        setExercise(exercise);
        setSubmit({
          user_id: session.user.id,
          exercise_id: exercise_id,
          evaluate: exercise.evaluate,
        });
      })
      .catch((err) => {
        handleError(err, "Não foi possível carregar dados da prova!");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleChange = (index, value) =>
    setSubmit({ ...submit, answers: { ...submit.answers, [index]: value } });

  const answerSubmit = async () => {
    api
      .post("answer", submit, config)
      .then((response) => {
        console.log(response.data.id);
        message.success("Resposta enviada com sucesso!");

        if (exercise.evaluate === true)
          history.push(`/atividade/resultado/${response.data.id}`);
        else history.push(`/atividade/resposta/${response.data.id}`);
      })
      .catch((err) => {
        console.log(err.response);
        handleError(err, "Não foi possível enviar resposta!");
      });
  };

  return (
    <Base>
      <div className="examRoot">
        <div className="formWrapper">
          <h3 className="exerciseTitle">{exercise && exercise.name}</h3>
          {exercise && (
            <Form
              {...examLayout}
              name="answerForm"
              onFinish={answerSubmit}
              size={"large"}
              scrollToFirstError
            >
              {exercise &&
                Object.values(exercise.questions).map((question, index) => {
                  if (question.alternatives === undefined)
                    return (
                      <AnswerText
                        index={index}
                        heading={question.heading}
                        image={question.image}
                        onChange={handleChange}
                      />
                    );
                  else
                    return (
                      <AnswerAlternatives
                        index={index}
                        heading={question.heading}
                        image={question.image}
                        alternatives={question.alternatives}
                        onChange={handleChange}
                      />
                    );
                })}
              <Form.Item {...examTailLayout}>
                <Button type="primary" htmlType="submit">
                  Enviar
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </Base>
  );
}
