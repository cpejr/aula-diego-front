import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Burger from "../Burger/Burger";
import "./Header.css";
import Foto from "../../images/foto.jpg";
import { Link, Switch, useHistory } from "react-router-dom";
import { useSession } from "../../Context/SessionContext";

const Header = () => {
  let history = useHistory();
  const { session } = useSession();

  function redirect(path) {
    history.push(path);
  }
  return (
    <>
      {session.user.type != "student" ? (
        <div>
          <Sidebar />
        </div>
      ) : null}
      <div className="headerBase">
        <Burger />
        <div className="headerAlign">
          <a className="aHeader" onClick={() => redirect("/config")}>
            Minhas Informações
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
