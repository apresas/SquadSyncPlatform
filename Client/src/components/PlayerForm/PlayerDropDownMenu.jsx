import React from "react";
import "./playerDropdownMenu.css";
import PlayerDropdownItem from "./playerDropdownItem";
// import teamData from "../../data/teams.json";

function PlayerDropDownMenu({
  data,
  setDropdownTitle,
  setCurrentTeamTitle,
  currentTeamTitle,
  setLogo,
  type, 
  setPlayerID,
  setGoalieID,
  currentPlayer
}) {

  return (
    <ul className="player_dropdown_menu">
      {data.map((data, i) => (
        <li key={i}>
          <PlayerDropdownItem
            data={data}
            type={type}
            logo={data.logo}
            setDropdownTitle={setDropdownTitle}
            setCurrentTeamTitle={setCurrentTeamTitle}
            currentTeamTitle={currentTeamTitle}
            setLogo={setLogo}
            setPlayerID={setPlayerID}
            setGoalieID={setGoalieID}
            currentPlayer={currentPlayer}
          />
        </li>
      ))}
    </ul>
  );
}

export default PlayerDropDownMenu;
