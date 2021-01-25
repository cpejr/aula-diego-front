import React, { useState, useEffect } from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import './TempoLive.css'


const TempoLive = (props) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="blocoTempoLive">
      <div className="timer">
        <p style={{marginTop: "5%" }}>Tempo que você está em Live: {seconds} segundos</p>
      </div>
      <div className="acessarTempoLive">
        <button className="buttonTempoLive" onClick={props.handleToggle}>Certificar Live</button>
      </div>
    </div>
  );
};

export default TempoLive;
