import React, { useState, useEffect } from "react";
import "./ListaTurmas.css";
import Base from "../../Components/Base/Base";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {useHistory} from 'react-router-dom'

const data = [
  {
    ocupacao: "SAMU",
    codigo: "251862",
    number: 34,
  },
  {
    ocupacao: "SAMU",
    codigo: "321312",
    number: 19,
  },
  {
    ocupacao: "UPA",
    codigo: "72483",
    number: 88,
  },
  {
    ocupacao: "Pronto Socorro",
    codigo: "585855",
    number: 75,
  },
];



function LinhaListaTurmas(props) {
   

    let history = useHistory();
    const [pin,setPin]=useState(true);

    function removeLine(id){
        setPin(!pin)
        
    }

    function redirect(path){
      history.push(path)
    }

  return (

   
    pin ?
   <div className="LinhaListaTurmas">
      <p>{props.ocupacao}</p>
      <p>{props.codigo}</p>
      <p>{props.number}</p>
      <div className="LinhaListaTurmasIcons">
        <EditIcon
          style={{ marginRight: 20, fontSize: 40, color: "#9F9F9F" }}
          onClick={() => redirect('/tabelaturmas')}
        />
        <DeleteForeverIcon
          style={{ marginRight: 20, fontSize: 40, color: "#9F9F9F" }}
          onClick={() => removeLine(data.codigo)}
        />
      </div>
    </div>

    :
    <div></div>
  );
}

export default function ListaTurmas() {
  
    

  return (
    <>
    <Base>
      <div className="ListaTurmasContainer">
        <div className="ListaTurmasContent">
          <div className="TitleContainer">
            <h1 className="ListaTurmasTtitle">Turmas</h1>
          </div>
          <div className="ListaTurmasLabelContainer">
            <p className="ListaTurmasLabel">Ocupação</p>
            <p className="ListaTurmasLabel">Código</p>
            <p className="ListaTurmasLabel">Nº de Alunos</p>
          </div>

          <div className="ListaTurmasDataContainer">
            {data.map((item) => {
              return (
                <LinhaListaTurmas
                  id={item.codigo}
                  ocupacao={item.ocupacao}
                  codigo={item.codigo}
                  number={item.number}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Base> 
    </>
  );
}
