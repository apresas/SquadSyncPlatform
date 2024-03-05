import React, { useState, useEffect } from "react";
import "./seasonSeries.css";
import SeasonSeriesTiles from "./SeasonSeriesTile";

function seasonSeries({ currentGame, games, teamData, gameScore, homeTeam, awayTeam}) {

  const [seriesRecord, setSeriesRecord] = useState({
    team: "",
    record: ""
  })

  const [score, setScore] = useState({
    homeScore: 0,
    awayScore: 0
  })

  useEffect(() => {
    setScore({
      homeScore: gameScore.homeScore,
      awayScore: gameScore.awayScore
    })
  }, [gameScore])

  useEffect(() => {
    getSeriesRecord()
  }, [games])

  const getSeriesRecord = () => {
    {games.map((game) => {
      let home = 0
      let away = 0
      if (game.homeScore > game.awayScore) {
        home += 1
        setSeriesRecord({team: homeTeam.abbrev, record: home + " - " + away})
      } else if(game.awayScore > game.homeScore) {
        away += 1
        setSeriesRecord({team: awayTeam.abbrev, record: away + " - " + home})
      }
    })}
  }
  return (
    <div className="seasonSeries_container">
      <section className="seasonSeries_header">
        <h2>Season Series</h2>
        <small>{seriesRecord.team} {seriesRecord.record}</small>
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
