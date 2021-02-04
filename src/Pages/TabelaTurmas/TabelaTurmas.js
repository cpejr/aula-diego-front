import React,{useState} from "react";
import "./TabelaTurmas.css";
import Base from "../../Components/Base/Base";
import Tabela from './Tabela'
import Board from "../../Components/Board/Board"
import useGlobalState from '../../Store/useGlobalState'
import Context from '../../Store/context'
import DATA from "./data"

const data = {
  name: "Samu",
};

export default function TabelaTurmas() {


  const store = useGlobalState();

  const [search,setSearch]=useState(' ')



  return (
    <Context.Provider value={store}>
    <Base>
      <div className="TabelaTurmasContainer">
        <div className="TabelaTurmasContent">
          <h1 className="TabelaTurmasTitle">Turma {data.name}</h1>
          <div className="TabelaTurmasSearchBarContainer">
            <input placeholder="Busque pelo nome, Matrícula ou Curso" onChange={e => setSearch(e.target.value)}/>
            
          </div>
          <Tabela search={search}/> 
        </div>
      </div>
    </Base>
    </Context.Provider>
  );
}
