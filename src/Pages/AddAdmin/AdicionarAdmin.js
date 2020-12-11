import React, {useState} from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header"
import BoardAddAdmin from "../../Components/BoardAddAdmin/BoardAddAdmin"

const ListaAlunos = () => {
    
    const [search, setSearch] = useState("");
    const [use, setUse] = useState(0);
    return (
        
        <div style={{display:"flex", backgroundColor: "#f6f6f6", height:"100vh", overflow:"auto"}}>
            <div style={{flexDirection: "column", width:"100%"}}>
                <Header />
                <div className="ListaDeAlunosContainer">
                    <div className="inputboard">
                        <h1>Lista de Alunos</h1>
                        <input placeholder="Pesquisar" onChange={e => setSearch(e.target.value)}/>
                        <BoardAddAdmin search={search}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ListaAlunos
