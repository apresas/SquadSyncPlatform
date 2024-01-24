import React, { useState, useEffect, useRef } from "react";
import DropdownMenu from "./DropdownMenu";
import "./dropdown.css";
import { IoChevronDown } from "react-icons/io5";


function Dropdown({ currentTeamTitle, setCurrentTeamTitle }) {
  const [dropdownTitle, setDropdownTitle] = useState(["Select Team"]);
  const [logo, setLogo] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  // console.log(dropdownTitle)
  return (
    <div className="dropdown_container" onClick={handleOpen}>
      <div className="dropdown_toggle">
        <div className="dropdown_title">{logo ? <img src={logo} alt="logo" />:null}{dropdownTitle}</div>
        <div className="dropdown_control">
          <div className="arrow_btn">
            <span /> <IoChevronDown />
          </div>
        </div>
      </div>
      {open ? <DropdownMenu setDropdownTitle={setDropdownTitle} setCurrentTeamTitle={setCurrentTeamTitle} currentTeamTitle={currentTeamTitle} setLogo={setLogo} /> : null}
    </div>
  );
}

export default Dropdown;
