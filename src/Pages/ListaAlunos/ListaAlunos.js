import React, { useState } from "react";
import Base from "../../Components/Base/Base";
import Header from "../../Components/Header/Header";
import Board from "../../Components/Board/Board";
import DATA from "./data.js";
import "./ListaAlunos.css";

const ListaAlunos = () => {
  const [search, setSearch] = useState("");

  return (
    <Base>
      <div className="pageRoot">
        <div className="pageBody">
          <div className="pageContent">
            <h1>Lista de Alunos</h1>
            <input
              placeholder="Pesquisar"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Board
              search={search}
              data={DATA}
              labels={["Nome", "Matrícula", "Curso"]}
            />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ListaAlunos;
