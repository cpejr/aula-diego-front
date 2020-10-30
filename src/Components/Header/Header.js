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
                <img src={Foto}></img>
            </div>
<<<<<<< HEAD
            <div className = 'Teste2'>
                <Cards title='Bombeiros' cardColor = '#DC6F85' date = '20/10/2020' hour = '20:00' />
            </div>
=======
>>>>>>> 785a501085ddcfdc0dedfed7fc393ff171d26842
        </div>
    )
}

export default Header;