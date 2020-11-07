import React, {useState} from "react";
import Header from "../../Components/Header/Header"
import Sidebar from "../../Components/Sidebar/Sidebar"
import "./index.css"


const DATA = [
    {
        name: "André",
        matricula: "6666",
        curso: "Medicina Espacial"
    },
    {
        name: "Daniel",
        matricula: "1234",
        curso: "Química Quântica"
    },
    {
        name: "Alexandre",
        matricula: "5678",
        curso: "Física Nuclear"
    },
    {
        name: "Hermon",
        matricula: "1212",
        curso: "Veterinária Esportiva"
    },
]


function LinhaTabelaAlunos(props) {
    
    
return (
        <div className="ListaDeAlunos">
            <p>{props.name}</p>
            <p>{props.matricula}</p>
            <p>{props.curso}</p>
        </div>
    )
}


const ListaAlunos = () => {

    const [search, setSearch] = useState("");
    const [alunos, setAlunos] = useState(DATA);

    const filteredAlunos = alunos.filter(aluno => aluno.includes(search)) 

    return (
        <div className="ListaDeAlunosContainer">
                <h1 className="ListaDeAlunosTitulo">Lista de Alunos</h1>
                <div style={{display:"flex"}}>
                    <input style={{width:"90%"}} placeholder="Busque pelo nome, matrícula ou curso" onChange={(e) => setSearch(e.target.value)} />
                    <button style={{width:"100px"}}>Buscar</button>
                </div>
                <div className="DataContainer">
                    {DATA.map(item => { return (<LinhaTabelaAlunos name={item.name} matricula={item.matricula} curso={item.curso} />)})}
                </div>
        </div>
    )
}

export default ListaAlunos