import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./ConfirmacaoLive.css";

const ConfirmacaoLive = () => {
  return (
    <div className="confirmacaoLive">
      <div className="paginaConfirmacaoLive">
        <div className="blocoConfirmacaoLive">
          <div className="tituloConfirmacaoLive">
            <p>Live Marketing Digital 20/10</p>
            <p style={{ marginTop: "5%" }}>Digite o código de verificação:</p>
            <div className="divInputConfirmacaoLive">
              <input
                className="inputConfirmacaoLive"
                placeholder="Insira o código"
                ></input>
            </div>
          </div>
          <div className="acessarConfirmacaoLive">
            <button className="buttonConfirmacaoLive">Certificar Live</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacaoLive;
