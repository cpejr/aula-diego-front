import React, { useState } from "react";
import "./Sidebar.css"
import Logo from "../../images/logo.png"
import Foto from "../../images/foto.jpg"

const Sidebar = (props) => {

    return (
        <div className="sidebarContainer">
            <div className = "logoContainer">
                <div className="imgContainer">
                    <img src = {Logo}></img>
                </div>
            </div>
            
            <div className = "sidebarPerfil">
                <img src={Foto} />
                <br></br>
                <label >Angeline Doe</label>
                <br></br>
            </div>
            
            <div className = "sidebarBody">
                <ul>
                    <li>Meus Cursos</li>
                    <li>Pontuação</li>
                    <li>Explore</li>
                    <li>Planos</li>
                    <li>Atividades</li>
                </ul>
                <div className = "sidebarButtonContainer">
                    <button className="sidebarButton">SAIR</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;