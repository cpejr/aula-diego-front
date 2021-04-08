import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import {
  SnippetsOutlined,
  InboxOutlined,
  DownloadOutlined,
  IdcardFilled,
} from "@ant-design/icons";
import { Upload, message, Divider, Button } from "antd";
import VideoFrame from "../../Components/VideoFrame/VideoFrame";
import FormEmail from "../../Components/FormEmail/FormEmail";
import { useSession } from "../../Context/SessionContext";
import api from "../../services/api";
import fileDownload from "js-file-download";
import "./Aula.css";
import CommentsContainer from "../../Components/CommentsContainer";

const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "endereço pra onde envia",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function Aula(props) {
  const [course, setCourse] = useState();
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

  const configFile = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    responseType: "blob",
  };

  useEffect(() => {
    api
      .get(`/lesson/${id}`, config)
      .then((response) => {
        setLesson(response.data);
        api
          .get(`/course/${response.data.course_id}`, config)
          .then((response) => {
            setCourse(response.data);
          })
          .catch(() => {
            message.error("Não foi possível carregar dados do curso");
          });
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
      })
      .catch(() => {
        message.error("Não foi possível carregar dados da aula");
      });
  }, []);

  const downloadFile = (id, name, extension) => {
    api
      .get(`/file_get/${id}`, configFile)
      .then((response) => {
        fileDownload(response.data, `${name}.${extension}`);
      })
      .catch((err) => {
        message.error("Não foi possível carregar dados dos arquivos");
      });
  };

  return (
    <Base>
      <div className="pageBody">
        <div className="title">
          <SnippetsOutlined />
          <span>{lesson && lesson.name}</span>
        </div>
        <div className="description">{lesson && lesson.description}</div>
        <Divider />
        <div className="text">{lesson && lesson.content}</div>
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
            <span className="downloadLabel">Download:</span>
          </div>
        )}
        {files.map((file) => {
          return (
            <Button
              size="large"
              type="dashed"
              style={{ "margin-bottom": "1%" }}
              onClick={() => downloadFile(file.id, file.name, file.type)}
              block
            >
              <DownloadOutlined />
              {file.name}
            </Button>
          );
        })}
        <Divider style={{ "margin-bottom": "3%" }} />
        <FormEmail />
      </div>
      <CommentsContainer
        parent_id={id}
        parent_name={lesson?.name}
        parent_path={`/aula/${id}`}
      />
      <div class="spacing"></div> {/* criada para dar um respiro à pagina */}
    </Base>
  );
}
/* 
function VideoAula({ title, video_url, description }) {
  return (
    <>
      <div className="AulaVideoContainer">
        <h1 className="TitleVideo">{title}</h1>
        <div className="videoAula">
          <VideoFrame url={video_url} />
          <h6 className="descriptionText">{description}</h6>
        </div>
      </div>
      <FormEmail />
    </>
  );
} */

function Arquivo({ title, arquivo_url, description }) {
  return (
    <>
      <div className="AulaVideoContainer">
        <h1 className="TitleVideo">{title}</h1>
        <div className="videoAula">
          <iframe src={arquivo_url} frameborder="0" width="100%" height="480" />
          <h6 className="descriptionText">{description}</h6>
        </div>
      </div>
      <FormEmail />
    </>
  );
}

function EnviarTarefa() {
  return (
    <>
      <div className="AulaVideoContainer">
        <h1 className="TitleVideo">Envio de tarefa:</h1>
        <div className="videoAula">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {" "}
              Clique ou arraste os arquivos para essa área para enviar
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
        </div>
        <button className="btnEnviarTarefa">Enviar</button>
      </div>
      <div className="formDuvidas">
        <h6 className="TitleVideo">
          *Serão aceitos arquivos em pdf, jpg e png apenas
        </h6>
      </div>
    </>
  );
}
