import React, { useEffect } from 'react'
import"./playerDropdownItem.css"

function PlayerDropdownItem({data, type, logo, setDropdownTitle, setLogo, setCurrentTeamTitle, setPlayerID}) {
  let itemName = ""  
  let playerID = 0
  const itemClick = () => {
        setDropdownTitle(itemName);
        setLogo(logo);
        setPlayerID(playerID)
        // setCurrentTeamTitle(itemName)
      };


        if(type === "Position") {
          itemName = data.name
        } else if (type === "Team" || type === "Update Team" || type === "Home Team" || type === "Away Team" || type === "Scoring Team") {
          itemName = data.schoolName
        } else if (type === "Filtered Players") {
          itemName = data.firstName + " " + data.lastName + " #" + data.jerseyNumber
        } else if (type === "Periods") {
          itemName = data
        } else if (type === "Goal Scorer" || type === "Primary Assist" || type === "Secondary Assist") {
          itemName = data.firstName + " " + data.lastName + " #" + data.jerseyNumber 
          playerID = data.playerID
        }
        else {
          itemName = data.name
        }

  return (
    <button className="player_dropdown_item_container" onClick={itemClick}>
      <div className="player_dropdown_logo_container">
        {logo ? <img src={logo} alt="logo" /> : null}
      </div>
      <div className="player_dropdown_item_info">{itemName}</div>
    </button>
  )
}

export default PlayerDropdownItem