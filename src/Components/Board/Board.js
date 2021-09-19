import React from "react"
import "./Board.css"

const Line = ({ values, button }) => {

    const renderButton = (button !== undefined ? true : false)

    return (
        <div className='LinhaBoard'>
            {values.map(item => {
                return (
                    <div className="tableCell">
                        <p>{item}</p>
                    </div>
                )
            })}
            {renderButton && <div className="tableButton">
                    {button}
                </div>
            }
        </div>
    )
}

const Labels = ({ values, button }) => {

    const renderButton = (button !== undefined ? true : false)

    return (
        <div className='LinhaBoard'>
            {values.map(item => {
                return (
                    <div className="tableTitle">
                        <p>{item}</p>
                    </div>
                )
            })}
            {renderButton && <div className="tableTitleButton">
                    {button}
                </div>
            }
        </div>
    )
}


const Board = ({ search, data, labels, button }) => {
    const filtered = data.filter(object => {
        const values = Object.values(object);

        return values.toString().toLowerCase().indexOf(search) !== -1
    })

    const Lista = filtered.map(item => {
        const values = Object.values(item)
        return (
            <Line key={values[0]} values={values} button={button}/>
        )
    });

    return (
        <div className="BoardContainer">
            <Labels key={0} values={labels} button={button} />
            {Lista}
        </div>
    )
}

export default Board