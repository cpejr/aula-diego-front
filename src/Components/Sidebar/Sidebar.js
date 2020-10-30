import React from "react";
import "./Sidebar.css"
import Logo from "../../images/logo.png"
import Foto from "../../images/foto.jpg"
import {Link,useHistory} from 'react-router-dom'



const Sidebar = () => {

    const history = useHistory();

    const routeChange = () =>{ 
      let path = `/`; 
      history.push(path);
    }


    return (
        <div className="sidebarContainer">
            <div className = "logoContainer">
                <div className="imgContainer">
                    <Link to='/dashboard'>
                    <img src = {Logo}></img>
                    </Link>
                    
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
                    <button className="sidebarButton" onClick={routeChange}>SAIR</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;