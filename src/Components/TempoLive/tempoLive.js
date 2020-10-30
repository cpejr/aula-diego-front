import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import './TempoLive.css'

const TempoLive = (props) => {



  return (
    <div className="tempoLive">
      <div className="paginaTempoLive">
        <div className="blocoTempoLive">
          <div className="tituloTempoLive">
            <p>Live Marketing Digital 20/10</p>
            <p style={{marginTop: "5%" }}>Tempo que você está em Live: </p>
          </div>
          <div className="acessarTempoLive">
            <button className="buttonTempoLive" onClick={props.handleToggle}>Certificar Live</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempoLive;
