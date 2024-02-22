import React from "react";
import playerPortrait from "../../assets/Player_Icon.svg";
import "./playerTile.css"

function PlayerTile({ player, teamData, setCurrentPlayer, checkCurrentPlayer, getFilteredPlayer }) {
    const onPlayerClick = (player) => {
        setCurrentPlayer(player)
        checkCurrentPlayer();
        getFilteredPlayer(player.playerID)
      }
  return (
    <div className="player_container" onClick={() => onPlayerClick(player)}>
      <div className="portrait_container">
        <img src={playerPortrait} alt="" className="player_image" />
        <span />
      </div>
      <div className="playerTile_info">
        <h2>
          {player.firstName} {player.lastName}
        </h2>
        <h1>{player.jerseyNumber}</h1>
      </div>
      <div className="player_sub">
        {teamData
          .filter((data) => data.teamID === player.teamID)
          .map((data) => (
            <img
              className="player_logo_sm"
              key={player.playerID}
              src={data.logo}
              alt="teamLogo"
            />
          ))}
        <span />
        <small>{player.position}</small>
        <span />
        <small>{player.class}</small>
      </div>
    </div>
  );
}

export default PlayerTile;
