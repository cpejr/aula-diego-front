import React from "react";
import "./TabelaAtividades.css";
import LinhaTabelaAtividades from "./LinhaTabelaAtividades.js";

const TabelaAtividades = (props) => {
  const elementos = [
    {
      type:props.type,
      module:props.module,
      name:props.name,
      date:props.date,
      status:props.status,
    },
    {
      type:"Prova 1",
      module:"3",
      name:"Bombeiros",
      date:"30/11/2020",
      status: true,
    },
    {
      type:"Lista 3",
      module:"5",
      name:"Pronto Socorro",
      date:"23/11/2020",
      status: false,
    },
    {
      type:"Lista 6",
      module:"1",
      name:"Samu",
      date:"28/11/2020",
      status: false,
    },

  ]
  return (
    <div className="ContainerAtividades">
      <h1 className="tableTitle">Atividades</h1>
      <div className="TabelaAtividades">
        {elementos.map(item =>(
          <LinhaTabelaAtividades key = {item.name} type={item.type} module={item.module} name={item.name} date={item.date} status={item.status} />
        ))}
      </div>
    </div>
  );
};
export default TabelaAtividades;
