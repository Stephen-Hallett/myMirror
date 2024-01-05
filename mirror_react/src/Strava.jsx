import React from 'react'

const StravaApp = ({stravaData}) => {
    return(
        <>
        <div className="running">
            <div className="runBig">
                <div className="calIcon"><i class="fa-regular fa-calendar"></i></div>
                <div className="ytd_run">{stravaData.ytd_distance.toFixed(1) + "Km"}</div>
            </div>
            <div className="runSmall">
                <div className="runIcon"><i class="fa-solid fa-person-running"></i></div>
                <div className="total_run">{stravaData.total_distance.toFixed(1) + "Km"}</div>
            </div>
        </div>
        </>
    )
}

export default StravaApp;
