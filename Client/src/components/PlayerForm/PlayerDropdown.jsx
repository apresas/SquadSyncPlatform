import React, { useState, useEffect, useRef } from "react";
import "./playerDropdown.css";
import PlayerDropdownMenu from "./playerDropdownMenu";
import { IoChevronDown } from "react-icons/io5";

function PlayerDropdown({
  data,
  type,
  setSelectedTeamID,
  setCurrentTeamTitle,
  currentTeamTitle,
  setSelectedPosition,
  setSelectedClass,
  setSelectedHandedness,
  setSelectedJerseyNumber, 
}) {
  const [dropdownTitle, setDropdownTitle] = useState(`Select ${type}`);
  const [logo, setLogo] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (type === "Position") {
      setSelectedPosition(dropdownTitle);
    } else if (type === "Class") {
      setSelectedClass(dropdownTitle);
    } else if (type === "Team") {
      data.map((teamList) => {
        if (teamList.schoolName === dropdownTitle) {
          setSelectedTeamID(teamList.teamID);
        }
      });
    } else if (type === "Handedness") {
      setSelectedHandedness(dropdownTitle);
    } else if (type === "Jersey Number") {
      setSelectedJerseyNumber(dropdownTitle);
    }
  }, [dropdownTitle]);

  // useEffect(() =>{
  //   if(type === "Team") {
  //     data.map((teamList) => {
  //       if(teamList.schoolName === currentTeamTitle) {
  //         setSelectedTeamID(teamList.teamID)
  //       }
  //     })
  //   }
  // }, [currentTeamTitle])

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
          data={data}
          type={type}
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
