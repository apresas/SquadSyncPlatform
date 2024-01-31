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
  currentPlayer
}) {
  const [dropdownTitle, setDropdownTitle] = useState(`Select ${type}`);
  const [logo, setLogo] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (type === "Position" || type === "Update Position") {
      setSelectedPosition(dropdownTitle);
    } else if (type === "Class" || type === "Update Class") {
      setSelectedClass(dropdownTitle);
    } else if (type === "Team" || type === "Update Team") {
      data.map((teamList) => {
        if (teamList.schoolName === dropdownTitle) {
          setSelectedTeamID(teamList.teamID);
        }
      });
    } else if (type === "Handedness" || type === "Update Handedness") {
      setSelectedHandedness(dropdownTitle);
    } else if (type === "Jersey Number") {
      setSelectedJerseyNumber(dropdownTitle);
    }
  }, [dropdownTitle]);

  useEffect(() => {
    if (type === "Update Position") {
      setDropdownTitle(currentPlayer.position)
    } else if (type === "Update Class") {
      setDropdownTitle(currentPlayer.class)
    } else if (type === "Update Handedness") {
      setDropdownTitle(currentPlayer.handedness)
    } else if (type === "Update Team") {
       {data.filter((data) => data.teamID === currentPlayer.teamID).map((data) => {
        setDropdownTitle(data.schoolName)
        setLogo(data.logo)
       })}

    }
  }, [currentPlayer])

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
