import React, { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { useSession } from "../Context/SessionContext";

export default function IsLoggedRoute({
  path,
  component,
  loggedPath,
  ...rest
}) {
  const [renderComponent, setrenderComponent] = useState(
    <Route {...rest} component={component} path={path} />
  );
  const { session, loadSession } = useSession();
  const history = useHistory();

  useEffect(() => {
    loadSession();
  }, []);

  useEffect(() => {
    if (session && session.accessToken)
      setrenderComponent(<Redirect {...rest} to={loggedPath} />);
    else
      setrenderComponent(<Route {...rest} component={component} path={path} />);
  }, [session, component]);

  return renderComponent;
}
