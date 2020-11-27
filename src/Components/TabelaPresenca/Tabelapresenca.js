import React, { useState } from "react";
import "./TabelaPresenca.css";
import LinhaTabelaPresenca from "./LinhaTabelaPresenca.js";

const TabelaPresenca = ({ search }) => {
  const elementos = [
    {
      name: "Vitor Halley",
      matricula: "202018110",
      horaOn: "1:00",
      horaOff: "3:00",
      present: true,
    },
    {
      name: "Alexandre Rocha",
      matricula: "202021509",
      horaOn: "--",
      horaOff: "3:10",
      present: false,
    },
    {
      name: "Ana Camapana",
      matricula: "202014650",
      horaOn: "--",
      horaOff: "3:15",
      present: false,
    },
    {
      name: "Ana Gonçalves",
      matricula: "202014650",
      horaOn: "1:20",
      horaOff: "3:20",
      present: true,
    },
  ];

  const [users, setUsers] = useState(elementos);


  const Lista = elementos.map((item) => {
    return (
      <LinhaTabelaPresenca
        key={item.name}
        name={item.name}
        matricula={item.matricula}
        horaOn={item.horaOn}
        horaOff={item.horaOff}
        present={item.present}
      />
    );
  });
  return (
    <div className="ContainerLiveInfo">
      <div className="TitulosLiveInfo">
        <p>Nome</p>
        <p>Matrícula</p>
        <p>Horário De Entrada</p>
        {/* <p>Horário De Saída</p> */}
      </div>
      <div className="TabelaLiveInfo">
        {Lista}
      </div>
    </div>
  );
};
export default TabelaPresenca;
