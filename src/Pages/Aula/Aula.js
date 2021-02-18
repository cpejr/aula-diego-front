import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import { SnippetsOutlined, InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import "./Aula.css";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";
import VideoFrame from '../../Components/VideoFrame/VideoFrame';

const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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

export default function NovoCurso() {
    const [formValues, setFormValues] = useState({ email: "", subject: "", text:"" });
    const { session } = useSession();
    
    function validateForm() {
        const inputs = document.querySelectorAll("input");
    
        for (let i = 0; i < inputs.length; ++i) {
          if (!inputs[i].value || inputs[i].value == "") return false;
        }

        return true;
    }

    function handleChange(e) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
    
    function handleSubmit() {
        if (!validateForm())
            return alert("Preencha todos os campos para se cadastrar");
        const config = {
          headers: {
            authorization: "BEARER " + session.accessToken,
          },
        };
        api
          .post("/course", formValues, config) //esperar ver o controller do db novo
          .then(() => alert("Curso cadastrado com sucesso!"))
          .catch((error) =>
            alert(`Não foi possível cadastrar o Curso. \n Erro: ${error}`)
          );
    }

    function handleChange(e) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
    return (
        <Base>
            <div className="Aula">
                <div className="description">
                    <h1 className="TitleAulas"><SnippetsOutlined />Programação Orientada a Objetos</h1>
                    <div className="AulaVideoContainer">
                        <h1 className="TitleVideo">Aula 01 - Programação Orientada a Objetos</h1>
                        <div className="videoAula">
                            <VideoFrame url='https://www.youtube.com/embed/yhEqroz32Nk'/>
                        </div>  
                    </div>
                    <div className="formDuvidas">
                        <h2 className='TitleVideo'>Envie uma dúvida para o email de seu professor:</h2>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputName"
                                name="name"
                                
                                onChange={handleChange}
                                placeholder="Nome"
                                spellCheck="false"
                                required
                            />
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputName"
                                name="email"
                                
                                onChange={handleChange}
                                placeholder="Email"
                                spellCheck="false"
                                required
                            />
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputName"
                                name="subject"
                                
                                onChange={handleChange}
                                placeholder="Asssunto"
                                spellCheck="false"
                                required
                            />
                            <textarea
                                type="text"
                                className="form-control"
                                id="exampleInputName"
                                name="text"
                                style={{height:"25vh"}}
                                onChange={handleChange}
                                placeholder="Texto"
                                spellCheck="false"
                                required
                            />
                            <button className="btnEnviar" onClick={handleSubmit}>
                                Enviar
                            </button>
                        </div>
                    </div>
                    <div className="AulaVideoContainer">
                        <h1 className="TitleVideo">Envio de tarefa:</h1>
                        <div className="videoAula">
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                band files
                            </p>
                        </Dragger>
                        </div>
                        <button className="btnEnviar" onClick={handleSubmit}>
                            Enviar
                        </button>
                    </div>
                    <div className="formDuvidas">
                        <h6 className='TitleVideo'>*Serão aceitos arquivos em pdf, jpg e png apenas</h6>
                    </div>
            </div>
        </div>
    </Base>
    );
}