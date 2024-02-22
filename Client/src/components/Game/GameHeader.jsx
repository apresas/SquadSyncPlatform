import React, { useState, useEffect } from "react";
import "./gameHeader.css";

function GameHeader({currentGame, homeTeam, awayTeam, gameScore}) {
  // console.log(currentGame);
  return (
    <section className="gameSummary_header">
      <div className="homeTeam">
        <img src={homeTeam.logo} alt="Home Logo" />
        <div className="gameSummary_header_home_info">
          <small>{homeTeam.mascotName}</small>
          <h3>{homeTeam.schoolName}</h3>
          <small>12-4-1</small>
        </div>
      </div>
      <div className="header_result">
        <h1 className="header_home_score">{gameScore.homeScore}</h1>
        <h3 className="gameSummary_header_time">Final</h3>
        <h1 className="header_away_score">{gameScore.awayScore}</h1>
      </div>
      <div className="awayTeam">
        <div className="gameSummary_header_away_info">
          <small>{awayTeam.mascotName}</small>
          <h3>{awayTeam.schoolName}</h3>
          <small>10-5-2</small>
        </div>
        <img src={awayTeam.logo} alt="Away Logo" />
      </div>
    </section>
  );
}

export default GameHeader;
