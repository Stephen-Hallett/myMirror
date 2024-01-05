import React from 'react'

const DatetimeApp = ({date, time}) => {
    return(
        <>
        <div className="time">{time}</div>
        <div className="date">{date}</div>
        </>
    )
}

export default DatetimeApp
