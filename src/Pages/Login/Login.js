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
            <h1>Entrar</h1>
            <GoogleLogin
              clientId="225647618283-l615d2dlgp53jar7rop80h75dc22daa3.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                    <FcGoogle value={{ size: "5em" }} />
                </button>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <h3>Ou insira:</h3>
            <div className="form-group">
              <label for="exampleFormControlInput1">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Senha</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
              <a>Esqueceu a senha?</a>
              <h5>Não tem conta?</h5>
              <a href="https://www.google.com.br" target="blank">
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
