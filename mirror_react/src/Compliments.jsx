import React from 'react'

const ComplimentsApp = ({compliment}) => {
    const compliment_style = {
        animation: 'fade 30s infinite',
    }
    return(
        <>
        <div className="compliment"style={compliment_style}>{compliment}</div>
        </>
    )
}

export default ComplimentsApp
