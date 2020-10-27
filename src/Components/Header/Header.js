import React from 'react';
import "./Header.css"
import Cards from "../Cards/Cards"
import Foto from "../../images/foto.jpg"

const Header = () => {
    return (
        <div className="headerContainer">
            <div className="HeaderElementsContainer">
                <label>Nome</label>
                <img src={Foto}></img>
            </div>
            <div className = 'Teste2'>
                
            </div>
        </div>
    )
}

export default Header;