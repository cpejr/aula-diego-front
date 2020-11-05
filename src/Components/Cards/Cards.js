import React from 'react';
import "./Cards.css"

const Cards = (props) => {
    return (
        <div className='cardsContainer' style = {{"backgroundImage":`linear-gradient(to right,${props.cardColor1},${props.cardColor2})`}} >
            <p style = {{fontSize: 14}}>
                Live {props.date}
            </p>
            <p style = {{fontSize: 34}}>
                {props.title}
            </p>
            <p style = {{fontSize: 16}}>
                Às {props.hour}
            </p>
        </div>
    )
}

export default Cards;