import React from 'react'

export default function LinhaTabelaAtividades(props) {
    return (
        <div style={{display: "flex", justifyContent: "space-between ", flex: 1}}>
            <p>{props.type}</p>
            <p>Módulo {props.module}</p>
            <p>{props.name}</p>
            <p>{props.date}</p>
            <p>{props.status}</p>
        </div>
    )
}
