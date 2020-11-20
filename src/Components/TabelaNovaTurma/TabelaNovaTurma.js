import React, { useState } from "react";
import "./TabelaNovaTurma.css";
import LinhaTabelaNovaTurma from "./LinhaTabelaNovaTurma.js";

const TabelaNovaTurma = ({ search }) => {
  const elementos = [
    {
      name: "Vitor Halley",
      registration: "202018110",
      occupation: "COMETA",
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

  const [users, setUsers] = useState(elementos);

  const filtered = users.filter((user) => {
    return (
      user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      user.registration.indexOf(search) !== -1 ||
      user.occupation.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  });
  const Lista = filtered.map((item) => {
    return (
      <LinhaTabelaNovaTurma
        key={item.name}
        name={item.name}
        registration={item.registration}
        occupation={item.occupation}
      />
    );
  });
  return (
    <div className="ContainerNovaTurma">
      <div className="TitulosDaTabela">
        <p>Nome</p>
        <p>Matrícula</p>
        <p>Ocupação</p>
      </div>
      <div className="TabelaNovaTurma">
        {Lista}
      </div>
    </div>
  );
};
export default TabelaNovaTurma;
