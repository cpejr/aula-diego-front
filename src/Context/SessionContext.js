import React, { useState, createContext, useContext } from "react";

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

  return (
    <SessionContext.Provider value={{ session, handleLogin }}>
      {children}
    </SessionContext.Provider>
  );
}

function useSession() {
  const session = useContext(SessionContext);
  return session;
}

export { useSession, SessionProvider };
