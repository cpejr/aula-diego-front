import React, { useState } from "react";
import { Button, Input, Form, Typography, message, Layout } from "antd";
import { useSession } from "../../Context/SessionContext";
import { useLocation } from "react-router";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import "./validacaoCertificado.css";
import "antd/dist/antd.css";

export default function ValidacaoCertificado(){
    const location = useLocation();
    const { session } = useSession();
    const { search } = location;
    const { Title } = Typography;
    const params = new URLSearchParams(search);
    const certificate_id = params.get("certificate");

    const [certificate, setCertificate] = useState(certificate_id);
    const [hidden, setHidden] = useState(false);
    const [okHidden, setOkHidden] = useState(true);
    const [failHidden, setFailHidden]  = useState(true);
    const [course, setCourse] = useState();
    const [user, setUser] = useState();

    const config = {
        headers: {
            authorization: "BEARER " + session.accessToken,
        },
    };

    function handleChange(e){
        const value = e.target.value;
        setCertificate(value);
    }

    function handleSubmit(){
        api
        .get(`/course-cerificate/${certificate}`, config)
        .then((res)=>{
            api.get(`user/${res.data.user_id}`, config).then((res)=>{
                setUser(res.data.name);
            }).catch((error)=>{
                message.warn(error.message);
            });
            api.get(`course/${res.data.course_id}`, config).then((res)=>{
                setCourse(res.data.name);
            }).catch((error)=>{
                message.warn(error.message);
            });
            if(res.data){
                setOkHidden(false);
                setHidden(!hidden);
            }
            else{
                setFailHidden(false);
                setHidden(!hidden);
            }
        }).catch((error)=>{
            message.error(error.message); // Exibindo essa mensagem duas vezes
        });
    }

    function handleBack(){
        if(!failHidden){
            setFailHidden(!failHidden);
        }
        else{
            setOkHidden(!okHidden);
        }
        setHidden(!hidden);
    }

    return(
        <Base>
            <Layout style={{ margin: '50px 50px', padding: "50px"}}>
            <Title>Verificação de Certificado</Title>
            <Form style={{display:"flex", flexDirection:"column"}}>
                <Form.Item
                    hidden={hidden}
                    label="Código"
                >   
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Input defaultValue={certificate_id} onChange={handleChange} style={{width: "100%"}}/>
                    <div style ={{width: "auto"}}>
                    <Button onClick={handleSubmit} style={{marginTop: "20px"}}>Verificar certificado</Button>
                    </div>                
                </div>
                </Form.Item>
                <Form.Item hidden={okHidden}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Title level={2}>O certificado de {user} do curso {course} foi verificado com sucesso!</Title>
                    <div style ={{width: "auto"}}>
                        <Button onClick={handleBack}>Voltar</Button>
                    </div>                  
                </div>
                </Form.Item>
                <Form.Item hidden={failHidden}>
                    <Title level={2}>O certificado {certificate} não existe para ser verificado!</Title>
                    <Button onClick={handleBack}>Voltar</Button>
                </Form.Item>
            </Form>
            </Layout>
        </Base>
    )
}