import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSession } from "../Context/SessionContext";

export default function PrivateRoute({ path, component }) {
  const { session } = useSession();

  return session && session.accessToken ? (
    <Route to={path} component={component} />
  ) : (
    <Redirect to="/" />
  );
}
