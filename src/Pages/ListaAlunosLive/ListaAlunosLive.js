import React, { useState, useEffect } from "react";
import "./ListaAlunosLive.css";
import Base from "../../Components/Base/Base";
import TabelaPresenca from "../../Components/TabelaPresenca/Tabelapresenca"



export default function ListaAlunoLIve(props){

    props={
        duration:"3:33"
    }

    return (
      <Base>
        <div className="ListaTurmasContainer">
          <div className="ListaTurmasContent">
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                height: "30vh",
              }}
            > 
              </div>
            </div>
        </div>

        </Base>
    );
}
