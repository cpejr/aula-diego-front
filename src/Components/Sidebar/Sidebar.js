import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../images/logoTeste.png";
import { useSession } from "../../Context/SessionContext";
import Foto from "../../images/foto.jpg";
import { Link, useHistory } from "react-router-dom";

export default function Sidebar() {
  const history = useHistory();
  const { handleLogout } = useSession();

  return (
    <div className="sidebarContainer">
      <div className="logoContainer">
        <div className="imgContainer">
          <Link to="/dashboard">
            <img src={Logo}></img>
          </Link>
        </div>
      </div>

      <div className="sidebarPerfil">
        <img src={Foto} />
        <br></br>
        <label>Angeline Doe</label>
        <br></br>
      </div>

      <div className="sidebarBody">
        <ul>
          <li>Meus Cursos</li>
          <li>Pontuação</li>
          <li>Explore</li>
          <li>Planos</li>
          <li>Atividades</li>
        </ul>
        <div className="sidebarButtonContainer">
          <button
            className="sidebarButton"
            onClick={() => {
              handleLogout();
              history.push("/");
            }}
          >
            SAIR
          </button>
        </div>
      </div>
    </div>
  );
}
