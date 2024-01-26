import React from 'react'
import "./playerDropdownMenu.css"
import PlayerDropdownItem from "./playerDropdownItem"
import teamData from "../../data/teams.json"

function PlayerDropDownMenu({setDropdownTitle, setCurrentTeamTitle, currentTeamTitle, setLogo}) {
  return (
    <ul className="player_dropdown_menu">
    {teamData.map((data) => (
      <li key={data.id}>
        <PlayerDropdownItem
          name={data.schoolName}
          logo={data.logo}
          setDropdownTitle={setDropdownTitle}
          setCurrentTeamTitle={setCurrentTeamTitle}
          currentTeamTitle={currentTeamTitle}
          setLogo={setLogo}
        />
      </li>
    ))}
  </ul>
  )
}

export default PlayerDropDownMenu