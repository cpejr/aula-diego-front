import React, { useState, useEffect } from "react";
import "./Infolive.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import InfoIcon from '@material-ui/icons/Info';
import { useHistory } from "react-router-dom";

const data = [

    {
      ocupacao: "SAMU",
      data: "29/11",
      qntd: 34,
    },
    {
      ocupacao: "SAMU",
      data: "28/11",
      qntd: 19,
    },
    {
      ocupacao: "UPA",
      data: "26/11",
      qntd: 88,
    },
    {
      ocupacao: "Pronto Socorro",
      data: "25/11",
      qntd: 75,
    },
  ];
  
  
  
  function LinhaListaTurmas(props) {
     
      const [pin,setPin]=useState(true);
  
      function removeLine(id){
          setPin(!pin)
          
      }
  
    return (
  
     
      pin ?
     <div className="LinhaListaTurmas">
        <p>{props.ocupacao}</p>
        <p>{props.data}</p>
        <p style={{ marginLeft:90 }} >{props.qntd}</p>
        <div className="LinhaListaTurmasIcons">
          <InfoIcon
            style={{ marginRight: 20, fontSize: 40, color: "#9F9F9F" }}
            onClick={props.redirect}
          />
          
        </div>
      </div>
  
      :
      <div></div>
    );
  }
  
  export default function Infolive() {
    
    let history = useHistory()
    function redirect(){
        let path = '/listalive'
        history.push(path);
    } 
  
    return (
      <div className="ListaTurmasContainer">
        <Sidebar />
        <div className="ListaTurmasContent">
          <Header />
          <div
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              height: "30vh",
            }}
          >
            <h1 className="ListaTurmasTtitle">Lives</h1>
          </div>
          <div className="ListaTurmasLabelContainer">
            <p className="ListaTurmasLabel">Curso</p>
            <p className="ListaTurmasLabel">Data</p>
            <p className="ListaTurmasLabel">Quantidade de Alunos</p>
          </div>
  
          <div className="ListaTurmasDataContainer">
            {data.map((item) => {
              return (
                <LinhaListaTurmas
                  id={item.codigo}
                  ocupacao={item.ocupacao}
                  data={item.data}
                  qntd={item.qntd}
                  redirect={redirect}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  