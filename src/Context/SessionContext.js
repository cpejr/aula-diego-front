import React, { useState, createContext, useContext } from "react";
import api from "../services/api";

const SessionContext = createContext();

function SessionProvider({ children }) {
  const [session, setSession] = useState(null);

  function handleLogin({ accessToken, user }) {
    setSession({ accessToken, user });
    window.localStorage.clear();
    window.localStorage.setItem(
      "session",
      JSON.stringify({ accessToken, name: user.name })
    );
  }

  function loadSession() {
    const parsedSession = JSON.parse(window.localStorage.getItem("session"));
    const storageToken = parsedSession && parsedSession["accessToken"];
    const accessToken =
      session && session.accessToken ? session.accessToken : storageToken;

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
