import React from "react";
import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import "./Login.css";

const responseGoogle = (response) => {
  console.log(response);
};

const Login = () => {
  return (
    <div className="pageLogin">
      <div className="content">
        <header>Placeholder</header>
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
                  <FcGoogle value={{ size: "5em" }} />
                  <p className="googleText">Inicie sessão com o google</p>
                </button>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <h3 className="insiraLogin">Ou insira:</h3>
            <div className="form-group">
              <label for="exampleFormControlInput1" className="emaiLogin">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1" className="senhaLogin">
                Senha
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
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
