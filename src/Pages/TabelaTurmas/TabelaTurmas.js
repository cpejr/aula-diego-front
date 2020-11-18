import React,{useState} from "react";
import "./TabelaTurmas.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import Tabela from './Tabela'






const data = {
  name: "Samu",
};

export default function TabelaTurmas() {

  const [search,setSearch]=useState(' ')



  return (
    <div className="TabelaTurmasContainer">
      <Sidebar />
      <div className="TabelaTurmasContent">
        <Header />
        <h1 className="TabelaTurmasTitle">Turma {data.name}</h1>
        <div className="TabelaTurmasSearchBarContainer">
          <input placeholder="Busque pelo nome, Matrícula ou Curso" onChange={e => setSearch(e.target.value)}/>
          <button onClick={()=>console.log(search)}>BUSCAR</button>
        </div>
         <Tabela search={search}/> 
      </div>
    </div>
  );
}
