import React from "react";
import Routes from "./routes";
import { SessionProvider } from "./Context/SessionContext";

function App() {
  return (
    <SessionProvider>
      <Routes />
    </SessionProvider>
  );
}

export default App;
