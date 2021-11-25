import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Button, Progress, message } from "antd";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./AtividadeResultado.css";

export default function AtividadeResultado(props) {
  const [answer, setAnswer] = useState(false);
  const [color, setColor] = useState("white");
  const [status, setStatus] = useState("normal");

  const { session } = useSession();
  const history = useHistory();

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
        const colors = ["red", "coral", "yellow", "lightgreen", "lawngreen"];

        if (response.data.grade === 100) setStatus("success");

        if (response.data.grade === 0) {
          response.data.grade = 100;
          setStatus("exception");
        }

        setColor(colors[Math.floor(response.data.grade / 20)]);
        setAnswer(response.data);
      })
      .catch((err) => {
        message.error("Não foi possível carregar dados da prova!");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Base>
      <div className="resultRoot">
        <p className="resultTitle">{answer && answer.exercise_name}</p>
        <div className="resultProgressWrapper">
          <p className="resultProgressTitle">Resultado</p>
          <Progress
            percent={answer.grade}
            type="circle"
            strokeColor={color}
            status={status}
          />
          <div className="resultButtonWrapper">
            <Button
              type="default"
              className="resultButton"
              onClick={() =>
                history.push(`/atividade/responder/${answer.exercise_id}`)
              }
            >
              Tentar novamente
            </Button>
            <Button
              type="default"
              className="resultButton"
              onClick={() => history.push(`/curso/${answer.course_id}`)}
            >
              Retornar ao curso
            </Button>
          </div>
        </div>
      </div>
    </Base>
  );
}
