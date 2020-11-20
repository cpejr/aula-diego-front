import React, { useState } from "react"
import "./Board.css"

const DATA = [
    {
        name:"André Versiani de Mattos",
        matricula:"000",
        curso:"Medicina"
    },
    {
        name:"Habib Jose da Silva",
        matricula:"001",
        curso:"Bombeiros"
    },
    {
        name:"Hermon Barros",
        matricula:"002",
        curso:"Enfermagem"
    },
    {
        name:"Pedro Gabriel",
        matricula:"003",
        curso:"Medicina"
    },
    {
        name:"Vitor Barros",
        matricula:"004",
        curso:"Arquitetura"
    },

    {
        name:"Daniel Benicá",
        matricula:"005",
        curso:"Enfermagem"
    },
    {
        name:"Daniel Almeida",
        matricula:"006",
        curso:"Design"
    },
    {
        name:"Ângela França",
        matricula:"007",
        curso:"Engenharia"
    },
    {
        name:"Ângela França",
        matricula:"008",
        curso:"Engenharia"
    },
    {
        name:"Ângela França",
        matricula:"009",
        curso:"Engenharia"
    },
    {
        name:"Ângela França",
        matricula:"010",
        curso:"Engenharia"
    },
    {
        name:"Ângela França",
        matricula:"011",
        curso:"Engenharia"
    }
]



const LinhaBoard = ({nomeAluno, matricula, cursos}) =>  {
        return (
                <div onClick={()=>alert(nomeAluno)} className='LinhaBoard'>
                <p>{nomeAluno}</p>
                <p>{matricula}</p>
                <p>{cursos}</p>
            </div>
        )
}


const Board = ({search}) => {

    const [users, setUsers] = useState(DATA)
    const [open, setOpen] = useState(false)

    const filtered = users.filter(user => {
        return (
            user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 
            || user.matricula.indexOf(search) !== -1 
            || user.curso.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
    })

    const Lista = filtered.map(item => { return (
        <LinhaBoard  key={item.matricula} nomeAluno={item.name} matricula={item.matricula} cursos={item.curso}/>
    )})

    return (
        <div>
            <div className="BoardContainer">
                <div className="LinhaBoard">
                    <p style={{borderWidth: "0px", fontSize: "25px", color:"#25003c"}}>Nome</p>
                    <p style={{borderWidth: "0px", fontSize: "25px", color:"#25003c"}}>Matrícula</p>
                    <p style={{borderWidth: "0px", fontSize: "25px", color:"#25003c"}}>Cursos</p>
                </div>
                {Lista}
            </div>
        </div>
    )
}

export default Board