import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import TempoLive from "../../Components/TempoLive/TempoLive.js";
import ConfirmacaoLive from "../../Components/ConfirmacaoLive/ConfirmacaoLive"
import LiveFinal from '../../Components/LiveFinal/LiveFinal'
import VideoFrame from '../../Components/VideoFrame/VideoFrame'
import "./Live.css";

const Live = () => {

  let url = '2-XVG6Vg8_o'

  const [toggleViewInfo, setToggleViewInfo] = useState(true)
  const [toggleViewVideo, setToggleViewVideo] = useState(false)
  const [toggleView3, setToggleView3] = useState(false)


  function handleToggle() {
    setToggleViewInfo(false)
    setToggleViewVideo(true)
  }

  /* function handleToggle2() {
    setToggleView2(!toggleView2)
  }

  function handleToggle3() {
    setToggleView3(!toggleView3)
  } */


  return (
    <>
    <Header />
    <div className="Live">
      <div className="paginaLive">
        <Header />
        <div className="blocoLive">
          <div className="tituloLive">
            <p>Live Marketing Digital 20/10</p>
          </div>
          {toggleViewInfo && <div className="acessarLive">
              <button className="buttonAccessLive" onClick={handleToggle}>ACESSAR</button>
          </div>}
          {toggleViewVideo && <div className="videoFrame">
              <VideoFrame url={'https://www.youtube.com/embed/' + String(url)} />
          </div>}
        </div>
        {toggleViewVideo && <div className="certificateWrapper">
          <TempoLive />
          <button className="buttonCertificateLive">Certificar Live</button>
        </div>}
      </div>
    </div>
    </>
  );
};

export default Live;
