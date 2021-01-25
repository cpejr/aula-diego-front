import React, {useState} from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header"
import Board from "../../Components/Board/Board"
import DATA from "./data.js"
import "./ListaAlunos.css"

const ListaAlunos = () => {
    
    const [search, setSearch] = useState("");
    
    return (
        <div className="pageRoot">
            {/* <Sidebar /> */}
            <div className="pageBody">
                <Header />
                <div className="pageContent">
                    <h1>Lista de Alunos</h1>
                    <input placeholder="Pesquisar" onChange={e => setSearch(e.target.value)}/>
                    <Board search={search} data={DATA} labels={["Nome", "Matrícula", "Curso"]} />
                </div>
            </div>
        </div>
    )
}

export default ListaAlunos