import React from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/Logo2.png";
import { Link } from "react-router-dom";
import { BulbOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import Rocket from "../../images/rocket.svg";
import Lesson from "../../images/lesson.svg";
import Data from "../../images/data.svg";
import SAMU from "../../images/logo-samu-home.png";
import UPA from "../../images/logo-upa-home.svg";
import "./Sobre.css";

export default function Aula() {
    /*const nightModeStorage = localStorage.getItem('gmtNightMode');
    const nightMode = document.querySelector('#darkMode');

    if (nightModeStorage) {
        document.documentElement.classList.add('darkMode');
        nightMode.checked = true;
    }

    nightMode.addEventListener('click', () => {
        document.documentElement.classList.toggle('darkMode');
        if (document.documentElement.classList.contains('darkMode')) {
            localStorage.setItem('gmtNightMode', true);
            return
        }
        localStorage.removeItem('gmtNightMode');
    });*/

    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css"></link>
            <div className="body">
                <div className="headerHome">
                    <div className="imgLogo">
                        <Link to="/dashboard">
                            <img id="logo" src={Logo}></img>
                        </Link>
                        <Link to="/dashboard">
                            <img id="logodark" src={LogoDark}></img>    
                        </Link>
                    </div>
                    <div className="btns">
                        <Link to="/login">
                            <button className="btnLogin">
                                Entrar
                            </button>
                        </Link>
                        <Link to="/cadastro">
                            <button className="btnCadastro" route="/cadastro">
                                Cadastre-se
                            </button>
                        </Link>
                        <div className="switch">
                            <BulbOutlined color="#23282D" />
                            <Switch size="small" className="lamp" id="darkMode" />
                        </div>
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
                        <h1 className="TextBlack">Praesent pellentesque urna lectus!</h1>
                        <h3 className="textoPadraoBlack">Morbi eros erat, posuere viverra nisi quis, commodo auctor ante. Donec fermentum semper leo sed volutpat. Praesent dignissim blandit justo, et tincidunt velit egestas at. Nulla mollis elit purus, eu gravida nisi cursus nec. Fusce condimentum velit ut neque auctor ultrices. Donec pretium magna vel aliquam ultricies.</h3>
                    </div>
                </div>

                <div className="textCenter">
                    <h1 className="TextBlack">ALGUNS DE NOSSOS CLIENTES</h1>
                </div>

                <div className="section" style={{justifyContent: "center"}}>
                    <img src={SAMU} className="parcerias" style={{paddingRight: "5vw"}}/>
                    <img src={UPA} className="parcerias"/>
                </div>

                <div className="section plus">
                    <div className="textSobre">
                        <h1 className="TextBlack">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
                        <h3 className="textoPadraoBlack">Morbi a semper arcu. Proin eu velit maximus, aliquet justo at, consequat risus. Donec ultrices ac quam in tristique. Aenean a facilisis felis. Phasellus leo libero, scelerisque eget bibendum nec, auctor et mi.</h3>
                    </div>
                    <img src={Data} className="image"/>
                </div>
            
                <div className="contentWaveBottom">
                    <h1 className="TextBlack">Lorem ipsum dolor sit amet.</h1>
                </div>
            </div>

            <div className="footer">
                <h6 className="TextWhite">© 2021 Consultoria e Projetos Elétricos Júnior. Todos os direitos reservados.</h6>
            </div>

            <a class="whatsapp-link" href="https://web.whatsapp.com/send?phone=5599111112222" target="_blank">
		        <i class="fa fa-whatsapp"></i>
	        </a>
        </>
    );
}