import React, { useEffect, useState } from "react";
import { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSession } from "../Context/SessionContext";

export default function PrivateRoute({
  path,
  studentComponent,
  adminComponent,
  masterComponent,
}) {
  const [loading, setLoading] = useState(true);
  const [renderComponent, setRenderComponent] = useState();
  const { session, loadSession } = useSession();

  useEffect(() => {
    loadSession().then(() => setLoading(false));
  }, []);

  useEffect(() => {
    const userType = session && session.user.type;
    console.log(userType);
    switch (userType) {
      case "student":
        setRenderComponent(studentComponent);
        break;
      case "admin":
        setRenderComponent(adminComponent);
        break;
      case "master":
        setRenderComponent(masterComponent);
      default:
        setRenderComponent(() => <h1>CARREGANDO INFORMAÇÕES</h1>);
        console.log("default ");
        break;
    }
  }, [loading]);

  if (loading) return <h1>CARREGANDO INFORMAÇÕES</h1>;
  if (session && session.accessToken) return renderComponent;
  else return <Redirect to="/" />;
}
