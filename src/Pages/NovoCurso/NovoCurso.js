import React, { useState, useEffect } from "react";
import "./NovoCurso.css";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";
import { Input, Form, message, Select } from 'antd';

const { TextArea } = Input;

const layout = {
    labelCol: { span: 2 },
};

export default function NovoCurso() {
    const [formData, setformData] = useState([]);
    const { session } = useSession();

    function handleChange(e) {
      setformData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
    
    function handleSubmit() {
      setformData({
        ...formData,
        organization_id: session.user.organization_id,
      });

      console.log(formData);

      const config = {
        headers: {
          authorization: "BEARER " + session.accessToken
        }
      };
      
      api
        .post(`/course`, formData, config)
        .then(() => {
          message.success("Curso criado com sucesso!");
        })
        .catch(() => {
          message.error(`Não foi possível cadastrar o curso.`);
        });
    }

    return (
        <Base>
        <div className="Curso">
            <div className="formContainer">
                <Form {...layout} className="formCurso" onFinish={handleSubmit}>
                <h1 className='TitleNovoCurso' >Cadastrar novo Curso</h1>
                    <Form.Item name="nome" label="Nome">
                        <Input 
                          placeholder="Nome do Curso" 
                          size="large" 
                          name="name"
                          value={formData["name"]} 
                          onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item name="descricao" label="Descrição:">
                        <TextArea
                            onChange={handleChange}
                            size="large"
                            placeholder="Descrição sobre o conteúdo do curso"
                            name="description"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            value={formData["description"]}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <button className="btnCurso" type="submit" onClick={handleSubmit}>
                            Cadastrar
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
        </Base>
    );
}