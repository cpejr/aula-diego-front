import React, { useState, useEffect } from "react";
import "./NovoCurso.css";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import { useSession } from "../../Context/SessionContext";
import { Input, Form, message } from 'antd';

const { TextArea } = Input;

const layout = {
    labelCol: { span: 2 },
};

export default function NovoCurso() {
    const [inputValues, setInputValues] = useState({});
    const history = useHistory();
    const { session } = useSession();

    function handleChange(e) {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    }
    
    function handleSubmit(e) {
        e.preventDefault();
    
        let data = inputValues;

        api
        .post("/course", data)
        .then(() => {
            history.push("/");
        })
        .catch((error) =>
            message.error("Não foi possível concluir o cadastro, tente novamente.")
        );
    }

    return (
        <Base>
        <div className="Curso">
            <div className="formContainer">
                <Form {...layout} className="formCurso" onFinish={handleSubmit}>
                <h1 className='TitleNovoCurso' >Cadastrar novo Curso</h1>
                    <Form.Item name="nome" label="Nome">
                        <Input onChange={handleChange} placeholder="Nome do Curso" size="large" value={inputValues["name"]} />
                    </Form.Item>
                    <Form.Item name="descricao" label="Descrição:">
                        <TextArea
                            onChange={handleChange}
                            size="large"
                            placeholder="Descrição sobre o conteúdo do curso"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            value={inputValues["description"]}/>
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