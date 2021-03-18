import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";
import './FormEmail.css';


export default function FormEmail() {
    const [formValues, setFormValues] = useState({ email: "", subject: "", text:"" });
    const { session } = useSession();

    /*const configEmail = {
        headers: {
            reply
        },
    };  
    
      useEffect(() => {
        api
          .get(`/sendemail`, configEmail)
          .then((response) => {
            setLesson(response.data);
          })
          .catch(() => {
            message.error("Não foi possível carregar dados da aula");
          });
      }, []);*/
    
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
        <div className="formDuvidas">
            <h2 className='TitleFormEmail'>Envie uma dúvida para o email de seu professor:</h2>
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
                    <div style={{textAlign: "right"}}>
                        <button className="btnEnviar" onClick={handleSubmit}>
                            Enviar
                        </button>
                    </div>
            </div>
        </div>
    )
}
