import React from "react";
import "./Header.css";
import Foto from "../../images/foto.jpg";
import { useHistory } from "react-router-dom";

const Header = () => {
  let history = useHistory();

  function redirect(path) {
    history.push(path);
  }
  return (
    <div className="headerContainer">
      <div className="HeaderElementsContainer">
        <div className="LabelContainer">
          <label className="LabelHeader">Minha Conta</label>
          <a className="aHeader" onClick={() => redirect("/config")}>
            Configurações
          </a>
        </div>
        <img className="HeaderImg" src={Foto}></img>
      </div>
    </div>
  );
};

export default Header;
