import React from 'react';
import "./Header.css"
import Foto from "../../images/foto.jpg"

const Header = () => {
    return (
        <div className="headerContainer">
            <div className="HeaderElementsContainer">
                <div className="LabelContainer">
                    <label className="LabelHeader">Minha Conta</label>
                    <a classNmae= "aHeader color-white" href='/config-aluno'>Configurações</a>
                </div>
                <img className='HeaderImg'src={Foto}></img>
            </div>
        </div>
    )
}

export default Header;
