import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import TabelaNovaTurma from "../../Components/TabelaNovaTurma/TabelaNovaTurma"
import "./NovaTurma.css";

export default function NovaTurma() {
  return (
<div className="NovaTurma">
      <Sidebar />
      <div className="paginaNovaTurma">
        <Header />
        <div>
            <p className="tituloNovaTurma">
                Criar Nova Turma
            </p>
            <p className="subTituloNovaTurma">
                Nome da Turma:
            </p>
        </div>
        <div>
            <TabelaNovaTurma/>
        </div>
      </div>
    </div>
  );
}
