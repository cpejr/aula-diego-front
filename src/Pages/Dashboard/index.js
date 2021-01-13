import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import Cards from "../../Components/Cards/Cards";
import TabelaAtividades from "../../Components/TabelaAtividades/TabelaAtividades";
import "./index.css";
import Foto from "../../images/samu.svg";
import { FaSitemap } from "react-icons/fa";
import { Directions, MarkunreadMailboxSharp } from "@material-ui/icons";

export default function Dashboard() {
  return (
    <div
      className="pageWrapper"
      style={{
        display: "flex",
        backgroundColor: "#fafafa",
      }}
    >
    
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Header />
          <div className="DashboardTitle">
            <img src={Foto} className="TitleImg" />
            <h1 style={{ fontWeight: 600 }}>PRÓXIMAS LIVES</h1>
          </div>
          <div style={{ flex: 1, backgroundColor: "#fafafa" }}>
            <div className="DashboardCardContainer">
              <Cards
                title="SAMU"
                cardColor1="#A564E5"
                cardColor2="#9244E3"
                date="20/10/2020"
                hour="20:00"
              />
              <Cards
                title="UPA"
                cardColor1="#6AA1E4"
                cardColor2="#686AE9"
                date="20/10/2020"
                hour="20:00"
              />
              <Cards
                title="Bombeiros"
                cardColor1="#FD88A4"
                cardColor2="#EE3763"
                date="20/10/2020"
                hour="20:00"
              />
            </div>
            <TabelaAtividades
              type="Lista 1"
              module="3"
              name="SAMU"
              date="22/11/2020"
              status={true}
            />
          </div>
        </div>
    </div>
  );
}


