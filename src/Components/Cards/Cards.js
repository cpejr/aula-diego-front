import React from 'react';
import "./Cards.css"

const Cards = ({cardColor,title,hour,date}) => {
    return (
        <div className='cardsContainer' style = {{backgroundColor: cardColor}} >
            <p style = {{fontSize: 14}}>
                Live {date}
            </p>
            <p style = {{fontSize: 34}}>
                {title}
            </p>
            <p style = {{fontSize: 16}}>
                Às {hour}
            </p>
        </div>
    )
}

export default Cards;