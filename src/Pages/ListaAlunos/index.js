import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import Board from "../../Components/Board/Board";
import "./ListaAlunos.css";

const ListaAlunos = () => {
  const [search, setSearch] = useState("");

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#f6f6f6",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Sidebar />
      <div style={{ flexDirection: "column", width: "100%" }}>
        <Header />
        <div className="ListaDeAlunosContainer">
          <div className="inputboard">
            <h1>Lista de Alunos</h1>
            <input
              placeholder="Pesquisar"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Board search={search} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaAlunos;
