import React from "react";
import './gameStatRow.css'

function GameStatRow({title, homeValue, awayValue, homeColor, awayColor}) {
    const awayAverage = (awayValue/(homeValue + awayValue))*100
    const homeAverage = (homeValue/(awayValue + homeValue))*100

  return (
    <div className="gameStat_row">
      <div className="stat_info">
        <h2>{homeValue}</h2>
        <p>{title}</p>
        <h2>{awayValue}</h2>
      </div>
      <div className="stat_bar">
        <span className="home_bar" style={{width: `${homeAverage}%`, backgroundColor: `${homeColor}`}}/>
        <span className="away_bar" style={{width: `${awayAverage}%`, backgroundColor: `${awayColor}`}}/>
      </div>
    </div>
  );
}

export default GameStatRow;
