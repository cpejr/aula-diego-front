import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import "./Cadastro.css";
import logo from "../../images/Logo2.png";
import { Link } from "react-router-dom";

const Cadastro = (props) => {
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    if (props.location.state) setInputValues(props.location.state);
  }, []);

  function handleChange(e) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  }

  return (
    <div className="pageCadastro">
      <div className="CadastroContent">
        <img className="CadastroImg" src={logo}></img>
        <div className="blocoCadastro">
          <form>
            <h1 className="entrarCadastro">Cadastre-se</h1>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                name="name"
                value={inputValues["name"]}
                placeholder="Nome"
                spellCheck="false"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                name="email"
                value={inputValues["email"]}
                placeholder="Email"
                spellCheck="false"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={inputValues["password"]}
                placeholder="Senha"
                spellCheck="false"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="passwordConfirmation"
                value={inputValues["passwordConfirmation"]}
                placeholder="Confirme sua Senha"
                spellCheck="false"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputTrabalho"
                name="company"
                value={inputValues["company"]}
                placeholder="Empresa"
                spellCheck="false"
                required
              />
            </div>
            <div className="form-group">
              <InputMask
                type="date"
                className="form-control"
                id="exampleInputAddress"
                name="birthdate"
                value={inputValues["birthdate"]}
                placeholder="Data de Nascimento"
                mask="99/99/9999"
                spellCheck="false"
                value={props.value}
                onChange={props.onChange}
                required
                pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                required
              />
            </div>
            <div className="form-group">
              <select className="form-control" required>
                <option value="UF">Selecione um Estado</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </div>
            <div className="form-group">
              <InputMask
                mask="(99) 99999-9999"
                className="form-control"
                id="exampleInputTelefone"
                name="phone"
                value={inputValues["phone"]}
                placeholder="Telefone"
                spellCheck="false"
                required
              />
            </div>

            <button className="entrarButtonCadastro">Cadastrar</button>
            <div className="irLogin">
              <h5 className="jatemLogin">Já possui Login?</h5>
              <Link className="logincadastro" to="/">
                Entrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
