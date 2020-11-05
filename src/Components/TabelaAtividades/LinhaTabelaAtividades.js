import React from 'react'
import "./TabelaAtividades.css"

export default function LinhaTabelaAtividades(props) {
    return (
        <div style={{display: "grid", "grid-template-columns": "repeat(5, 15vw)", marginLeft: "3vw", gridColumnGap: "10px", borderBottom: "1px #efefef", marginBottom: "3vh", color: "grey"}}>
            <p>{props.type}</p>
            <p>Módulo {props.module}</p>
            <p>{props.name}</p>
            <p>{props.date}</p>
            {!props.status && <div className="statusPendente">
                <p>Pendente</p>
            </div>}
            {props.status && <div className="statusFinalizado">
                <p>Finalizado</p>
            </div>}
        </div>
    )
}
