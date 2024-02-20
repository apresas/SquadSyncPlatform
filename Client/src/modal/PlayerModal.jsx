import { useEffect, useState } from "react";
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
  teamLogo,
}) {

  const [convertedHeight, setConvertedHeight] = useState();

  const convertHeight = (height) => {
    let feet = Math.floor(height / 12);
    let inches = height - feet * 12;
    let newHeight = `${feet}'${inches}"`;
    setConvertedHeight(newHeight);
  };

  useEffect(() => {
    convertHeight(currentPlayer.height);
  }, [currentPlayer]);

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="overlay" onClick={onClose}>
        <div className="modal_container" onClick={(e) => e.stopPropagation()}>
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
                <h2 className="modal_player_number">
                  {currentPlayer.jerseyNumber}
                </h2>
                <small className="player_class">{currentPlayer.class.toUpperCase()}</small>
                <span className="info_divider" />
                <div className="info_section_container">
                  <ul className="info_list">
                    <li>
                      Height: <span>{convertedHeight}</span>
                    </li>
                    <li>
                      Weight: <span>{currentPlayer.weight}lbs</span>
                    </li>
                    <li>
                      Position: <span>{currentPlayer.position}</span>
                    </li>
                    <li>
                      Handedness: <span>{currentPlayer.handedness}</span>
                    </li>
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
                  <CurrentStatsTable currentPlayer={currentPlayer} />
                </div>
                <div className="career_stats_container">
                  <h2>Career Stats</h2>
                  <CareerStatsTable currentPlayer={currentPlayer} />
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
