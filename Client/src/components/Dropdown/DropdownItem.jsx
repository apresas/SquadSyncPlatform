import React, { useEffect } from "react";
import "./dropdown.css";

function DropdownItem({ name, logo, setDropdownTitle, setLogo, setCurrentTeamTitle, currentTeamTitle, setSelectedTeam, teamID }) {
  const itemClick = () => {
    setDropdownTitle(name);
    setLogo(logo);
    setCurrentTeamTitle(name)
    setSelectedTeam(teamID)
  };



  return (
    <button className="dropdown_item_container" onClick={itemClick}>
      <div className="dropdown_logo_container">
        {logo ? <img src={logo} alt="logo" /> : null}
      </div>
      <div className="dropdown_item_info">{name}</div>
    </button>
  );
}

export default DropdownItem;
