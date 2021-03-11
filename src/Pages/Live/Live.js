import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSession } from "../../Context/SessionContext";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { message } from "antd";
import TempoLive from "../../Components/TempoLive/TempoLive.js";
import ConfirmacaoLive from "../../Components/ConfirmacaoLive/ConfirmacaoLive"
import LiveFinal from '../../Components/LiveFinal/LiveFinal'
import VideoFrame from '../../Components/VideoFrame/VideoFrame'
import "./Live.css";

const Live = (props) => {
  const [toggleViewInfo, setToggleViewInfo] = useState(true);
  const [toggleViewVideo, setToggleViewVideo] = useState(false);
  const [toggleView3, setToggleView3] = useState(false);

  function handleToggle() {
    setToggleViewInfo(false);
    setToggleViewVideo(true);
  }

  const { session } = useSession();
  const [liveData, setLiveData] = useState();
  const { id } = props.match.params;
  
  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    api
      .get(`/live/${id}`, config)
      .then((response) => {
        setLiveData(response.data);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados da live");
      });
  }, []);

  function dateFormate(){	
    var data = new Date(liveData && liveData.date);
    return data.toLocaleDateString([], {dateStyle: 'short'}) + ' ' + data.toLocaleTimeString([], {timeStyle: 'short'});
  }

  function formatLink(){
    let url = liveData && liveData.link;
    var shortlink = url.split("=");

    return shortlink[1];
  }

  return (
    <Base>
      <div className="root">
        <div className="paginaLive">
          <div className="blocoLive">
            <div className="tituloLive">
              <p>{liveData && liveData.name}, {dateFormate()}</p>
            </div>
            {toggleViewInfo && <div className="acessarLive">
              <button className="buttonAccessLive" onClick={handleToggle}>ACESSAR</button>
            </div>}
            {toggleViewVideo && <div className="videoFrame">
              <VideoFrame url={'https://www.youtube.com/embed/' + String(formatLink())} />
              <h5 className="liveDescription">{liveData && liveData.description}</h5>
            </div>}
          </div>
          {toggleViewVideo && <div className="certificateWrapper">
            <TempoLive />
            <button className="buttonCertificateLive">Certificar Live</button>
          </div>}
        </div>
      </div>
    </Base>
  );
};

export default Live;