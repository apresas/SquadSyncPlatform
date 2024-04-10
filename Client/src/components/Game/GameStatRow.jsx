import React, { useEffect, useState } from "react";
import './gameStatRow.css'

function GameStatRow({title, homeValue, awayValue, homeColor, awayColor, percentage}) {
  let awayAverage = ((awayValue/(homeValue + awayValue))*100)
  let homeAverage = ((homeValue/(awayValue + homeValue))*100) 
  // const [awayAverage, setAwayAverage] = useState();
  // const [homeAverage, setHomeAverage] = useState();

    const [homeRowValue, setHomeRowValue] = useState()
    const [awayRowValue, setAwayRowValue] = useState()

    const getAverages = (homeValue, awayValue) => {
      setAwayAverage((awayValue/(homeValue + awayValue))*100)
      setHomeAverage((homeValue/(awayValue + homeValue))*100)
      // console.log(`home value: ${homeValue} away value:${awayValue}`)
      // console.log(`home: ${homeAverage} away:${awayAverage}`)
    }


    useEffect(() => {
      // console.log(`home: ${homeAverage} away:${awayAverage}`)
      if(percentage === true) {
        setHomeRowValue(homeValue + "%")
        setAwayRowValue(awayValue + "%")
      } else {
        setHomeRowValue(homeValue)
        setAwayRowValue(awayValue)
      }
      // getAverages(homeValue, awayValue)
    }, [homeValue, awayValue])

    useEffect(()=> {
      // console.log(`home: ${homeRowValue} away:${awayRowValue}`)
      // getAverages(homeRowValue, awayRowValue)
    }, [homeRowValue, awayRowValue])


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
