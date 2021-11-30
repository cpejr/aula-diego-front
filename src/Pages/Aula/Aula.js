import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import { SnippetsOutlined, DownloadOutlined } from "@ant-design/icons";
import { message, Divider, Button } from "antd";
import VideoFrame from "../../Components/VideoFrame/VideoFrame";
import { useSession } from "../../Context/SessionContext";
import api from "../../services/api";
import "./Aula.css";
import CommentsContainer from "../../Components/CommentsContainer";

export default function Aula(props) {
  const [lesson, setLesson] = useState();

  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);

  const { id } = props.match.params;
  const { session } = useSession();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  const configLesson = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    params: {
      lesson_id: id,
    },
  };

  useEffect(() => {
    api
      .get(`/lesson/${id}`, config)
      .then((response) => {
        setLesson(response.data);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados da aula");
      });

    api
      .get("/lesson_video", configLesson)
      .then((response) => {
        setVideos(response.data);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados da aula");
      });

    api
      .get("/lesson_file", configLesson)
      .then((response) => {
        setFiles(response.data);
        console.log(response.data);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados da aula");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Base>
      <div className="class-body">
        <div className="title">
          <SnippetsOutlined />
          <span>{lesson && lesson.name}</span>
        </div>
        <div className="description">{lesson && lesson.description}</div>
        <Divider />
        <div className="text">{lesson && lesson.text}</div>
        {videos.map((video) => {
          return (
            <>
              <Divider />
              <div className="videoWrapper">
                <VideoFrame url={video.video_url} />
              </div>
            </>
          );
        })}
        {files && (
          <div style={{ margin: "3%" }}>
            <Divider />
            <span className="downloadLabel">Arquivos:</span>
          </div>
        )}
        {files.map((file) => {
          return (
            <a href={file.path}>
              <Button
                size="large"
                type="dashed"
                style={{ "margin-bottom": "1%" }}
                block
              >
                <DownloadOutlined />
                {file.name}
              </Button>
            </a>
          );
        })}
        <Divider style={{ "margin-bottom": "3%" }} />

        <CommentsContainer
          parent_id={id}
          parent_name={lesson?.name}
          parent_path={`/aula/${id}`}
        />
      </div>
    </Base>
  );
}
