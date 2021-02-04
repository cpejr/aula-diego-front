import React, {useState} from "react";
import Base from "../../Components/Base/Base";
import Board from "../../Components/Board/Board"
import "./ListaAlunos.css"

const ListaAlunos = () => {
    
    const [search, setSearch] = useState("");
    
    return (
        <Base>
            <div style={{display:"flex", backgroundColor: "#f6f6f6", height:"100vh"}}>
                <div style={{flexDirection: "column"}}>
                    <div className="ListaDeAlunosContainer">
                        <div className="inputboard">
                            <h1>Lista de Alunos</h1>
                            <input placeholder="Pesquisar" onChange={e => setSearch(e.target.value)}/>
                            <Board search={search}/>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}


export default ListaAlunos
