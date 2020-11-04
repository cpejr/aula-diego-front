import React from "react";
import "./TabelaAtividades.css";
import LinhaTabelaAtividades from "./LinhaTabelaAtividades.js";

const TabelaAtividades = (props) => {
  return (
    <div className="ContainerAtividades">
      <h1>Atividades</h1>
      <div className="TabelaAtividades">
        <LinhaTabelaAtividades
          type={props.type}
          module={props.module}
          name={props.name}
          date={props.date}
          status={props.status}
        />
        <LinhaTabelaAtividades
          type={props.type}
          module={props.module}
          name={props.name}
          date={props.date}
          status={props.status}
        />
        <LinhaTabelaAtividades
          type={props.type}
          module={props.module}
          name={props.name}
          date={props.date}
          status={props.status}
        />
      </div>
    </div>
  );
};
export default TabelaAtividades;
