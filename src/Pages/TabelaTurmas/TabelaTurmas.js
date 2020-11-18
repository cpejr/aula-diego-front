import React,{useState} from "react";
import "./TabelaTurmas.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";


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

const data = {
  name: "Samu",
};

export default function TabelaTurmas() {

  const [users,setUsers]=useState(DATA);
  const [search,setSearch]=useState('')

  const filtered = users.filter((user)=>{
    return(
      user.name.indexOf(search.toLowerCase()) !== -1
      || user.matricula.indexOf(search) !== -1 
      || user.ocupacao.indexOf(search.toLowerCase()) !== -1
    )
  })

  const Lista = filtered.map(item => {return(
      <LinhaTabelaTurmas id={item.matricula} name={item.name} matricula={item.matricula} ocupacao={item.ocupacao}/>
  )})



  return (
    <div className="TabelaTurmasContainer">
      <Sidebar />
      <div className="TabelaTurmasContent">
        <Header />
        <h1 className="TabelaTurmasTitle">Turma {data.name}</h1>
        <div className="TabelaTurmasSearchBarContainer">
          <input placeholder="Busque pelo nome, Matrícula ou Curso" onChange={e => setSearch(e.target)}/>
          <button>BUSCAR</button>
        </div>
        <div className='TabelaTurmasBox'>
            <div className='LinhaBoard' >
                <p className='TabelaTurmasLabel'>Nome</p>
                <p className='TabelaTurmasLabel'>Matrícula</p>
                <p className='TabelaTurmasLabel' style={{borderRight:'none'}}>Ocupação</p>
            </div>
            {DATA.map(item=>{
              return(
                <LinhaTabelaTurmas id={item.matricula} name={item.name} matricula={item.matricula} ocupacao={item.ocupacao}/>
              )
            })}
        </div>
      </div>
    </div>
  );
}
