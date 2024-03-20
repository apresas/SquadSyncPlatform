import { useEffect, useState } from "react";
import "./gameHeader.css";
import axios from "axios";

function GameHeader({ game, homeTeam, awayTeam, gameScore, record, status }) {
  useEffect(() => {
    getGames(homeTeam.teamID, awayTeam.teamID);
  }, [game, gameScore, homeTeam, awayTeam]);
  

  const [isLoading, setIsLoading] = useState(false)

  const [headerRecord, setHeaderRecord] = useState({
    home: "0-0-0",
    away: "0-0-0",
    homeTBD: null,
    awayTBD: null

  });
  const [homeGames, setHomeGames] = useState([]);
  const [awayGames, setAwayGames] = useState([]);


  const getGames = async (homeID, awayID) => {
    setIsLoading(true)
    let endPoints = [
      "http://localhost:9200/gamesByTeam/" + homeID,
      "http://localhost:9200/gamesByTeam/" + awayID,
    ];
    await Promise.all(endPoints.map((endPoint) => axios.get(endPoint)))
      .then(
        axios.spread(({ data: homeGames }, { data: awayGames }) => {
          setHomeGames(homeGames);
          setAwayGames(awayGames);
        })
      )
      .then(() => {
        getRecord(homeID, awayID, homeGames, awayGames);
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

  const getRecord = (homeID, awayID, homeGames, awayGames) => {
    const teamOneID = homeID
    const teamTwoID = awayID
    let teamOneWins = 0;
    let teamOneLoses = 0;
    let teamOneTies = 0;
    let teamOneTBD = 0;
    let teamTwoWins = 0;
    let teamTwoLoses = 0;
    let teamTwoTies = 0;
    let teamTwoTBD = 0;

    {
      homeGames.map((game) => {
        if (teamOneID === game.homeID) {
          if (game.homeScore > game.awayScore) {
            console.log(game)
            teamOneWins += 1;
          } else if (game.homeScore < game.awayScore) {
            teamOneLoses += 1;
          } else if (game.homeScore === game.awayScore) {
            if(game.homeScore !== null && game.awayScore !== null || game.homeScore === 0 && game.awayScore === 0){
              teamOneTBD += 1;
            } else {
            teamOneTies += 1;
          }
          } 
        }
        if(teamOneID === game.awayID) {
          if (game.awayScore > game.homeScore) {
            teamOneWins += 1;
          } else if (game.awayScore < game.homeScore) {
            teamOneLoses += 1;
          } else if (game.awayScore === game.homeScore) {
            if(game.homeScore !== null && game.awayScore !== null || game.homeScore === 0 && game.awayScore === 0){
              teamOneTBD += 1;
            } else {
            teamOneTies += 1;
          }
          }
        }
      });
    }

    {
      awayGames.map((game) => {
        if (teamTwoID === game.homeID) {
          if (game.homeScore > game.awayScore) {
            teamTwoWins += 1;
          } else if (game.homeScore < game.awayScore) {
            teamTwoLoses += 1;
          } else if (game.homeScore === game.awayScore) {
            if(game.homeScore !== null && game.awayScore !== null || game.homeScore === 0 && game.awayScore === 0){
              teamTwoTBD += 1;
            } else {
            teamTwoTies += 1;
          }
          }
        }
        if(teamTwoID === game.awayID) {
          if (game.awayScore > game.homeScore) {
            teamTwoWins += 1;
          } else if (game.awayScore < game.homeScore) {
            teamTwoLoses += 1;
          } else if (game.awayScore === game.homeScore) {
            if(game.homeScore !== null && game.awayScore !== null || game.homeScore === 0 && game.awayScore === 0){
              teamTwoTBD += 1;
            } else {
            teamTwoTies += 1;
          }
          } 
        }
      });
    }

    setHeaderRecord({
      home: teamOneWins + "-" + teamOneLoses + "-" + teamOneTies ,
      away: teamTwoWins + "-" + teamTwoLoses + "-" + teamTwoTies ,
      homeTBD: teamOneTBD,
      awayTBD: teamTwoTBD
    });
  };

  useEffect(() => {
    console.log(headerRecord);
  }, [headerRecord]);

  return (
    <section className="gameSummary_header">
      <div className="homeTeam">
        <img src={homeTeam.logo} alt="Home Logo" />
        <div className="gameSummary_header_home_info">
          <small>{homeTeam.mascotName}</small>
          <h3>{homeTeam.schoolName}</h3>
          {isLoading ? <small>Loading...</small> : headerRecord.homeTBD === 0 ? <small>{headerRecord.home}</small> : <small>{headerRecord.home} TBD:{headerRecord.homeTBD}</small>}
        </div>
      </div>
      <div className="header_result">
        <h1 className="header_home_score">{gameScore.homeScore}</h1>
        <h3 className="gameSummary_header_time">{status}</h3>
        <h1 className="header_away_score">{gameScore.awayScore}</h1>
      </div>
      <div className="awayTeam">
        <div className="gameSummary_header_away_info">
          <small>{awayTeam.mascotName}</small>
          <h3>{awayTeam.schoolName}</h3>
          {isLoading ? <small>Loading...</small> : headerRecord.awayTBD === 0 ? <small>{headerRecord.away}</small> : <small>{headerRecord.away} TBD:{headerRecord.awayTBD}</small>}
        </div>
        <img src={awayTeam.logo} alt="Away Logo" />
      </div>
    </section>
  );
}

export default GameHeader;
