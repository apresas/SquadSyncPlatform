import React, { useState, useEffect } from "react";
import "./seasonSeriesTile.css";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

function SeasonSeriesTile({
  homeScore,
  awayScore,
  date,
  game,
  teamData,
  currentGame,
  gameScore
}) {

  const [currentTile, setCurrentTile] = useState("seasonSeriesTile_container");

  const [link, setLink] = useState();

  const [home, setHome] = useState({
    logo: "",
    abbrev: "",
  });
  const [away, setAway] = useState({
    logo: "",
    abbrev: "",
  });

  const [tileDate, setTileDate] = useState();

  useEffect(() => {
    setTeams(teamData);
    formatGameDate(date);
    setCurrent(currentGame.date, game.date);
    setGameLink(game);

  }, [game]);

  const formatGameDate = (date) => {
    const newDate = DateTime.fromISO(date).toFormat("DD");
    setTileDate(newDate);
  };


  const setTeams = (teams) => {
    {
      teams.map((team) => {
        if (team.teamID === game.homeID) {
          setHome({
            logo: team.logo,
            abbrev: team.abbreviation,
          });
        } else if (team.teamID === game.awayID) {
          setAway({
            logo: team.logo,
            abbrev: team.abbreviation,
          });
        }
      });
    }
  };

  const setCurrent = (date, gameDate) => {
    if (date === gameDate) {
      setCurrentTile("seasonSeriesTile_container current");
    } else {
      setCurrentTile("seasonSeriesTile_container");
    }
  };

  const setGameLink = (game) => {
    const link = "/game/" + game.gameID;
    setLink(link);
  };

  return (
    <Link
      to={link}
      style={{
        color: "inherit",
        textDecoration: "inherit",
        backgroundColor: "inherit",
      }}
    >
      <div className={currentTile}>
        <div className="tile_team_container">
          <div className="tile_team">
            <img src={home.logo} alt="Home Logo" />
            <h3>{home.abbrev}</h3>
          </div>
          {game.homeScore === null || game.awayScore === null ? (
            <h3>-</h3>
          ) : (
            <h3>{gameScore.homeScore}</h3>
          )}
        </div>
        <div className="tile_team_container">
          <div className="tile_team">
            <img src={away.logo} alt="Home Logo" />
            <h3>{away.abbrev}</h3>
          </div>
          {game.homeScore === null || game.awayScore === null ? (
            <h3>-</h3>
          ) : (
            <h3>{gameScore.awayScore}</h3>
          )}
        </div>
        <div className="tile_team_info">
          {game.homeScore === null || game.awayScore === null ? (
            <small>TBD</small>
          ) : (
            <small>Final</small>
          )}
          <small>{tileDate}</small>
        </div>
      </div>
    </Link>
  );
}

export default SeasonSeriesTile;
