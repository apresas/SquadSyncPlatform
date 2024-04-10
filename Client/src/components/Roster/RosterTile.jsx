import { useEffect, useState } from "react";
import "./rosterTile.css";
import { LuCircleSlash } from "react-icons/lu";

function RosterTile({ player, team, isActive }) {
  // <LuCircleSlash style={{color: "lightgrey", opacity: 0.7}}/>
  return (
    <div className="roster_tile_container">
      {!isActive ? <div className="tile_overlay"></div> : null}
      <h2 className="roster_tile_name">
        {player.firstName} {player.lastName}
      </h2>
      <h1 className="roster_tile_number">{player.jerseyNumber}</h1>
      <div className="roster_tile_info">
        <img src={team.logo} alt="logo" />
        <span>|</span>
        <span>{player.position}</span>
        {/* <span>|</span>
            <span>{player.class}</span> */}
      </div>
    </div>
  );
}

export default RosterTile;
