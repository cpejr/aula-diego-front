import React, { useState, useEffect } from "react";
import "./NovoCurso.css";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import { useSession } from "../../Context/SessionContext";
import { Input, Form, message, Select } from 'antd';

const { TextArea } = Input;

const layout = {
    labelCol: { span: 2 },
};

export default function NovoCurso() {
    const [formData, setformData] = useState([]);
    const [course, setCourse] = useState({});
    const [organizations, setOrganizations] = useState({});
    const { session } = useSession();

    const config = {
        headers: {
          authorization: "BEARER " + session.accessToken
        }
      };

    function handleChange(e) {
        setformData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSelectChange(value, field) {
        if (field === "organization_id");
        console.log(`${field}: ${value}`);
        setformData({ ...formData, [field]: value });
    }
    
    function handleSubmit() {
        api
          .post(`/course`, config)
          .then((response) => {
            setCourse(response.data);
            message.success("Curso criado com sucesso!");
          })
          .catch(() => {
            message.error("Não foi possível criar o curso");
          });
      }
    
    function loadOrgs() {
      api
        .get("/organization", config)
        .then((data) => {
          setOrganizations(data.data);
        })
        .catch(() => message.error("Não foi possível carregar organizações"));
    }
    
    /*useEffect(() => {
      api
      .get(`/organization`, config)
      .then((response) => {
        console.log(response.json())
        setOrganizations(response.data);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das organizações");
      });
        api
          .get(`/organization`, config)
          .then((response) => {
            setOrganizations(response.data);
          })
          .catch(() => {
            message.error("Não foi possível carregar dados das organizações");
          });
      }, 
      []);*/
    return (
        <Base>
        {loadOrgs()}
        <div className="Curso">
            <div className="formContainer">
                <Form {...layout} className="formCurso" onFinish={handleSubmit}>
                <h1 className='TitleNovoCurso' >Cadastrar novo Curso</h1>
                    <Form.Item name="nome" label="Nome">
                        <Input onChange={handleChange} placeholder="Nome do Curso" size="large" value={formData["name"]} />
                    </Form.Item>
                    <Form.Item>
                    <Select
                        name="organization_id"
                        onChange={() => handleSelectChange("organization_id")}
                        placeholder="Organização"
                    >
                      {organizations.map((organization) => {
                        return (
                          <Select.Option name="organization_id" value={organization.id}>
                            {organization.name}
                          </Select.Option>
                        ) 
                      })}
                    </Select>
                    </Form.Item>
                    <Form.Item name="descricao" label="Descrição:">
                        <TextArea
                            onChange={handleChange}
                            size="large"
                            placeholder="Descrição sobre o conteúdo do curso"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            value={formData["description"]}/>
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