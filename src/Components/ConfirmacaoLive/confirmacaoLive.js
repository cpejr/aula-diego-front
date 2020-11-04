import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./ConfirmacaoLive.css";

const data = "Hermon";

const ConfirmacaoLive = (props) => {
  const [input, setInput] = useState("");
  const [codigo, setCodigo] = useState(data);
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  function jose(input, codigo) {
    if (input != codigo) {
      alert("Código inválido! Tente Novamente");
    } else {
      props.handleToggle()
    }
  }
  return (
    <div className="confirmacaoLive">
      <div className="paginaConfirmacaoLive">
        <div className="blocoConfirmacaoLive">
          <div className="tituloConfirmacaoLive">
            <p>Live Marketing Digital 20/10</p>
            <p style={{ marginTop: "5%" }}>Digite o código de verificação:</p>

            <div className="divInputConfirmacaoLive">
              <input
                onChange={handleChange}
                className="inputConfirmacaoLive"
                placeholder="Insira o código"
              ></input>
            </div>
          </div>
          <div className="acessarConfirmacaoLive">
            <button
              onClick={() => jose(input, codigo)}
              className="buttonConfirmacaoLive"
            >
              Certificar Live
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacaoLive;
