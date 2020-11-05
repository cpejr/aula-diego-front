import React from 'react'
import "./TabelaAtividades.css"

export default function LinhaTabelaAtividades(props) {
    return (
        <div className='LinhaTabelaAtividades'>
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
