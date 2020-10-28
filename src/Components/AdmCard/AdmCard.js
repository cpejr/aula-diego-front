import React from 'react'
import './AdmCard.css'
import AddIcon from '@material-ui/icons/Add';

export default function AdmCard() {
    return (
        <div className='AdmCardsContainer' >
            <p style = {{fontSize: 24}}>
                Adicionar Nova Live
            </p>
            <AddIcon style={{fontSize:150}}/>
        </div>
    )
}
