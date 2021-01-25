import React,{useState} from "react";
import "./TabelaTurmas.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
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
      <div className="pageRoot">
            {/* <Sidebar /> */}
            <div className="pageBody">
                <Header />
                <div className="pageContent">
                    {console.log(DATA[1])}
                    <h1>Turmas</h1>
                    <input placeholder="Pesquisar" onChange={e => setSearch(e.target.value)}/>
                    <Board search={search} data={DATA} labels={["Nome", "Matrícula", "Ocupação"]}/>
                </div>
            </div>
        </div>
    {/* <div className="TabelaTurmasContainer">
      {<Sidebar />}
      <div className="TabelaTurmasContent">
        <Header />
        <h1 className="TabelaTurmasTitle">Turma {data.name}</h1>
        <div className="TabelaTurmasSearchBarContainer">
          <input placeholder="Busque pelo nome, Matrícula ou Curso" onChange={e => setSearch(e.target.value)}/>
        </div>
         <Tabela search={search}/> 
      </div>
    </div> */}
    </Context.Provider>
  );
}
