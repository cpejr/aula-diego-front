import React, { useEffect, useState } from "react";
import { useSession } from "../../Context/SessionContext";
import Base from "../../Components/Base/Base";
import Comment from "../../Components/Comment/Comment";
import CommentsContainer from "../../Components/CommentsContainer";
import api from "../../services/api";
import { message } from "antd";

export default function Comentario(props) {
  const { id } = props.match.params;
  const [comment, setComment] = useState({});
  const { session } = useSession();

  const config = {
    headers: {
      authorization: "Bearer " + session.accessToken,
    },
    params: {
      id: id,
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
          id,
        },
      })
      .then((res) => {
        setComment(res.data[0]);
      })

      .catch((err) => message.error("Não foi possível obter comentário"));
  }

  return (
    <Base>
      {comment ? (
        <>
          <Comment
            author={comment?.user_name}
            date={new Date(comment?.created_at).toLocaleDateString("pt-BR")}
            text={comment?.question}
            linkText={comment?.parent_name}
            linkSrc={comment.parent_path}
            displayLink
          />

          <CommentsContainer
            links_preffix="comentario/"
            title={"Respostas"}
            parent_id={id}
            parent_name={"Comentario - " + comment.user_name}
            parent_path={`/comentario/${id}`}
          />
        </>
      ) : null}
    </Base>
  );
}
