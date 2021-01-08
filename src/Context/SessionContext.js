import React, { useState, createContext, useContext } from "react";

const SessionContext = createContext();

function SessionProvider({ children }) {
  const [token, setToken] = useState(null);
  return (
    <SessionContext.Provider value={(token, setToken)}>
      {children}
    </SessionContext.Provider>
  );
}

function useSession() {
  const session = useContext(SessionContext);
  return session;
}

export { useSession, SessionProvider };
