import React, { useState, useEffect } from "react";

function TestGameItem({ data, teamData }) {
const [homeLogo, setHomeLogo] = useState()
const [awayLogo, setAwayLogo] = useState()

useEffect(() => {
  {teamData.map((team) => {
    if(team.teamID === data.homeID) {
      setHomeLogo(team.logo)
    } else if (team.teamID === data.awayID) {
      setAwayLogo(team.logo)
    }
  })}
}, [data])

  return (
    <div className="test_game_item">
      <div className="test_awayteam">
        <img src={awayLogo} alt="logo" />
        <h3>{data.awayTeam}</h3>
      </div>
      <span>@</span>
      <div className="test_hometeam">
        <h3>{data.homeTeam}</h3>
        <img src={homeLogo} alt="logo" />
      </div>
      <p className="test_date">{data.arena}</p>
      <p className="test_time">{data.time}</p>
      <p className="test_score">
        {data.awayScore} - {data.homeScore}
      </p>
    </div>
  );
}

export default TestGameItem;
