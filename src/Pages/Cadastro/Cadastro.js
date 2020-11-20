import React, {useState} from "react";
import InputMask from 'react-input-mask'
import "./Cadastro.css";
import logo from "../../images/Logo2.png";
import { Input } from "@material-ui/core";

const Cadastro = (props) => {

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
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
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
                placeholder="Data de Nascimento"
                mask="99/99/9999"
                spellCheck="false"
                value={props.value}
                onChange={props.onChange}
                required pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputAddress"
                placeholder="Endereço"
                spellCheck="false"
                required
              />
            </div>
            <div className="form-group">
              <InputMask
                mask="999999"
                className="form-control"
                id="exampleInputNumber"
                placeholder="Número"
                value={props.value}
                onChange={props.onChange}
                required
              />
            </div>
            <div className="form-group">
              <InputMask
                className="form-control"
                id="exampleInputCEP"
                placeholder="CEP"
                mask="99999-999"
                value={props.value}
                onChange={props.onChange}
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
              <input
                type="text"
                className="form-control"
                id="exampleInputSexo"
                placeholder="Sexo"
                spellCheck="false"
                required
              />
            </div>
            <div className="form-group">
              <InputMask
                mask="(99) 99999-9999"
                className="form-control"
                id="exampleInputTelefone"
                placeholder="Telefone"
                spellCheck="false"
                required
                value={props.value}
                onChange={props.onChange}
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
