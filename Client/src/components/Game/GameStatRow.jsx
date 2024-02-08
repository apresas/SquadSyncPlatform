import React from "react";
import './gameStatRow.css'

function GameStatRow({title, homeValue, awayValue}) {
    const awayAverage = (homeValue/(homeValue + awayValue))*100
    const homeAverage = (awayValue/(awayValue + homeValue))*100
  return (
    <div className="gameStat_row">
      <div className="stat_info">
        <h2>{homeValue}</h2>
        <p>{title}</p>
        <h2>{awayValue}</h2>
      </div>
      <div className="stat_bar">
        <span className="home_bar" style={{width: `${homeAverage}%`}}/>
        <span className="away_bar" style={{width: `${awayAverage}%`}}/>
      </div>
    </div>
  );
}

export default GameStatRow;
