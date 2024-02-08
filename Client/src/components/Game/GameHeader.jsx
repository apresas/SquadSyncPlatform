import React from "react";
import "./gameHeader.css";

function GameHeader() {
  return (
    <section className="gameSummary_header">
      <div className="homeTeam">
        <img src="" alt="Home Logo" />
        <div className="gameSummary_header_home_info">
          <small>mascotName</small>
          <h3>Home Team</h3>
          <small>0-0-0</small>
        </div>
      </div>
      <h3 className="gameSummary_header_time">Time</h3>
      <div className="awayTeam">
        <div className="gameSummary_header_home_info">
          <small>mascotName</small>
          <h3>Away Team</h3>
          <small>0-0-0</small>
        </div>
        <img src="" alt="Away Logo" />
      </div>
    </section>
  );
}

export default GameHeader;
