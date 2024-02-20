import React from "react";
import "./gameStats.css";
import GameStatRow from './GameStatRow'
function GameStats({currentGame, homeTeam, awayTeam}) {
  // console.log(homeTeam)
  return (
    <div className="gameStats_container">
      <div className="gameStats_header">
        <img src={homeTeam.logo} alt="Home Logo" />
        <h2>Game Stats</h2>
        <img src={awayTeam.logo} alt="Home Logo" />
      </div>
      <GameStatRow title="Shots on Goal" homeValue={33} awayValue={42} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor}/>
      <GameStatRow title="Faceoff %" homeValue={45.8} awayValue={54.2} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor}/>
      <GameStatRow title="Powerplay %" homeValue={14.3} awayValue={25} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor}/>
      <GameStatRow title="Penalty Minutes" homeValue={30} awayValue={36} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor}/>
      <GameStatRow title="Hits" homeValue={14} awayValue={11} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor}/>
      <GameStatRow title="Blocked Shots" homeValue={9} awayValue={11} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor}/>
      <GameStatRow title="Giveaways" homeValue={12} awayValue={13} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor}/>
      <GameStatRow title="Takeaways" homeValue={6} awayValue={7} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor}/>
    </div>
  );
}

export default GameStats;
