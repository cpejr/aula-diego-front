import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import "./Cadastro.css";
import logo from "../../images/Logo2.png";
import { Link, useHistory } from "react-router-dom";
// import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";
import { message, DatePicker } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";

export default function Cadastro(props) {
  const [inputValues, setInputValues] = useState({});
  const [organizations, setOrganizations] = useState();
  const [occupations, setOccupations] = useState();
  const [startDate, setStartDate] = useState(null);
  const [checked, setChecked] = useState();
  const history = useHistory();
  const { session } = useSession();
  const dateFormat = 'DD/MM/YYYY';

  useEffect(() => {
    if (props.location.state) setInputValues(props.location.state);
    api.get("/organization").then((res) => setOrganizations(res.data));
  }, [props.location.state]);

  useEffect(() => {
    if (!organizations) return;
    api
      .get("/occupation", {
        params: { organization_id: inputValues["organization_id"] },
      })
      .then((res) => setOccupations(res.data));
  }, [inputValues, organizations]);

  function handleChange(e) {
    console.log({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  }
  function validateForm() {
    const inputs = document.querySelectorAll("input");
    console.log(inputs);

    for (let i = 0; i < inputs.length; ++i) {
      if (!inputs[i].value || inputs[i].value == "") return false;
    }

    if (inputValues["password"] !== inputValues["passwordConfirmation"]) {
      message.error("As senhas digitadas não correspondem.");
      return "pass";
    }

    if (!inputValues["organization_id"] || !inputValues["occupation_id"])
      return false;

    return true;
  }

  function TermosChecked(e) {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm() === "pass") return;
    if (!validateForm())
      message.error("Preencha todos os campos para se cadastrar");

    let data = inputValues;
    data.phone = data.phone.replace(/[()\s-]/g, "");
    data.cpf = data.cpf.split(".").join("");
    data.cpf = data.cpf.split("-").join("");
    delete data.passwordConfirmation;
    data.birthdate = startDate;
    console.log(data);
    api
      .post("/user", data)
      .then(() => {
        message.success("Usuário cadastrado com sucesso");
        history.push("/");
      })
      .catch((error) =>
        message.error("Não foi possível concluir o cadastro, tente novamente.")
      );
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
              <select
                className="form-control"
                name="organization_id"
                value={inputValues["organization_id"]}
                onChange={handleChange}
                required
              >
                <option value={null} selected disabled hidden>
                  Selecione a organização
                </option>
                {organizations?.map((org) => {
                  return <option value={org.id}>{org.name}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <select
                className="form-control"
                name="occupation_id"
                value={inputValues["occupation_id"]}
                onChange={handleChange}
                required
              >
                <option value={null} selected disabled hidden>
                  Selecione a ocupação
                </option>
                {occupations?.map((occup) => {
                  return <option value={occup.id}>{occup.name}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <DatePicker
                className="form-control"
                name="birthdate"
                selected={startDate}
                format={dateFormat}
                onChange={(date) =>{ setStartDate(date); console.log(date._d);}}
                placeholder="Data de Nascimento"
                locale="pt-BR"
              />
            </div>
            <div className="form-group">
              <InputMask
                mask="(99) 99999-9999"
                className="form-control"
                id="Telefone"
                name="phone"
                value={inputValues["phone"]}
                onChange={handleChange}
                placeholder="Telefone"
                spellCheck="false"
                required
              />
            </div>
            <div className="form-group">
              <InputMask
                mask="999.999.999-99"
                className="form-control"
                id="CPF"
                name="cpf"
                value={inputValues["cpf"]}
                onChange={handleChange}
                placeholder="CPF"
                spellCheck="false"
                required
              />
            </div>
            {/* VISÃO EXTRA DO MASTER */}
            {session && session.accessToken ? (
              <>
                <div className="form-group">
                  <select
                    className="form-control"
                    name="type"
                    value={inputValues["type"]}
                    onChange={handleChange}
                    required
                  >
                    <option value={null} selected disabled hidden>
                      Tipo de usuário
                    </option>
                    <option value="student">student</option>
                    <option value="admin">admin</option>
                    <option value="master">master</option>
                  </select>
                </div>
              </>
            ) : null}
            <Checkbox className="boxTermosDeUso" onChange={TermosChecked}>
              Concordo com os
            </Checkbox>
            <Link to="/termosdeuso">Termos de Uso e Condições</Link>
            {checked ? (
              <button className="entrarButtonCadastro" onClick={handleSubmit}>
                Cadastrar
              </button>
            ) : (
              <button
                className="entrarButtonCadastroDesabilitado"
                disabled
                onClick={handleSubmit}
              >
                Cadastrar
              </button>
            )}
            <div className="irLogin">
              <h5 className="jatemLogin">Já possui Login?</h5>
              <Link className="logincadastro" to="/login">
                Entrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
