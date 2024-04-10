import { useState, useEffect } from "react";
import "./seasonSeries.css";
import SeasonSeriesTiles from "./SeasonSeriesTile";
import axios from "axios";

function seasonSeries({
  currentGame,
  games,
  teamData,
  gameScore,
  homeTeam,
  awayTeam,
  status,
  gameEvents,
}) {

  const [isLoading, setIsLoading] = useState(false)
  const [teamOne, setTeamOne] = useState({});
  const [teamTwo, setTeamTwo] = useState({});

  const [record, setRecord] = useState({
    team: "",
    record: "",
  });

  const [series, setSeries] = useState([]);

  const [score, setScore] = useState({
    homeScore: 0,
    awayScore: 0,
  });

  useEffect(() => {
    setScore({
      homeScore: gameScore.homeScore,
      awayScore: gameScore.awayScore,
    });
  }, [gameScore]);

  useEffect(() => {
    getSeries(homeTeam.teamID, awayTeam.teamID);
  }, []);

  useEffect(() => {
    getRecord(series);
  }, [series]);

  const getSeries = async (homeID, awayID) => {
    setIsLoading(true)
    await axios
      .get("http://localhost:9200/gamesByTeam/" + homeID + "/" + awayID)
      .then((res) => {
        setSeries(res.data);
      })
      .then(() => {
        getRecord(series)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 550);
      });
  };

  const getRecord = (series) => {
    const teamOneID = homeTeam.teamID;
    const teamTwoID = awayTeam.teamID;

    let teamOneWins = 0;
    let teamTwoWins = 0;

    setTeamOne(homeTeam);
    setTeamTwo(awayTeam);

    {
      series.map((game) => {
        // console.log(game);

        if (game.homeID === teamOneID) {
          // console.log("Team One: home");
          if (game.homeScore > game.awayScore) {
            teamOneWins += 1;
            // console.log("ONE: home win");
          }
        }
        if (game.awayID === teamOneID) {
          // console.log("Team One: away");
          if (game.awayScore > game.homeScore) {
            teamOneWins += 1;
            // console.log("ONE: away win");
          }
        }

        if (game.homeID === teamTwoID) {
          // console.log("Team Two: home");
          if (game.homeScore > game.awayScore) {
            teamTwoWins += 1;
            // console.log("TWO: home win");
          }
        }
        if (game.awayID === teamTwoID) {
          // console.log("Team Two: away");
          if (game.awayScore > game.homeScore) {
            teamTwoWins += 1;
            // console.log("TWO: away win");
          }
        }
      });
    }

    if (teamOneWins > teamTwoWins) {
      setRecord({
        team: teamOne.abbreviation,
        record: teamOneWins + "-" + teamTwoWins,
      });
    } else if (teamTwoWins > teamOneWins) {
      setRecord({
        team: teamTwo.abbreviation,
        record: teamTwoWins + "-" + teamOneWins,
      });
    } else if(teamTwoWins === teamOneWins) {
      if(teamOneWins > 0 && teamTwoWins > 0) {
        setRecord({
          team: "TIE",
          record: teamOneWins + "-" + teamTwoWins
        })
      }else {
      setRecord({
        team: "TIE",
        record: "0-0",
      });
    }
    }

    // console.log(teamOneWins);
    // console.log(teamTwoWins);
  };

  // useEffect(() => {
  //   console.log(record);
  // }, [record]);

  return (
    <div className="seasonSeries_container">
      <section className="seasonSeries_header">
        <h2>Season Series</h2>
        {isLoading ?<small>Loading...</small> : <small>{record.team} {record.record}</small>}
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
      </section>
    </div>
  );
}

export default seasonSeries;
