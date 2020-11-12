import React from 'react'

export default function LinhaTabelaNovaTurma(props) {
    return (
        <div>
            <p>{props.name}</p>
            <p>{props.registration}</p>
            <p>{props.occupation}</p>
        </div>
    )
}
