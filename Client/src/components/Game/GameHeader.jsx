import React from "react";
import "./gameHeader.css";

function GameHeader() {
  return (
    <section className="gameSummary_header">
      <div className="homeTeam">
        <img src="../../src/assets/Logos/Xavier_logo.svg" alt="Home Logo" />
        <div className="gameSummary_header_home_info">
          <small>Bombers</small>
          <h3>St.Xavier</h3>
          <small>12-4-1</small>
        </div>
      </div>
      <div className="header_result">
        <h1 className="header_home_score">2</h1>
        <h3 className="gameSummary_header_time">Final</h3>
        <h1 className="header_away_score">5</h1>
      </div>
      <div className="awayTeam">
        <div className="gameSummary_header_away_info">
          <small>Crusaders</small>
          <h3>Archbishop Moeller</h3>
          <small>10-5-2</small>
        </div>
        <img src="../../src/assets/Logos/Moeller_logo.svg" alt="Home Logo" />
      </div>
    </section>
  );
}

export default GameHeader;
