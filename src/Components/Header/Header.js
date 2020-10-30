import React from 'react';
import "./Header.css"
import Cards from "../Cards/Cards"
import Foto from "../../images/foto.jpg"

const Header = () => {
    return (
        <div className="headerContainer">
            <div className="HeaderElementsContainer">
                <div className="LabelContainer">
                <label>Minha Conta</label>
                <label>Configurações</label>
                </div>
                <img className='HeaderImg'src={Foto}></img>
            </div>
        </div>
    )
}

export default Header;