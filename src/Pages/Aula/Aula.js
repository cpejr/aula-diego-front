import React from "react";
import Base from "../../Components/Base/Base";
import { SnippetsOutlined, InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import "./Aula.css";
import VideoFrame from '../../Components/VideoFrame/VideoFrame';
import FormEmail from '../../Components/FormEmail/FormEmail';

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

export default function Aula() {
    return (
        <Base>
            <div className="Aula">
                <div className="description">
                    <h1 className="TitleAulas"><SnippetsOutlined />Programação Orientada a Objetos</h1>

                    <div className="AulaVideoContainer">
                        <h1 className="TitleVideo">Aula 02 - Padronização de Commits</h1>
                        <div className="videoAula">
                            <iframe src="https://drive.google.com/file/d/1404oVm2AKuvFUvx3epIHSJeJ3Si02__J/preview" frameborder="0" width="100%" height="480"/>
                        </div>  
                    </div>
                    <FormEmail />

                    <div className="AulaVideoContainer">
                        <h1 className="TitleVideo">Aula 03 - Metodologia Scrum</h1>
                        <div className="videoAula">
                            <iframe src="https://drive.google.com/file/d/1-RSEdnvbs0C5E2fSKJ-tlUZhPgLzfmJW/preview" frameborder="0" width="100%" height="480"/>
                        </div>  
                    </div>
                    <FormEmail />
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
}

function EnviarTarefa() {
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
}