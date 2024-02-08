import React from "react";
import './seasonSeries.css'
import SeasonSeriesTiles from "./SeasonSeriesTile"

function seasonSeries() {
  return (
    <div className="seasonSeries_container">
      <section className="seasonSeries_header">
        <h2>Season Series</h2>
        <small>AWY 0-0</small>
      </section>
      <section className="seasonSeries_tile_grid">
        <SeasonSeriesTiles />
        <SeasonSeriesTiles />
      </section>
    </div>
  );
}

export default seasonSeries;
