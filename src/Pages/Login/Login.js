import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import "./Login.css";
import logo from "../../images/Logo2.png"

const responseGoogle = (response) => {
  console.log(response);
};

const Login = () => {
  return (
    <div className="pageLogin">
      <div className="content">
        <img src={logo}></img>
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
              <button className="entrarButtonLogin">Entrar</button>
            </div>

            <a className="esqueceuLogin">Esqueceu a senha?</a>
            <div className="resgateLogin">
              <h5 className="naotemLogin">Não tem conta?</h5>
              <a
                className="cadastreLogin"
                href="https://www.google.com.br"
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
