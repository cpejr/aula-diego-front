import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import Cards from "../../Components/Cards/Cards";
import TabelaAtividades from "../../Components/TabelaAtividades/TabelaAtividades";
import "./index.css";
import Foto from "../../images/samu.svg";

const Dashboard = () => {
  return (
    <div
      className="Teste"
      style={{ display: "flex", backgroundColor: "#fafafa" }}
    >
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <div className="DashboardTitle">
          <img src={Foto} className="TitleImg" />
          <h1 style={{ fontWeight: 600 }}>Próximas Lives</h1>
        </div>
        <div>
          <div className="DashboardCardContainer">
            <Cards
              title="SAMU"
              cardColor="#A564E5"
              date="20/10/2020"
              hour="20:00"
            />
            <Cards
              title="UPA"
              cardColor="#6AA5E3"
              date="20/10/2020"
              hour="20:00"
            />
            <Cards
              title="Bombeiros"
              cardColor="#F97091"
              date="20/10/2020"
              hour="20:00"
            />
          </div>
          <TabelaAtividades type="Lista 1" module="3" name="SAMU" date="22/11/2020" status="Pendente"/>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
