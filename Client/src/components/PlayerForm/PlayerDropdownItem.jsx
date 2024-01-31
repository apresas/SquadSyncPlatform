import React, { useEffect } from 'react'
import"./playerDropdownItem.css"

function PlayerDropdownItem({data, type, logo, setDropdownTitle, setLogo, setCurrentTeamTitle}) {
  let itemName = ""  
  const itemClick = () => {
        setDropdownTitle(itemName);
        setLogo(logo);
        // setCurrentTeamTitle(itemName)
      };


        if(type === "Position") {
          itemName = data.name
        } else if (type === "Team" || type === "Update Team") {
          itemName = data.schoolName
        } else {
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