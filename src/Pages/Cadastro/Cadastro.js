import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import "./Cadastro.css";
import logo from "../../images/Logo2.png";

const responseGoogle = (response) => {
  console.log(response);
};

const Cadastro = () => {
  return (
    <div className="pageCadastro">
      <div className="CadastroContent">
        <img className="CadastroImg" src={logo}></img>
        <div className="blocoCadastro">
          <forms>
            <h1 className="entrarCadastro">Cadastre-se</h1>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                placeholder="Nome"
                spellCheck="false"
              />
            </div>
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
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Confirme sua Senha"
                spellCheck="false"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputTrabalho"
                placeholder="Empresa"
                spellCheck="false"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputAddress"
                placeholder="Endereço"
                spellCheck="false"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                id="exampleInputNumber"
                placeholder="Número"
                spellCheck="false"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputCEP"
                placeholder="CEP"
                spellCheck="false"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputCity"
                placeholder="Estado"
                spellCheck="false"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputSexo"
                placeholder="Sexo"
                spellCheck="false"
              />
            </div>
            <button className="entrarButtonCadastro">Cadastrar</button>
          </forms>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
