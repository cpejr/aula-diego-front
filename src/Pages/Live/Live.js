import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import "./Live.css";

const Live = () => {
  return (
    <div className="Live">
      <Sidebar />
      <div className="paginaLive">
        <Header />
        <div className="blocoLive">
          <div className="tituloLive">
            <p>Live Marketing Digital 2010</p>
            <p>Se inicia às 20h</p>
          </div>
          <div className="acessarLive">
            <button className="buttonLive">ACESSAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
