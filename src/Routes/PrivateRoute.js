import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSession } from "../Context/SessionContext";

export default function PrivateRoute({ path, component }) {
  const [loading, setLoading] = useState(true);
  const { session, loadSession } = useSession();

  useEffect(() => {
    loadSession();
  }, []);

  useEffect(() => {
    return () => setLoading(false);
  }, [session]);

  return loading ? (
    <h1>CARREGANDO INFORMAÇÕES</h1> // pagina de loading é carregada se loading == true
  ) : session && session.accessToken ? ( // se loading == false, olhamos para a sessão
    <Route to={path} component={component} /> // se houver uma sessão, acessamos a página privada
  ) : (
    <Redirect to="/" /> // se não houver sessão, redirecionamos para a página inicial
  );
}
