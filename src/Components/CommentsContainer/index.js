import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Form, Button, message } from "antd";
import { useSession } from "../../Context/SessionContext";
import Comment from "../../Components/Comment/Comment";
import api from "../../services/api";
import "./styles.css";

export default function CommentsContainer({
  parent_id,
  parent_name,
  parent_path,
  title = "Comentários",
}) {
  const { session } = useSession();
  const history = useHistory();
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const config = {
    headers: {
      authorization: "Bearer " + session.accessToken,
    },
  };

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getData() {
    api
      .get("/question", {
        ...config,
        params: {
          parent_id,
        },
      })
      .then((res) => setQuestions(res.data))
      .catch((err) => message.error("Não foi possível obter os comentários"));
  }

  function handleSubmit(e) {
    e.preventDefault();
    return api
      .post(
        "/question",
        {
          user_id: session.user.id,
          user_name: session.user.name,
          parent_id,
          parent_name,
          question,
          parent_path,
        },
        config
      )
      .then(() => getData());
  }

  return (
    <div className="comments__container">
      <h3>{title}</h3>
      <Form.Item label="Comentar">
        <div className="search-area">
          <Input
            style={{ width: "90%" }}
            placeholder="digite aqui seu comentário"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button
            style={{ width: "calc(10%-10px)" }}
            onClick={handleSubmit}
            type="primary"
          >
            Comentar
          </Button>
        </div>
      </Form.Item>
      {questions.map((q) => {
        return (
          <Comment
            onClick={() => {
              history.push(`/comentario/${q.id}`);
              window.location.reload();
            }}
            author={q.user_name}
            date={new Date(q.created_at).toLocaleDateString("pt-BR")}
            text={q.question}
            linkSrc={q.parent_path}
            linkText={parent_name}
          />
        );
      })}
    </div>
  );
}
