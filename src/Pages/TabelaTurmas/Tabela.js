import React, { useState } from "react"
import "./TabelaTurmas.css"


const DATA=[
  {
      name:'João Rivello',
      matricula:' 32131',
      ocupacao:'Bombeiro'
  },
  {
      name:'Daniel Benicá',
      matricula:' 78954',
      ocupacao:'SAMU'
  },
  {
      name:'Alexandre Rocha',
      matricula:'12345',
      ocupacao:'Nada'
  },
  {
      name:'Daniel Almeida',
      matricula:'58244',
      ocupacao:'UPA'
  },
  {
      name:'Hermon Barros',
      matricula:'56874',
      ocupacao:'Padre'

  },
  {
      name:'Andre Mattos',
      matricula:' 75542',
      ocupacao:'Pro-Player'
  },
  {
      name:'Pedro Gabriel',
      matricula:'18899',
      ocupacao:'SAMU'
  }
]

function LinhaTabelaTurmas(props) {
  return (
    <div className='LinhaBoard'>
      <p>{props.name}</p>
      <p>{props.matricula}</p>
      <p>{props.ocupacao} </p>
    </div>
  );
}


const Tabela = ({search}) => {

    const [users, setUsers] = useState(DATA)

    const filtered = users.filter(user => {
        return (
            user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 
            || user.matricula.indexOf(search) !== -1 
            || user.curso.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
    })

    const Lista = filtered.map(item => { return (
        <LinhaBoard key={item.matricula} nomeAluno={item.name} matricula={item.matricula} cursos={item.curso}/>
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

export default Tabela