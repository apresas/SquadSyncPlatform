import React from "react";
import './seasonSeries.css'
import SeasonSeriesTiles from "./SeasonSeriesTile"

function seasonSeries() {
  return (
    <div className="seasonSeries_container">
      <section className="seasonSeries_header">
        <h2>Season Series</h2>
        <small>TIE 1-1</small>
      </section>
      <section className="seasonSeries_tile_grid">
        <SeasonSeriesTiles homeScore={4} awayScore={2}/>
        <SeasonSeriesTiles homeScore={2} awayScore={5}/>
      </section>
    </div>
  );
}

export default seasonSeries;
