import { useState, useEffect } from "react";
import "./seasonSeries.css";
import SeasonSeriesTiles from "./SeasonSeriesTile";

function seasonSeries({ currentGame, games, teamData, gameScore, homeTeam, awayTeam, status, gameEvents, seriesRecord}) {

  // const [seriesRecord, setSeriesRecord] = useState({
  //   team: "",
  //   record: ""
  // })

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



  // useEffect(() => {
  //   getSeriesRecord(homeTeam.teamID, awayTeam.teamID)
  // }, [games])

  // const getSeriesRecord = (homeID, awayID) => {
  //   let teamOneWins = 0
  //   let teamTwoWins = 0

  //   {games.filter((game) => game.homeID === homeID || game.awayID === homeID).map((game) => {
  //     if (game.homeID === homeID) {
  //       if(game.homeScore > game.awayScore) {
  //         teamOneWins += 1
  //       } 
  //     }
  //     if (game.awayID === homeID) {
  //       if(game.awayScore > game.homeScore) {
  //         teamOneWins += 1
  //       } 
  //     }
  //   })}

    
  //   {games.filter((game) => game.homeID === awayID || game.awayID === awayID).map((game) => {
  //     if (game.homeID === awayID) {
  //       if(game.homeScore > game.awayScore) {
  //         teamTwoWins += 1
  //       } 
  //     }
  //     if (game.awayID === awayID) {
  //       if(game.awayScore > game.homeScore) {
  //         teamTwoWins += 1
  //       } 
  //     }
  //   })}

  //   // console.log(teamOneWins)
  //   // console.log(teamTwoWins)

  //   if(teamOneWins > teamTwoWins) {
  //     setSeriesRecord({
  //       team: homeTeam.abbreviation,
  //       record: teamOneWins + "-" + teamTwoWins
  //     })
  //   } else if(teamTwoWins > teamOneWins) {
  //     setSeriesRecord({
  //       team: awayTeam.abbreviation,
  //       record: teamTwoWins + "-" + teamOneWins
  //     })
  //   } else {
  //     setSeriesRecord({
  //       team: "TIE",
  //       record: teamTwoWins + "-" + teamOneWins
  //     })
  //   }

  // }
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
              status={status}
              gameEvents={gameEvents}
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
