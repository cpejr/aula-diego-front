import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";

import api from "../../services/api";
import { useSession } from "../../Context/SessionContext";

export default function CadastroOrganizacao() {
  const [organizations, setOrganizations] = useState([]); // Lista de organizações que vão nas opções do select
  const session = useSession();

  useEffect(() => {
    const config = {
      headers: {
        authorization: "BEARER " + accessToken,
      },
    };

    api.get("/", config).then((data) => setOrganizations(data)); // TROCAR ESSA URL QUE ESTÁ ERRADA
  }, []);

  return (
    <Base>
      <h1>Alo galera de peão</h1>
      {/* form com campos: name input type text e description textarea */}
    </Base>
  );
}
