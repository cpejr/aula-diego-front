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
                <Cards title='Bombeiros' cardColor = '#DC6F85' date = '20/10/2020' hour = '20:00' />
            </div>
        </div>
    )
}

export default Header;