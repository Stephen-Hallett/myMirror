import React from 'react'

const CaloriesApp = ({calories}) => {
    return(
        <>
        <div className="calorieContainer">
            <i class="fa-solid fa-utensils calorieIcon"></i>
            <div className="calories">{calories} Kcal</div>
        </div>
        </>
    )
}

export default CaloriesApp
