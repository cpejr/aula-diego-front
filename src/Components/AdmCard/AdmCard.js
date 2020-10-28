import React from 'react'
import './AdmCard.css'


export default function AdmCard() {
    return (
        <div className='AdmCardsContainer' onClick={()=>alert('Especifique os dados')}>
            <p style = {{fontSize: 24,marginBottom:0}}>
                Adicionar Nova Live
            </p>
            <h1 style = {{fontSize: 120,fontWeight:700,paddingTop:-5}} > + </h1>
        </div>
    )
}
