import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import { SnippetsOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import "./VisualizarAula.css";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";
import VideoFrame from '../../Components/VideoFrame/VideoFrame';

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
                    <SnippetsOutlined />
                    <h1 className="TitleAulas">Programação Orientada a Objetos</h1>
                    <div className="AulaVideoContainer">
                        <h1 className="TitleVideo">Aula 01 - Programação Orientada a Objetos</h1>
                        <div className="videoAula">
                            <VideoFrame url='https://www.youtube.com/embed/yhEqroz32Nk'/>
                        </div>
                        <div className="formDuvidas">
                    </div>
                    <Form className="formDuvidas" onFinish={handleSubmit}>
                            <h1 className='TitleAulas'>Envie uma dúvida para seu professor:</h1>
                            <Form.Item name="nome" label="Nome">
                                <Input onChange={handleChange} placeholder="Nome do Curso" size="large" />
                            </Form.Item>
                                
                            <Form.Item>
                                <button className="btnCurso" type="submit">
                                </button>
                            </Form.Item>
                        </Form>
                    </div>
                    
                </div>
            </div>
    </Base>
    );
}