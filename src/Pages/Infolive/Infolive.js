import React, { useState, useEffect } from "react";
import "./Infolive.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import InfoIcon from '@material-ui/icons/Info';
import { useHistory } from "react-router-dom";
import Board from "../../Components/Board/Board"
import DATA from "./data"

function LinhaListaTurmas(props) {

  const [pin, setPin] = useState(true);

  function removeLine(id) {
    setPin(!pin)

  }

  return (

    pin ?
      <div className="LinhaListaTurmas">
        <p>{props.ocupacao}</p>
        <p>{props.data}</p>
        <p style={{ marginLeft: 90 }} >{props.qntd}</p>
        <div className="LinhaListaTurmasIcons">
          <InfoIcon
            style={{ marginRight: 20, fontSize: 40, color: "#9F9F9F" }}
            onClick={props.redirect}
          />

        </div>
      </div>

      :
      <div></div>
  );
}

export default function Infolive() {

  let history = useHistory()
  function redirect() {
    let path = '/listalive'
    history.push(path);
  }

  const [search, setSearch] = useState("");
    
  return (
      <div className="pageRoot">
          {/* <Sidebar /> */}
          <div className="pageBody">
              <Header />
              <div className="pageContent">
                  <h1>Lives</h1>
                  <input placeholder="Pesquisar" onChange={e => setSearch(e.target.value)}/>
                  <Board search={search} data={DATA} labels={["Ocupação", "Data", "Pessoas na live"]} />
              </div>
          </div>
      </div>
  )
}
