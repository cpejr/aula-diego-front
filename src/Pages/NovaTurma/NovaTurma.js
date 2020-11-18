import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import TabelaNovaTurma from "../../Components/TabelaNovaTurma/TabelaNovaTurma";
import "./NovaTurma.css";

export default function NovaTurma() {
  return (
    <div className="NovaTurma">
      <Sidebar />
      <div className="paginaNovaTurma">
        <Header />
        <div>
          <p className="tituloNovaTurma">Criar Nova Turma</p>
          <p className="subTituloNovaTurma">Nome da Turma:</p>
          <input
            placeholder="Digite o nome da turma"
            className="NovaTurmaInput"
          />
          <p className="subTituloNovaTurma"> Adicionar Alunos:</p>
          <input
            placeholder="Busque pelo nome, matrícula ou curso"
            className="NovaTurmaInput"
          />
        </div>
        <div>
          <TabelaNovaTurma />
          <div className="ContainerButão">
            <button>Criar</button>
          </div>
        </div>
      </div>
    </div>
  );
}