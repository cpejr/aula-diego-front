import React from "react";
import "./TabelaAtividades.css";
import LinhaTabelaAtividades from "./LinhaTabelaAtividades.js";

const TabelaAtividades = (props) => {
  return (
    <div className="ContainerAtividades">
      <h1>Atividades</h1>
      <div className="TabelaAtividades">
        <LinhaTabelaAtividades
          type="Lista 1"
          module="3"
          name="SAMU"
          date="22/11/2020"
          status="Pedente"
        />
        <LinhaTabelaAtividades
          type="Lista 1"
          module="3"
          name="SAMU"
          date="22/11/2020"
          status="Pedente"
        />
        <LinhaTabelaAtividades
          type="Lista 1"
          module="3"
          name="SAMU"
          date="22/11/2020"
          status="Pedente"
        />
      </div>
    </div>
  );
};
export default TabelaAtividades;
