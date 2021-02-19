import React from "react";
import Logo from "../../images/logo.png";
import { Link, useHistory } from "react-router-dom";
import Rocket from "../../images/rocket.svg";
import Lesson from "../../images/lesson.svg";
import Data from "../../images/data.svg";
import SAMU from "../../images/logo-samu-home.png";
import UPA from "../../images/logo-upa-home.svg";
import "./Sobre.css";

export default function Aula() {
    return (
        <>
            <div className="headerHome">
                <div className="imgLogo">
                    <Link to="/dashboard">
                        <img id="logo" src={Logo}></img>
                    </Link>
                </div>
                <div className="btns">
                    <button className="btnLogin">
                        Entrar
                    </button>
                    <button className="btnCadastro">
                        Cadastre-se
                    </button>
                </div>
            </div>

            <div className="contentWave">
                <div className="textSobre">
                    <h1 className="TextWhite">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
                    <h3 className="textoPadrao">Morbi a semper arcu. Proin eu velit maximus, aliquet justo at, consequat risus. Donec ultrices ac quam in tristique. Aenean a facilisis felis. Phasellus leo libero, scelerisque eget bibendum nec, auctor et mi.</h3>
                </div>
                <img src={Rocket} className="image"/>
            </div>

            <div className="section">
                <img src={Lesson} className="image"/>
                <div className="textSobre">
                    <h1>Praesent pellentesque urna lectus!</h1>
                    <h3 className="textoPadrao" style={{color: "#25283D"}}>Morbi eros erat, posuere viverra nisi quis, commodo auctor ante. Donec fermentum semper leo sed volutpat. Praesent dignissim blandit justo, et tincidunt velit egestas at. Nulla mollis elit purus, eu gravida nisi cursus nec. Fusce condimentum velit ut neque auctor ultrices. Donec pretium magna vel aliquam ultricies.</h3>
                </div>
            </div>

            <div className="textCenter">
                <h1>ALGUNS DE NOSSOS CLIENTES</h1>
            </div>

            <div className="section">
                <img src={SAMU} className="logo"/>
                <img src={UPA} className="logo"/>
            </div>

            <div className="section plus">
                <div className="textSobre">
                    <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
                    <h3 className="textoPadrao" style={{color: "#25283D"}}>Morbi a semper arcu. Proin eu velit maximus, aliquet justo at, consequat risus. Donec ultrices ac quam in tristique. Aenean a facilisis felis. Phasellus leo libero, scelerisque eget bibendum nec, auctor et mi.</h3>
                </div>
                <img src={Data} className="image"/>
            </div>

            <div className="contentWaveBottom">
                <h1>Lorem ipsum dolor sit amet.</h1>
            </div>
        </>
    );
}