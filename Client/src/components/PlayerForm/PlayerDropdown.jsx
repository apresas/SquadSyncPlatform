import React, { useState } from "react";
import "./playerDropdown.css";
import PlayerDropdownMenu from "./playerDropdownMenu";
import { IoChevronDown } from "react-icons/io5";

function PlayerDropdown() {
  const [dropdownTitle, setDropdownTitle] = useState(["Select Team"]);
  const [currentTeamTitle, setCurrentTeamTitle] = useState();
  const [logo, setLogo] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="player_dropdown_container" onClick={handleOpen}>
      <div className="player_dropdown_toggle">
        {logo ? <img src={logo} alt="logo" /> : null}
        <div className="player_dropdown_title">{dropdownTitle}</div>
        <div className="player_dropdown_control">
          <span />
          <div className="player_arrow_btn">
            <IoChevronDown />
          </div>
        </div>
      </div>
      {open ? (
        <PlayerDropdownMenu
          setDropdownTitle={setDropdownTitle}
          setCurrentTeamTitle={setCurrentTeamTitle}
          currentTeamTitle={currentTeamTitle}
          setLogo={setLogo}
        />
      ) : null}
    </div>
  );
}

export default PlayerDropdown;
