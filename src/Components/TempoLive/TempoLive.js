import React, { useState, useEffect } from 'react';
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
    <div className="timer">
      <p>Tempo que você está em Live: {seconds} segundos</p>
    </div>
  );
};

export default TempoLive;
