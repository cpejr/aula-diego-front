import React,{useState} from "react";
import "./TabelaPresenca.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export default function LinhaTabelaPresenca(props) {
    const [select,setSelect] = useState(false)


  return (
    <div className="LinhaTabelaPresenca">
      <div className="IconeLiveInfo">
        {props.present &&<FiberManualRecordIcon style={{color: "green"}} />}
        {!props.present && <FiberManualRecordIcon style={{color: "red"}} />}
        <p>{props.name}</p>
      </div>
      <p>{props.matricula}</p>
      <p>{props.horaOn}</p>
      {/* <p>{props.horaOff}</p> */}
    </div>
  );
}
