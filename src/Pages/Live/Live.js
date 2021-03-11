import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import TempoLive from "../../Components/TempoLive/TempoLive.js";
import VideoFrame from '../../Components/VideoFrame/VideoFrame'
import { useSession } from "../../Context/SessionContext";
import "./Live.css";

export default function Live(props) {

  const [live, setLive] = useState([])
  const [url, setUrl] = useState("")
  const [toggleViewInfo, setToggleViewInfo] = useState(true)
  const [toggleViewVideo, setToggleViewVideo] = useState(false)
  const [toggleView3, setToggleView3] = useState(false)

  const { session } = useSession();
  const { id } = props.match.params;

  function handleToggle() {
    setToggleViewInfo(false)
    setToggleViewVideo(true)
  }

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    query: {
      course_id: id,
    }
  };

  useEffect(() => {
    api
      .get(`/live/${id}`, config)
      .then((response) => {
        setLive(response.data);
        setUrl(response.data.link.match(/(?<=\?v=).+/g));
      })
      .catch((err) => {
      });
  }, []);

  return (
    <Base>
      <div className="root">
        <div className="paginaLive">
          <div className="blocoLive">
            <div className="tituloLive">
              <p>{live.name}</p>
            </div>
            {toggleViewInfo && <div className="acessarLive">
              <button className="buttonAccessLive" onClick={handleToggle}>ACESSAR</button>
            </div>}
            {toggleViewVideo && <div className="videoFrame">
              <VideoFrame url={'https://www.youtube.com/embed/' + url} />
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
}