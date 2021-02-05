import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function ListaOrganizacoes() {
  const [occupations, setOccupations] = useState([]);
  const orgId = props.match.params

  useEffect(() => {
    const config = {
      headers: {
        authorization: "BEARER " + accessToken,
      },
    };
    api.get("/", config).then((data) => setOccupations(data)); // MUDAR O PATH
  }, []);

  return (
    <>
      {/* TITULO DA TABELA */}
      {/* fazer um map no state jogando os dados em cada linha da tabela de ocupacoes */}
    </>
  );
}
