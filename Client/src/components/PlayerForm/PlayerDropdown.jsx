/* eslint-disable react/prop-types */
import { useState, useEffect} from "react";
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
  currentPlayer,
  submitted,
  setHomeID,
  setAwayID,
  setScoringID,
  setPrimaryID,
  setSecondaryID,
  setGoalID,
  setEventPeriod
}) {
  const [dropdownTitle, setDropdownTitle] = useState(`Select ${type}`);
  const [playerID, setPlayerID] = useState()
  const [logo, setLogo] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };


  useEffect(() => {
    if(submitted === true) {
      setDropdownTitle(`Select ${type}`)
      setLogo(null);
    }
  }, [submitted])



  useEffect(() => {
    if (type === "Position" || type === "Update Position") {
      setSelectedPosition(dropdownTitle);
    } else if (type === "Class" || type === "Update Class") {
      setSelectedClass(dropdownTitle);
    } else if (type === "Team" || type === "Update Team") {
      setSelectedTeamID('')
      data.map((teamList) => {
        if (teamList.schoolName === dropdownTitle) {
          setSelectedTeamID(teamList.teamID);
        }
      });
    } else if (type === "Handedness" || type === "Update Handedness") {
      setSelectedHandedness(dropdownTitle);
    } else if (type === "Jersey Number") {
      setSelectedJerseyNumber(dropdownTitle);
    } else if (type === "Home Team") {
      data.map((teamList) => {
        if(teamList.schoolName === dropdownTitle) {
          setHomeID(teamList.teamID);
        }
      })
    } else if (type === "Away Team") {
      data.map((teamList) => {
        if(teamList.schoolName === dropdownTitle) {
          setAwayID(teamList.teamID);
        }
      })
    } else if (type === "Scoring Team") {
      data.map((teamList) => {
        if(teamList.schoolName === dropdownTitle) {
          setScoringID(teamList.teamID);
        }
      })
    } else if(type === "Periods") {
      setEventPeriod(dropdownTitle)
    } else if(type === "Goal Scorer") {
      data.map((player) => {
        if(player.playerID === playerID) {
          setGoalID(player.playerID)
        }
      })

    } else if(type === "Primary Assist") {
      data.map((player) => {
        if(player.playerID === playerID) {
          setPrimaryID(player.playerID)
        }
      })
    } else if(type === "Secondary Assist") {
      data.map((player) => {
        if(player.playerID === playerID) {
          setSecondaryID(player.playerID)
        }
      })
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
          setPlayerID={setPlayerID}
        />
      ) : null}
    </div>
  );
}

export default PlayerDropdown;
