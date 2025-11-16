import React from 'react'

const StravaApp = ({stravaData}) => {
    return(
        <>
        <div className="icons">
            <div className="calIcon runBig"><i class="fa-regular fa-calendar"></i></div>
            <div className="runIcon runSmall"><i class="fa-solid fa-person-running"></i></div>
        </div>
        <div className="numbers">
            <div className="ytd_run runBig">{stravaData.ytd_distance.toFixed(1) + "Km"}</div>
            <div className="total_run runSmall">{stravaData.total_distance.toFixed(1) + "Km"}</div>
        </div>
        </>
    )
}

export default StravaApp;
