import React, { useState, useEffect } from "react";
import "./Infolive.css";
import Base from "../../Components/Base/Base";
import InfoIcon from '@material-ui/icons/Info';
import { useHistory } from "react-router-dom";
import Board from "../../Components/Board/Board"
import DATA from "./data"

export default function Infolive() {

  let history = useHistory()
  const [search, setSearch] = useState("");

  function redirect() {
    let path = '/listalive'
    history.push(path);
  }

  const button = <InfoIcon className="infoLive" onClick={() => {redirect()}}/>

  return (
    <Base>
      <div className="pageRoot">
        <div className="pageBody">
          <div className="pageContent">
            <h1>Lives</h1>
            <input placeholder="Pesquisar" onChange={e => setSearch(e.target.value)} />
            <Board search={search} data={DATA} labels={["Ocupação", "Data", "Pessoas na live"]} button={button} />
          </div>
        </div>
      </div>
    </Base>  
  )
}