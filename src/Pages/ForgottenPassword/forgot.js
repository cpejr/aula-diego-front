import React, { useState } from 'react';
import "./forgot.css";
import api from '../../services/api';
import logo from "../../images/Logo2.png";
import { Link, useHistory } from "react-router-dom";

function ForgottenPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const history = useHistory();
  
    async function handleSubmit(e) {
      e.preventDefault();
      api
      .post("forgottenPassword", { email })
        .then( ()=> {
            setError('')
            setSuccess('E-mail enviado')
            alert("Email enviado!")
            history.push("/")
        })
        
      .catch ((err) => {
          alert("Usuário não encontrado, tente novamente")
        setError("Usuário não encontrado")
        console.error(err.response.data.notification);
      })
    }
    return (
        <div className = "pageEsqueci">
            <div className = "esquecicontent">
                <img className="esqueciImg" src={logo}></img>
                <div className = "blocoesqueci">
                    <form >
                        <h1 className="esquecititulo">Esqueceu sua senha?</h1>
                        <div className = "forminput">
                              <input 
                               type = "text"
                               value = {email}
                               className = "entrada"
                               placeholder = "Insira seu email para redefinir a senha"
                               onChange = { e => setEmail(e.target.value)}
                              />      
                        </div>
                        <button className="esquecibutton" 
                        onClick={handleSubmit}
                        >
                            Redefinir
                        </button>
                        <div className = "voltarlogin">
                            <h5 className = "textologin" >Clicou aqui por engano?</h5>
                            <Link className="voltarlink" to="/">
                                Ir para login
                            </Link>
                        </div>    
                    </form>       
                </div>
            </div>       
        </div>
    );
}
export default  ForgottenPassword;