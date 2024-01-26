import React from 'react'
import"./playerDropdownItem.css"

function PlayerDropdownItem({name, logo, setDropdownTitle, setLogo, setCurrentTeamTitle}) {
    const itemClick = () => {
        setDropdownTitle(name);
        setLogo(logo);
        setCurrentTeamTitle(name)
      };
  return (
    <button className="player_dropdown_item_container" onClick={itemClick}>
      <div className="player_dropdown_logo_container">
        {logo ? <img src={logo} alt="logo" /> : null}
      </div>
      <div className="player_dropdown_item_info">{name}</div>
    </button>
  )
}

export default PlayerDropdownItem