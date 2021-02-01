import React, { useState, useEffect } from "react";
import "./Infolive.css";
import Base from "../../Components/Base/Base";
import InfoIcon from '@material-ui/icons/Info';
import { useHistory } from "react-router-dom";
import DATA from "./data"

function LinhaListaTurmas(props) {
     
  const [pin,setPin]=useState(true);

  function removeLine(id){
      setPin(!pin)
      
  }

return (

 
  pin ?
 <div className="LinhaListaTurmas">
    <p>{props.ocupacao}</p>
    <p>{props.data}</p>
    <p style={{ marginLeft:90 }} >{props.qntd}</p>
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
  const [search, setSearch] = useState("");

  function redirect() {
    let path = '/listalive'
    history.push(path);
  }
    
    function redirect(){
        let path = '/listalive'
        history.push(path);
    } 
  
    return (
      <Base>
        <div className="ListaTurmasContainer">
          <div className="ListaTurmasContent">
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                height: "30vh",
              }}
            >
              <h1 className="ListaTurmasTtitle">Lives</h1>
            </div>
            <div className="ListaTurmasLabelContainer">
              <p className="ListaTurmasLabel">Curso</p>
              <p className="ListaTurmasLabel">Data</p>
              <p className="ListaTurmasLabel">Quantidade de Alunos</p>
            </div>
    
            <div className="ListaTurmasDataContainer">
              {DATA.map((item) => {
                return (
                  <LinhaListaTurmas
                    id={item.codigo}
                    ocupacao={item.ocupacao}
                    data={item.data}
                    qntd={item.qntd}
                    redirect={redirect}
                  />
                );
              })}*/
            </div>
          </div>
        </div>
      </Base>
    );
  }
  