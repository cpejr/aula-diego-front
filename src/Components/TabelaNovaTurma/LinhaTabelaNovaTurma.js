import React,{useState} from "react";
import "./TabelaNovaTurma.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

export default function LinhaTabelaNovaTurma(props) {
    const [select,setSelect] = useState(false)


  return (
    <div className="LinhaTabelaNovaTurma">
      <div className="IconeNovaTurma">
        {select && <CheckCircleIcon onClick={()=> setSelect(!select)} />}
        {!select && <RadioButtonUncheckedIcon onClick={()=> setSelect(!select)}/>}
        <p>{props.name}</p>
      </div>
      <p>{props.registration}</p>
      <p>{props.occupation}</p>
    </div>
  );
}
