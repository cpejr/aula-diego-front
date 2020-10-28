import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import "./tempoLive.css";

const tempoLive = () => {
  return (
    <div className="tempoLive">
      <div className="paginaTempoLive">
        <div className="blocoTempoLive">
          <div className="tituloTempoLive">
            <p>Live Marketing Digital 20/10</p>
            <p style={{marginTop: "5%" }}>Tempo que você está em Live: </p>
          </div>
          <div className="acessarTempoLive">
            <button className="buttonTempoLive">Certificar Live</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default tempoLive;
