import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import "./Login.css";
import logo from "../../images/Logo2.png"
import {useHistory} from 'react-router-dom'

const responseGoogle = (response) => {
  console.log(response);
};

const Login = () => {


  let history = useHistory();


  function redirect(path){
    history.push(path)
  }

  return (
    <div className="pageLogin">
      <div className="content">
        <img className='LoginImg'src={logo}></img>
        <div className="bloco">
          <forms>
            <h1 className="entrarLogin">Entrar</h1>
            <GoogleLogin
              clientId="225647618283-l615d2dlgp53jar7rop80h75dc22daa3.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  className="googleButton"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle size="1.75em" />
                  <p className="googleText">Entrar com o Google</p>
                </button>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <h3 className="insiraLogin">Ou insira:</h3>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Email"
                spellCheck="false"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Senha"
                spellCheck="false"
              />
              <button className="entrarButtonLogin" onClick={()=>redirect('/dashboard')}>Entrar</button>
            </div>
            <div className="esqueceuLoginDiv"><a className="esqueceuLogin">Esqueceu a senha?</a></div>
            <div className="resgateLogin">
              <h5 className="naotemLogin">Não tem conta?</h5>
              <a
                className="cadastreLogin"
                onClick={()=>redirect('/cadastro')}
                target="blank"
              >
                Cadastre-se
              </a>
            </div>
          </forms>
        </div>
      </div>
    </div>
  );
};

export default Login;
