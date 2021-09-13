import React, { useEffect } from "react";
import { message } from "antd";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";
import "./validacaoCertificado.css";



export default function ValidacaoCertificado(){
    const { session } = useSession();

    useEffect(() => {
        const config = {
            headers: {
              authorization: "BEARER " + session.accessToken,
            },
          };
        const data = {
            course_id: "010a8904-bbbe-439b-85bb-bfdfa8ee2a52",
            user_id: "ce652b1a-0f01-49fe-ac88-fc55776d9982",
        }
        api.get('/course-certificate/853a3226-9d25-4102-b8bc-93e62366ae3d', config).then((res)=>{
            message.success("cadastrei um novo certificado");
            console.log(res);
        }).catch((error)=>{
            console.log(error);
        })
    }, [])

    return(
        <div>Renan</div>
    )
}