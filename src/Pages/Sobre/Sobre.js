/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/Logo2.png";
import { Link } from "react-router-dom";
import Rocket from "../../images/rocket.svg";
import Lesson from "../../images/lesson.svg";
import Data from "../../images/data.svg";
import SAMU from "../../images/logo-samu-home.png";
import UPA from "../../images/logo-upa-home.svg";
import "./Sobre.css";

document.addEventListener("DOMContentLoaded", function (event) {
  document.documentElement.setAttribute("data-theme", "light");

  var themeSwitcher = document.getElementById("theme-switcher");
  if (themeSwitcher === null) {
    return;
  }
  themeSwitcher.onclick = function () {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var switchToTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", switchToTheme);

    if (currentTheme === "dark") {
      imglight();
    } else {
      imgdark();
    }
  };
});

const imgdark = () => {
  document.querySelector(".logodark").classList.remove("block");
  document.querySelector(".about-logo").classList.add("block");

  document
    .querySelector(".contentWave")
    .classList.replace("contentWave", "waveTopDark");
  document
    .querySelector(".contentWaveBottom")
    .classList.replace("contentWaveBottom", "waveBottomDark");
};

const imglight = () => {
  document.querySelector(".logodark").classList.add("block");
  document.querySelector(".about-logo").classList.remove("block");

  document
    .querySelector(".waveTopDark")
    .classList.replace("waveTopDark", "contentWave");
  document
    .querySelector(".waveBottomDark")
    .classList.replace("waveBottomDark", "contentWaveBottom");
};

export default function Sobre() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css"
      ></link>
      <div className="body">
        <div className="headerHome">
          <div className="imgLogo">
            <Link to="/dashboard">
              <img className="about-logo" src={Logo} alt="Logo da RecStudio"></img>
            </Link>
            <Link to="/dashboard">
              <img className="logodark block" src={LogoDark} alt="Logo da RecStudio"></img>
            </Link>
          </div>
          <div className="btns">
            <Link to="/login">
              <button className="btnLogin">Entrar</button>
            </Link>
            <Link to="/cadastro">
              <button className="btnCadastro" route="/cadastro">
                Cadastre-se
              </button>
            </Link>
            <div className="switch">
              <input type="checkbox" id="toggle_checkbox" />
              <label for="toggle_checkbox" id="theme-switcher">
                <div id="star">
                  <div class="star" id="star-1">
                    ★
                  </div>
                  <div class="star" id="star-2">
                    ★
                  </div>
                </div>
                <div id="moon"></div>
              </label>
              {/*<BulbOutlined className="lamp" color="#23282D" />
              <Switch size="small" id="theme-switcher" />*/}
            </div>
          </div>
        </div>
        <div className="contentWave">
          <div className="textSobre">
            <h1 className="TextWhite">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h1>
            <h3 className="textoPadrao">
              Morbi a semper arcu. Proin eu velit maximus, aliquet justo at,
              consequat risus. Donec ultrices ac quam in tristique. Aenean a
              facilisis felis. Phasellus leo libero, scelerisque eget bibendum
              nec, auctor et mi.
            </h3>
          </div>
          <img src={Rocket} className="image" alt="Ilustração de um foguete" />
        </div>

        <div className="section">
          <img src={Lesson} className="image" alt="Ilustração de um pessoa dando aula"/>
          <div className="textSobre">
            <h1 className="TextBlack">Praesent pellentesque urna lectus!</h1>
            <h3 className="textoPadraoBlack">
              Morbi eros erat, posuere viverra nisi quis, commodo auctor ante.
              Donec fermentum semper leo sed volutpat. Praesent dignissim
              blandit justo, et tincidunt velit egestas at. Nulla mollis elit
              purus, eu gravida nisi cursus nec. Fusce condimentum velit ut
              neque auctor ultrices. Donec pretium magna vel aliquam ultricies.
            </h3>
          </div>
        </div>

        <div className="textCenter">
          <h1 className="TextBlack">ALGUNS DE NOSSOS CLIENTES</h1>
        </div>

        <div className="section" style={{ justifyContent: "center" }}>
          <img
            src={SAMU}
            className="parcerias"
            style={{ paddingRight: "5vw" }}
            alt="Imagem do parceiro"
          />
          <img src={UPA} className="parcerias" alt="Imagem do parceiro"/>
        </div>

        <div className="section plus">
          <div className="textSobre">
            <h1 className="TextBlack">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h1>
            <h3 className="textoPadraoBlack">
              Morbi a semper arcu. Proin eu velit maximus, aliquet justo at,
              consequat risus. Donec ultrices ac quam in tristique. Aenean a
              facilisis felis. Phasellus leo libero, scelerisque eget bibendum
              nec, auctor et mi.
            </h3>
          </div>
          <img src={Data} className="image" alt="Ilustração de pessoas conversando"/>
        </div>
      </div>

      <div className="contentWaveBottom">
        <div className="textSobre">
          <h1 className="TextBlack">Lorem ipsum dolor sit amet.</h1>
        </div>
      </div>

      <div className="footer">
        <h6 className="TextWhite">
          © 2021 Consultoria e Projetos Elétricos Júnior. Todos os direitos
          reservados.
        </h6>
      </div>

      <a
        class="whatsapp-link"
        href="https://web.whatsapp.com/send?phone=5599111112222"
        target="_blank"
      >
        <i class="fa fa-whatsapp"></i>
      </a>
    </>
  );
}
