import React, { useState, useEffect } from "react";
import './seasonSeries.css'
import SeasonSeriesTiles from "./SeasonSeriesTile"
import axios from "axios";

function seasonSeries({currentGame, homeTeam, awayTeam}) {

  return (
    <div className="seasonSeries_container">
      <section className="seasonSeries_header">
        <h2>Season Series</h2>
        <small>TIE 1-1</small>
      </section>
      <section className="seasonSeries_tile_grid">
        <SeasonSeriesTiles homeScore={4} awayScore={2} homeTeam={homeTeam} awayTeam={awayTeam}/>
        <SeasonSeriesTiles homeScore={2} awayScore={5}  homeTeam={homeTeam} awayTeam={awayTeam}/>
      </section>
    </div>
  );
}

export default seasonSeries;
