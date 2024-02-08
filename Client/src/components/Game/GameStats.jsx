import React from "react";
import "./gameStats.css";
import GameStatRow from './GameStatRow'
function GameStats() {
  return (
    <div className="gameStats_container">
      <div className="gameStats_header">
        <img src="../../src/assets/Logos/Xavier_logo.svg" alt="Home Logo" />
        <h2>Game Stats</h2>
        <img src="../../src/assets/Logos/Moeller_logo.svg" alt="Home Logo" />
      </div>
      <GameStatRow title="Shots on Goal" homeValue={33} awayValue={42}/>
      <GameStatRow title="Faceoff %" homeValue={45.8} awayValue={54.2}/>
      <GameStatRow title="Powerplay %" homeValue={14.3} awayValue={25} />
      <GameStatRow title="Penalty Minutes" homeValue={30} awayValue={36}/>
      <GameStatRow title="Hits" homeValue={14} awayValue={11}/>
      <GameStatRow title="Blocked Shots" homeValue={9} awayValue={11}/>
      <GameStatRow title="Giveaways" homeValue={12} awayValue={13}/>
      <GameStatRow title="Takeaways" homeValue={6} awayValue={7}/>
    </div>
  );
}

export default GameStats;
