import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSession } from "../Context/SessionContext";

export default function PrivateRoute({
  path,
  studentComponent,
  adminComponent,
  masterComponent,
  ...rest
}) {
  const [loading, setLoading] = useState(true);
  const [renderComponent, setRenderComponent] = useState();
  const { session, loadSession } = useSession();

  useEffect(() => {
    loadSession().then(() => setLoading(false));
  }, []);

  useEffect(() => {
    const userType = session && session.user.type;
    switch (userType) {
      case "student":
        setRenderComponent(
          <Route {...rest} to={path} component={studentComponent} />
        );
        break;
      case "admin":
        setRenderComponent(
          <Route {...rest} to={path} component={adminComponent} />
        );
        break;
      case "master":
        setRenderComponent(
          <Route {...rest} to={path} component={masterComponent} />
        );
      default:
        setRenderComponent(
          <Route to={path} component={() => <h1>CARREGANDO</h1>} />
        );
        break;
    }
  }, [session, studentComponent, adminComponent, masterComponent]);

  if (loading) return <h1>CARREGANDO INFORMAÇÕES</h1>;
  if (session && session.accessToken) return renderComponent;
  else return <Redirect to="/" />;
}
