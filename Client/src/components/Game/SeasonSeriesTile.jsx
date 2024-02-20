import React from "react";
import "./seasonSeriesTile.css";

function SeasonSeriesTile({homeScore, awayScore, homeTeam, awayTeam}) {
  return (
    <div className="seasonSeriesTile_container">
      <div className="tile_team_container">
        <div className="tile_team">
          <img src={homeTeam.logo} alt="Home Logo" />
          <h3>ST.X</h3>
        </div>
        <h3>{homeScore}</h3>
      </div>
      <div className="tile_team_container">
        <div className="tile_team">
          <img src={awayTeam.logo} alt="Home Logo" />
          <h3>MOE</h3>
        </div>
        <h3>{awayScore}</h3>
      </div>
      <div className="tile_team_info">
        <small>Final</small>
        <small>Date</small>
      </div>
    </div>
  );
}

export default SeasonSeriesTile;
