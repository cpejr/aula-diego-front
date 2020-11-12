import React from "react";
import "./TabelaNovaTurma.css";
import LinhaTabelaNovaTurma from "./LinhaTabelaNovaTurma.js"

const TabelaNovaTurma = (props) => {
  const elementos = [
    {
      name: props.name,
      registration: props.registration,
      occupation: props.occupation,
    },
    {
      name: "Alexandre Rocha",
      registration: "202021509",
      occupation: "SAMU",
    },
    {
      name: "Ana Camapana",
      registration: "202014650",
      occupation: "UPA",
    },
    {
      name: "Ana Gonçalves",
      registration: "202014650",
      occupation: "SAMU, UPA",
    },
  ];
  return (
    <div className="ContainerNovaTurma">
      <div className="TabelaNovaTurma">
        {elementos.map((item) => (
          <LinhaTabelaNovaTurma
            key={item.name}
            name={item.name}
            registration={item.registration}
            occupation={item.occupation}
          />
        ))}
      </div>
    </div>
  );
};
export default TabelaNovaTurma;
