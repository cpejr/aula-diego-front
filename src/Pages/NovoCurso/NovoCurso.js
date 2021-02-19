import React, { useState, useEffect } from "react";
import "./NovoCurso.css";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";
import { Input, Form } from 'antd';

const { TextArea } = Input;

export default function NovoCurso() {
    const [formValues, setFormValues] = useState({ name: "", description: "" });
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

    return (
        <Base>
        <div className="Curso">
            <div className="formContainer">
                <Form className="formCurso" onFinish={handleSubmit}>
                <h1 className='TitleNovoCurso' >Cadastrar novo Curso</h1>
                    <Form.Item name="nome" label="Nome">
                        <Input onChange={handleChange} placeholder="Nome do Curso" size="large" />
                    </Form.Item>
                    <Form.Item name="descricao" label="Descrição:">
                        <TextArea
                            onChange={handleChange}
                            size="large"
                            placeholder="Descrição sobre o conteúdo do curso"
                            autoSize={{ minRows: 2, maxRows: 6 }}/>
                    </Form.Item>
                    <Form.Item>
                        <button className="btnCurso" type="submit">
                            Cadastrar
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
        </Base>
    );
}