import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import TempoLive from "../../Components/TempoLive/tempoLive";
import ConfirmacaoLive from "../../Components/ConfirmacaoLive/confirmacaoLive"
import "./Live.css";

const Live = () => {
  return (
    <div className="Live">
      <Sidebar />
      <div className="paginaLive">
        <Header />
        <div className="blocoLive">
          <div className="tituloLive">
            <p>Live Marketing Digital 20/10</p>
            <p style={{fontSize: "x-large"}}>Se inicia às 20h</p>
          </div>
          <div className="acessarLive">
            <button className="buttonLive">ACESSAR</button>
          </div>
        </div>
        <TempoLive/>
        <ConfirmacaoLive/>
      </div>
    </div>
  );
};

export default Live;
