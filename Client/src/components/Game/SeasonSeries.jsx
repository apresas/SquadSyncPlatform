import React, { useState, useEffect } from "react";
import "./seasonSeries.css";
import SeasonSeriesTiles from "./SeasonSeriesTile";

function seasonSeries({ currentGame, games, teamData, gameScore}) {
  return (
    <div className="seasonSeries_container">
      <section className="seasonSeries_header">
        <h2>Season Series</h2>
        <small>TIE 1-1</small>
      </section>
      <section className="seasonSeries_tile_grid">
        {games.map((game, i) => {
          return (
            <SeasonSeriesTiles
              key={i}
              homeScore={game.homeScore}
              awayScore={game.awayScore}
              date={game.date}
              game={game}
              teamData={teamData}
              currentGame={currentGame}
              gameScore={gameScore}
            />
          );
        })}
        {/* <SeasonSeriesTiles homeScore={4} awayScore={2} homeTeam={homeTeam} awayTeam={awayTeam}/>
        <SeasonSeriesTiles homeScore={2} awayScore={5}  homeTeam={homeTeam} awayTeam={awayTeam}/> */}
      </section>
    </div>
  );
}

export default seasonSeries;
