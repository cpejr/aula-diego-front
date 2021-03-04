import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import { SnippetsOutlined, InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import "./Aula.css";
import VideoFrame from '../../Components/VideoFrame/VideoFrame';
import FormEmail from '../../Components/FormEmail/FormEmail';
import { useSession } from "../../Context/SessionContext";
import api from "../../services/api";

const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'endereço pra onde envia',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

export default function Aula(props) {
    const { session } = useSession();
    const [lesson, setLesson] = useState();
    const [file, setFiles] = useState();
    const [course, setCourse] = useState();
    const { id } = props.match.params;

    const configLesson = {
        headers: {
            authorization: "BEARER " + session.accessToken,
        },
    };

    const config = {
        headers: {
          authorization: "BEARER " + session.accessToken,
        },
        params: {
            'course.id': lesson && lesson.course_id,
          },
    };  
    
      useEffect(() => {
        api
          .get(`/lesson/${id}`, configLesson)
          .then((response) => {
            setLesson(response.data);
          })
          .catch(() => {
            message.error("Não foi possível carregar dados da aula");
          });
    
        /*api
          .get(`/file`, config)
          .then((response) => {
            setFiles(response.data);
          })
          .catch(() => {
            message.error("Não foi possível carregar dados dos arqivos");
          });*/

          api
          .get(`/course`, config)
          .then(
            (response) => {
            setCourse(response.data);
          })
          .catch(() => {
            message.error("Não foi possível carregar dados do curso");
          });
      }, []);
    return (
        <Base>
            <div className="Aula">
                <div className="description">
                {course
                        ? course.map((course) => {
                            
                            return (
                        <h1 className="TitleAulas"><SnippetsOutlined />{course.name}</h1>
                            );
                        })
                        : null}
                    <VideoAula 
                        title={lesson && lesson.name}
                        video_url="https://www.youtube.com/embed/sj9J2ecsSpo"
                        description={lesson && lesson.description}
                    />     
            </div>
        </div>
    </Base>
    );
}

function VideoAula({ title, video_url, description }) {
    return (
        <>
            <div className="AulaVideoContainer">
                <h1 className="TitleVideo">{title}</h1>
                <div className="videoAula">
                    <VideoFrame url={video_url}/>
                    <h6 className="descriptionText">{description}</h6>
                </div>  
            </div>
            <FormEmail />
        </>
    );
}

function Arquivo({ title, arquivo_url, description }){
    return(
        <>
            <div className="AulaVideoContainer">
                <h1 className="TitleVideo">{title}</h1>
                <div className="videoAula">
                    <iframe src={arquivo_url} frameborder="0" width="100%" height="480"/>
                    <h6 className="descriptionText">{description}</h6>
                </div>  
            </div>
            <FormEmail />
        </>
    );
}

function EnviarTarefa() {
    return(
        <>
            <div className="AulaVideoContainer">
                <h1 className="TitleVideo">Envio de tarefa:</h1>
                <div className="videoAula">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text"> Clique ou arraste os arquivos para essa área para enviar</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Dragger>
                </div>
                <button className="btnEnviarTarefa">
                    Enviar
                </button>
            </div>
            <div className="formDuvidas">
                <h6 className='TitleVideo'>*Serão aceitos arquivos em pdf, jpg e png apenas</h6>
            </div>
        </>
    );
}