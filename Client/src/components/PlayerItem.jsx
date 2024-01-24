import React, { useEffect } from "react";
import "./playerItem.css";

function PlayerItem({roster, setCurrentPlayer, currentPlayer, checkCurrentPlayer}) {
  const onPlayerClick = (player) => {
    setCurrentPlayer(player)
    checkCurrentPlayer();
  }



  return (
    <div className="player_item" onClick={() => onPlayerClick(roster)}>
      <div className="player_image_container">
        <img src="../../src/assets/Player_Icon.svg" alt="player image" />
      </div>
      <h3 className="player_name">{roster.firstName} {roster.lastName}</h3>
      <h2 className="player_number">{roster.jerseyNumber}</h2>
      <small className="player_class">{roster.class}</small>
    </div>
  );
}

export default PlayerItem;
