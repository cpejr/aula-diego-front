import React, { useEffect, useState } from "react";
import { Button, Input, Form, Typography, message, Layout } from "antd";
import { useSession } from "../../Context/SessionContext";
import { useLocation } from "react-router";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import "./validacaoCertificado.css";
import "antd/dist/antd.css";



export default function ValidacaoCertificado(){
    const { session } = useSession();
    const location = useLocation();
    const { search } = location;
    const params = new URLSearchParams(search);
    const certificate_id = params.get("certificate");
    const [certificate, setCertificate] = useState(certificate_id);
    const [hidden, setHidden] = useState(false);
    const [okHidden, setOkHidden] = useState(true);
    const [failHidden, setFailHidden]  = useState(true);
    const [course, setCourse] = useState("Uso do drone");
    const [user, setUser] = useState("Lampinho");
    const config = {
        headers: {
            authorization: "BEARER " + session.accessToken,
        },
    };

    // useEffect(() => {
    //     const data = {
    //         course_id: "010a8904-bbbe-439b-85bb-bfdfa8ee2a52",
    //         user_id: "ce652b1a-0f01-49fe-ac88-fc55776d9982",
    //     }
    //     api.get('/course-certificate/853a3226-9d25-4102-b8bc-93e62366ae3d', config).then((res)=>{
    //         message.success("cadastrei um novo certificado");
    //         console.log(res);
    //     }).catch((error)=>{
    //         console.log(error);
    //     })
    // }, [])

    const { Title } = Typography;

    function handleChange(e){
        const value = e.target.value;
        setCertificate(value);
    }

    function handleSubmit(){
        api.get(`/course-certificate/${certificate_id}`, config).then((res)=>{
            console.log(res.data);
            api.get(`user/${res.data.user_id}`).then((res)=>{
                setUser(res.data.name);
            }).catch((error)=>{
                message.warn(error.message);
            });
            api.get(`course/${res.data.course_id}`).then((res)=>{
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
            console.log(res);
        }).catch((error)=>{
            message.warn(error.message);
        });
        var i=true;
            if(i){
                setOkHidden(false);
                setHidden(!hidden);
            }
            else{
                setFailHidden(false);
                setHidden(!hidden);
            }
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
                <Form.Item hidden={failHidden}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Title level={2}>O certificado de {user} do curso {course} foi verificado com sucesso!</Title>
                    <div style ={{width: "auto"}}>
                        <Button onClick={handleBack}>Voltar</Button>
                    </div>                  
                </div>
                </Form.Item>
                <Form.Item hidden={okHidden}>
                    <Title level={2}>O certificado {certificate} não existe para ser verificado!</Title>
                    <Button onClick={handleBack}>Voltar</Button>
                </Form.Item>
            </Form>
            </Layout>
        </Base>
    )
}