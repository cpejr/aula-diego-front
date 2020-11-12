import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import "./NovaTurma.css";

export default function NovaTurma() {
  return (
    <div className="ContainerNovaTurma">
      <Sidebar />
      <Header />
      <div className="TitleNovaTurma">
        <h1>Criar Nova Turma</h1>
      </div>
    </div>
  );
}
