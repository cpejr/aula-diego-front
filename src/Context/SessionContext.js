import React, { useState, createContext, useContext } from "react";
import api from "../services/api";

const SessionContext = createContext();

function SessionProvider({ children }) {
  const [session, setSession] = useState(null);

  function handleLogin({ accessToken, user }) {
    setSession({ accessToken, user });
    window.localStorage.clear();
    window.localStorage.setItem("accessToken", accessToken);
    window.localStorage.setItem("name", user.name);
    window.localStorage.setItem("id", user.user_id);
  }

  function loadSession() {
    const accessToken =
      session && session.accessToken
        ? session.accessToken
        : window.localStorage.getItem("accessToken");

    const config = {
      headers: {
        authorization: "BEARER " + accessToken,
      },
    };

    return api.get("/verify", config).then((response) => {
      response.data.verified === true
        ? handleLogin({ accessToken, user: response.data.user })
        : setSession(null);
    });
  }

  function handleLogout() {
    window.localStorage.clear();
    setSession(null);
    return;
  }

  return (
    <SessionContext.Provider
      value={{ session, handleLogin, handleLogout, loadSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}

function useSession() {
  const session = useContext(SessionContext);
  return session;
}

export { useSession, SessionProvider };
