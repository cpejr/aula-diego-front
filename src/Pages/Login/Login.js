import React, { useState } from "react";
import { message } from "antd";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import "./Login.css";
import logo from "../../images/Logo2.png";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";

export default function Login() {
  const history = useHistory();
  const [state, setState] = useState({});
  const { handleLogin } = useSession();

  function responseGoogle(response) {
    if (response.error) return;
    const email = response.profileObj.email;
    const google = true;
    const tokenId = response.tokenId;
    api
      .post("/login", { email, google, tokenId })
      .then((response) => {
        console.log(response);
        handleLogin({
          accessToken: response.data.accessToken,
          user: response.data.user,
        });
      })
      .then(() => redirect("/dashboard"))
      .catch((error) => {
        if (error.response && error.response.data) {
          message.error(error.response.data.message);
          if (error.response.status === 403) return;
        }

        history.push({
          pathname: "/cadastro",
          state: {
            email: response.profileObj.email,
            name: response.profileObj.name,
          },
        });
      });
  }

  function validateForm() {
    const inputs = document.querySelectorAll("input");

    for (let i = 0; i < inputs.length; ++i) {
      if (!inputs[i].value || inputs[i].value == "") return false;
    }

    return true;
  }

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm())
      return message.error("Preencha todos os campos para fazer login");

    api
      .post("/login", { ...state })
      .then((response) => {
        handleLogin({
          accessToken: response.data.accessToken,
          user: response.data.user,
        });
        redirect("/dashboard");
      })
      .catch((error) => {
        if (error.response && error.response.data)
          message.error(error.response.data.message);
      });
  }

  function redirect(path) {
    history.push(path);
  }

  return (
    <div className="pageLogin">
      <div className="content">
        <img
          className="LoginImg"
          src={logo}
          onClick={() => {
            history.push("/");
          }}
        ></img>
        <div className="bloco">
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
          <div>
            <form>
              <h3 className="insiraLogin">Ou insira:</h3>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="exampleFormControlInput1"
                  placeholder="Email"
                  spellCheck="false"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="exampleInputPassword1"
                  placeholder="Senha"
                  spellCheck="false"
                  onChange={handleChange}
                />
                <button className="entrarButtonLogin" onClick={handleSubmit}>
                  Entrar
                </button>
              </div>
              <div className="esqueceuLoginDiv">
                <a
                  className="esqueceuLogin"
                  onClick={() => redirect("/esqueciasenha")}
                  target="blank"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <div className="resgateLogin">
                <h5 className="naotemLogin" style={{ color: "white" }}>
                  Não tem uma conta?
                </h5>
                <Link className="cadastreLogin" to="/cadastro">
                  Cadastre-se
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
