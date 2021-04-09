import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import TempoLive from "../../Components/TempoLive/TempoLive.js";
import VideoFrame from "../../Components/VideoFrame/VideoFrame";
import { useSession } from "../../Context/SessionContext";
import "./Live.css";
import { message } from "antd";
import { Modal, Input } from "antd";

export default function Live(props) {
  const history = useHistory();
  const [live, setLive] = useState([]);
  const [confirmation_code, setConfirmation_code] = useState("");
  const [toggleViewInfo, setToggleViewInfo] = useState(true);
  const [toggleViewVideo, setToggleViewVideo] = useState(false);
  const { session } = useSession();
  const { id } = props.match.params;

  function handleToggle() {
    setToggleViewInfo(false);
    setToggleViewVideo(true);
  }

  function dateFormate() {
    var data = new Date(live.date);
    return (
      data.toLocaleDateString([], { dateStyle: "long" }) +
      " às " +
      data.toLocaleTimeString([], { timeStyle: "short" })
    );
  }

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    console.log(session.user.id);

    api
      .get(`/live/${id}`, config)
      .then((response) => {
        setLive(response.data);
        if (session.user.type === "student") {
          api
            .get("/class_user", {
              ...config,
              params: {
                "class.course_id": response.data.course_id,
                "user_class.user_id": session.user.id,
              },
            })
            .then((response) => console.log(response.data))
            .catch((error) => {
              history.push("/");
              message.error("Você não tem permissão para assistir a essa live");
            });
        }
      })
      .catch((err) => {});
  }, []);

  function handleClick() {
    if (!confirmation_code)
      return alert("Código de confirmação não pode ser em branco");
    api
      .post(
        "/presence/live",
        {
          confirmation_code,
          user_id: session.user.id,
          live_id: props.match.params.id,
        },
        config
      )
      .then(() => message.success("Presença registrada com sucesso"))
      .catch(() => message.error("Não foi possível registrar presença"));
  }

  return (
    <Base>
      <div className="root">
        <div className="paginaLive">
          <div className="blocoLive">
            <div className="tituloLive">
              <p>
                {live.name}, {dateFormate()}
              </p>
            </div>
            {toggleViewInfo && (
              <div className="acessarLive">
                <button className="buttonAccessLive" onClick={handleToggle}>
                  ACESSAR
                </button>
              </div>
            )}
            {toggleViewVideo && (
              <div className="videoFrame">
                <VideoFrame
                  url={
                    "https://www.youtube.com/embed/" +
                    live.link.replace(/&.*/gi, "")
                  }
                />
              </div>
            )}
          </div>
          {toggleViewVideo && (
            <div className="certificateWrapper">
              <TempoLive />
              <Input
                placeholder="Código de confirmação"
                value={confirmation_code}
                onChange={(e) => setConfirmation_code(e.target.value)}
              />
              <button
                className="buttonCertificateLive"
                onClick={() => handleClick()}
              >
                Certificar Live
              </button>
            </div>
          )}
        </div>
      </div>
    </Base>
  );
}
