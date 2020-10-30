import React, { useState, useEffect } from 'react';
import './tempoLive.css'

const TempoLive = (props) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tempoLive">
      <div className="paginaTempoLive">
        <div className="blocoTempoLive">
          <div className="tituloTempoLive">
            <p>Live Marketing Digital 20/10</p>
            <p style={{marginTop: "5%" }}>Tempo que você está em Live: {seconds} segundos</p>
          </div>
          <div className="acessarTempoLive">
            <button className="buttonTempoLive" onClick={props.handleToggle}>Certificar Live</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempoLive;
