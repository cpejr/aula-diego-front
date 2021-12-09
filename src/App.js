import React from "react";
import Routes from "./routes";
import { SessionProvider } from "./Context/SessionContext";

import "./App.css";

function App() {
  return (
    <div className="App">
      <SessionProvider>
        <Routes />
      </SessionProvider>
    </div>
  );
}

export default App;
