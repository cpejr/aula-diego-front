import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSession } from "../Context/SessionContext";

import Loader from "../Pages/Loader";

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
        break;
      default:
        setRenderComponent(<Route to={path} component={Loader} />);
        break;
    }
  }, [session, studentComponent, adminComponent, masterComponent]);

  if (loading) return <Route to={path} component={Loader} />;
  if (session && session.accessToken) return renderComponent;
  else return <Redirect to="/" />;
}
