import React,{useState} from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import TempoLive from "../../Components/TempoLive/TempoLive.js";
import ConfirmacaoLive from "../../Components/ConfirmacaoLive/ConfirmacaoLive"
import LiveFinal from '../../Components/LiveFinal/LiveFinal'
import "./Live.css";

const Live = () => {

  const [toggleView,setToggleView]=useState(true)
  const [toggleView2,setToggleView2]=useState(true)
  const [toggleView3,setToggleView3]=useState(true)


  function handleToggle(){
      setToggleView(!toggleView)
  }

  function handleToggle2(){
    setToggleView2(!toggleView2)
  }

  function handleToggle3(){
    setToggleView3(!toggleView3)
  }


  return (
    <>
    <Header />
    <div className="Live">
      <div className="paginaLive">
      { toggleView && <div className="blocoLive">
          <div className="tituloLive">
            <p>Live Marketing Digital 20/10</p>
            <p style={{fontSize: "x-large"}}>Se inicia às 20h</p>
          </div>
          <div className="acessarLive">
            <button className="buttonLive" onClick={handleToggle}>ACESSAR</button>
          </div> 
        </div>}
        {!toggleView && toggleView2 && <TempoLive handleToggle={handleToggle2}/>}
        {!toggleView2 && toggleView3 &&<ConfirmacaoLive handleToggle={handleToggle3}/>}
       {!toggleView3 && <LiveFinal/>}
      </div>
    </div>
    </>
  );
};

export default Live;
