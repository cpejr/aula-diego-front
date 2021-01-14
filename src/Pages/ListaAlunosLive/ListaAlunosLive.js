import React, { useState, useEffect } from "react";
import "./ListaAlunosLive.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import TabelaPresenca from "../../Components/TabelaPresenca/Tabelapresenca"



export default function ListaAlunoLIve(props){

    props={
        duration:"3:33"
    }

    return (
        <div className="ListaTurmasContainer">
          <Sidebar />
          <div className="ListaTurmasContent">
            <Header />
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                height: "30vh",
              }}
            > <div style={{

                display: "flex",
                flexDirection: "column",
                width: "100%",
                height:"100%"


                 }}>
              <h1 className="ListaAlunosLiveTitle">Informações Live</h1>
              <h2 className="ListaALunoLiveTitle2">Duração Live: {props.duration}h </h2>
              <div
              style={{marginTop: "20px" }}>
              <h2 className="ListaALunoLiveTitle2">Lista de Presença </h2>
                </div>
                <TabelaPresenca/>


              </div>
            </div>
            </div>
        </div>
    );
}