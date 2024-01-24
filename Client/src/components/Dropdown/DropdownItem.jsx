import React from "react";
import "./dropdown.css";

function DropdownItem({ name, logo, setDropdownTitle, setLogo, setCurrentTeamTitle, currentTeamTitle }) {
  const itemClick = () => {
    setDropdownTitle(name);
    setLogo(logo);
    setCurrentTeamTitle(name)
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
