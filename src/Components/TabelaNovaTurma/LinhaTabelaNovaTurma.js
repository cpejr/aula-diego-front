import React from 'react'
import "./TabelaNovaTurma.css";

export default function LinhaTabelaNovaTurma(props) {
    return (
        <div className="LinhaTabelaNovaTurma">
            <p>{props.name}</p>
            <p>{props.registration}</p>
            <p>{props.occupation}</p>
        </div>
    )
}