import React, { useEffect, useState } from "react";
import './gameStatRow.css'

function GameStatRow({title, homeValue, awayValue, homeColor, awayColor, percentage}) {
    const awayAverage = (awayValue/(homeValue + awayValue))*100
    const homeAverage = (homeValue/(awayValue + homeValue))*100

    const [homeRowValue, setHomeRowValue] = useState()
    const [awayRowValue, setAwayRowValue] = useState()

    useEffect(() => {
      if(percentage === true) {
        setHomeRowValue(homeValue + "%")
        setAwayRowValue(awayValue + "%")
      } else {
        setHomeRowValue(homeValue)
        setAwayRowValue(awayValue)
      }
    }, [homeValue, awayValue])

  return (
    <div className="gameStat_row">
      <div className="stat_info">
        <h2>{homeRowValue}</h2>
        <p>{title}</p>
        <h2>{awayRowValue}</h2>
      </div>
      <div className="stat_bar">
        <span className="home_bar" style={{width: `${homeAverage}%`, backgroundColor: `${homeColor}`}}/>
        <span className="away_bar" style={{width: `${awayAverage}%`, backgroundColor: `${awayColor}`}}/>
      </div>
    </div>
  );
}

export default GameStatRow;
