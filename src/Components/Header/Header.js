import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Burger from "../Burger/Burger";
import "./Header.css"
import Foto from "../../images/foto.jpg"
import {useHistory} from 'react-router-dom'

const Header = () => {
  let history = useHistory();

  function redirect(path){
    history.push(path)
  }
    return (
        <>
            <div className="Sidebar">
                <Sidebar />
            </div>
            <div className="headerContainer">
                <Burger />
                <div className="HeaderElementsContainer">
                    <div className="LabelContainer">
                        <label className="LabelHeader">Minha Conta</label>
                            <a className= "aHeader" onClick={()=>redirect('/config-aluno')}>Configurações</a>
                    </div>
                    <img className='HeaderImg'src={Foto}></img>
                </div>
            </div>
            
        </>
    )
}

export default Header;
