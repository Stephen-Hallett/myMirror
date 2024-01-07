import React from 'react'

const PortfolioTotalApp = ({mostRecent, change}) => {
    let num = parseInt(mostRecent, 10)
    return(
        <>
            <div className="portfolioTotal">${num.toLocaleString()}</div>
                {(change >= 0) ? (
                    <>
                    <div className="changeIcon" style={{color: "#90EF90"}}>
                        <i class="fa-solid fa-caret-up"></i>
                    </div> 
                    <div className="portfolioChange" style={{color: "#90EF90"}}>{change}</div> 
                    </>
                ) : (
                    <>
                    <div className="changeIcon" style={{color: "#FA6B84"}}>
                        <i class="fa-solid fa-caret-down"></i>
                    </div>
                    <div className="portfolioChange" style={{color: "#FA6B84"}}>{change}</div> 
                    </>
                )}        
        </>
    )
}

export default PortfolioTotalApp
