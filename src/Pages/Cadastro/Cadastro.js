import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import "./Cadastro.css";
import logo from "../../images/Logo2.png";
import { Link, useHistory } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import api from "../../services/api";

export default function Cadastro(props) {
  const [inputValues, setInputValues] = useState({});
  const [startDate, setStartDate] = useState(null);

  const history = useHistory();
  useEffect(() => {
    if (props.location.state)
      setInputValues(props.location.state);

  }, []);

  function handleChange(e) {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  }
  function validateForm() {
    const inputs = document.querySelectorAll("input");

    for (let i = 0; i < inputs.length; ++i) {
      if (!inputs[i].value || inputs[i].value == "")
        return false;
    }

    if (inputValues["password"] !== inputValues["passwordConfirmation"]) {
      alert("As senhas digitadas não correspondem.")
      return "pass";
    }

    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm() === "pass") return;
    if (!validateForm())
      return alert('Preencha todos os campos para se cadastrar');

    let data = inputValues;
    data.phone = data.phone.replace(/[^\w]/gi, '');
    delete data.passwordConfirmation;

    api.post('/newuser', data).then(() => { history.push("/"); }
    ).catch((error) => alert('Não foi possível concluir o cadastro, tente novamente.'))
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                placeholder="Empresa"
                spellCheck="false"
                required
              />
            </div>
            <div className="form-group">
              <DatePicker
                width="100%"
                className="form-control"
                id="exampleInputAddress"
                name="birthdate"
                selected={startDate}
                onChange={date => setStartDate(date)}
                placeholderText="Data de Nascimento"
                locale="br"
                required
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                name="state"
                value={inputValues["state"]}
                onChange={handleChange}
                required
              >
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
              <InputMask mask="(99) 99999-9999" className="form-control" id="Telefone" name="phone"
                value={
                  inputValues["phone"]
                }
                onChange={handleChange}
                placeholder="Telefone"
                spellCheck="false"
                required />
            </div>

            <button className="entrarButtonCadastro" onClick={handleSubmit}>Cadastrar</button>
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
