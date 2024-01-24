import React, { useMemo, useEffect } from "react";
import "./playerModal.css";
import { useTable, useSortBy } from "react-table";
import { IoClose } from "react-icons/io5";
import CurrentStatsTable from "../components/currentStatsTable";
import CareerStatsTable from "../components/CareerStatsTable";
function playerModal({
  open,
  onClose,
  currentPlayer,
  primaryColor,
  secondaryColor,
  teamLogo
}) {
  if (!open) {
    return null;
  }
  let position = "";
  // let height = "6'1\"";
  let weight = "155";
  let handedness = "L";
  let playerClass = "";


  let rawHeight = (currentPlayer.height / 12).toFixed(2);
  let heightArray = rawHeight.split('.');
  let heightString = (heightArray[1] / 100 * 12).toString()
  let heightInches = heightString.split('.')
  const height = heightArray[0] + "'" + heightInches[0] + "\"";


  if (currentPlayer.position === "F") {
    position = "Forward";
  } else if (currentPlayer.position === "D") {
    position = "Defense";
  } else {
    position = "Goalie";
  }

  if (currentPlayer.class === "2024") {
    playerClass = "Senior";
  } else if (currentPlayer.class === "2025") {
    playerClass = "Junior";
  } else if (currentPlayer.class === "2026") {
    playerClass = "Sophomore";
  } else {
    playerClass = "Freshman";
  }
  return (
    <>
      <div className="overlay" onClick={onClose}>
        <div className="modal_container" onClick={e => e.stopPropagation()}>
          <div className="modal_content">
            <div className="modal_left">
              <div className="player_info">
                <div className="player_portrait_container">
                  <img
                    src="../../src/assets/Player_Icon.svg"
                    alt="player image"
                  />
                </div>
                <h3 className="modal_player_name">
                  {currentPlayer.firstName} {currentPlayer.lastName}
                </h3>
                <h2 className="modal_player_number">{currentPlayer.jerseyNumber}</h2>
                <small className="player_class">{playerClass}</small>
                <span className="info_divider" />
                <div className="info_section_container">
                  <ul className="info_list">
                    <li>Height: <span>{height}</span></li>
                    <li>Weight: <span>{weight}lbs</span></li>
                    <li>Position: <span>{position}</span></li>
                    <li>Handedness: <span>{handedness}</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="modal_right"
              style={{
                backgroundColor: `${primaryColor}`,
                color: `${secondaryColor}`,
              }}
            >
              <img src={teamLogo} alt="" className="team_logo_bg" />
              <div className="modal_controls">
                <div className="close_btn_container">
                  <IoClose onClick={onClose} style={{ fontSize: "2.25rem" }} />
                </div>
              </div>
              <div className="stats_container">
                <div className="current_stats_container">
                  <h2 className="season_title">Season Stats</h2>
                  <CurrentStatsTable currentPlayer={currentPlayer}/>
                </div>
                <div className="career_stats_container">
                  <h2>Career Stats</h2>
                  <CareerStatsTable currentPlayer={currentPlayer}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default playerModal;
