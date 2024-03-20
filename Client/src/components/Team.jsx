/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "./team.css";
import NavBar from "./NavBar";
import SponcerBar from "./Sponcer/SponcerBar";
import Footer from "./Footer";
import PlayerModal from "../modal/PlayerModal";
import PlayerTile from "./PlayerTile/PlayerTile";
import TeamHeader from "../components/Team/TeamHeader";
import { useLocation } from "react-router-dom";
import LoadingOverlay from "./Loading/LoadingOverlay";

function Team({
  setCurrentPlayer,
  currentPlayer,
  teamData,
  getFilterTeam,
  filteredPlayers,
  getFilteredPlayer,
  getCurrentTeam,
  filterTeam,
  teamLoading
}) {

  const rosterBtn = useRef()
  const statsBtn = useRef()
  const scheduleBtn = useRef()

  const [openModal, setOpenModal] = useState(false);

  const location = useLocation();
  const currentTeamID = location.pathname.split("/")[2];

  const [type, setType] = useState("")


  useEffect(() => {
    getCurrentTeam(currentTeamID)
    getFilterTeam(currentTeamID);
  }, []);
  
  const checkCurrentPlayer = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  // console.log(filterTeam)

  const handleTeamNav = (type) => {
    if(type === "ROSTER") {
      rosterBtn.current.className = "team_btn team_selected"
      statsBtn.current.className = "team_btn"
      scheduleBtn.current.className = "team_btn"
    } else if(type === "STATS") {
      rosterBtn.current.className = "team_btn"
      statsBtn.current.className = "team_btn team_selected"
      scheduleBtn.current.className = "team_btn"
    } else if(type === "SCHEDULE"){
      rosterBtn.current.className = "team_btn"
      statsBtn.current.className = "team_btn"
      scheduleBtn.current.className = "team_btn team_selected"
    }
  }

  return (
    <>
      <PlayerModal
        open={openModal}
        currentPlayer={currentPlayer}
        onClose={closeModal}
        filterTeam={filterTeam}
        type={type}
      />
      <SponcerBar />
      <NavBar />
      {teamLoading ? <LoadingOverlay /> : 
      <div className="team_container">
        <div className="team_content_container">
          <TeamHeader
            filterTeam={filterTeam}
          />
          <div className="header_bar" style={{backgroundColor: `${filterTeam.secondaryColor}`}}/>
          <div className="team_nav_container" >
            <div className="nav_controls">
              <a className="team_btn team_selected" ref={rosterBtn} onClick={() => handleTeamNav("ROSTER")}>Roster</a>
              <a className="team_btn" ref={statsBtn} onClick={() => handleTeamNav("STATS")}>Stats</a>
              <a className="team_btn" ref={scheduleBtn} onClick={() => handleTeamNav("SCHEDULE")}>Schedule</a>
            </div>
          </div>
          <div className="players_grid">
            <h2 className="grid_title">Forwards</h2>
            <div className="forwards_grid">
              {filteredPlayers
                .filter((roster) => roster.position === "Forward")
                .map((roster, i) => (
                  <PlayerTile
                    key={i}
                    player={roster}
                    teamData={teamData}
                    setCurrentPlayer={setCurrentPlayer}
                    checkCurrentPlayer={checkCurrentPlayer}
                    getFilteredPlayer={getFilteredPlayer}
                    setType={setType}
                  />
                ))}
            </div>
            <h2 className="grid_title">Defensemen</h2>
            <div className="defense_grid">
              {filteredPlayers
                .filter((roster) => roster.position === "Defense")
                .map((roster, i) => (
                  <PlayerTile
                    key={i}
                    player={roster}
                    teamData={teamData}
                    setCurrentPlayer={setCurrentPlayer}
                    checkCurrentPlayer={checkCurrentPlayer}
                    getFilteredPlayer={getFilteredPlayer}
                    setType={setType}
                  />
                ))}
            </div>
            <h2 className="grid_title">Goalies</h2>
            <div className="goalies_grid">
              {filteredPlayers
                .filter((roster) => roster.position === "Goalie")
                .map((roster, i) => (
                  <PlayerTile
                    key={i}
                    player={roster}
                    teamData={teamData}
                    setCurrentPlayer={setCurrentPlayer}
                    checkCurrentPlayer={checkCurrentPlayer}
                    getFilteredPlayer={getFilteredPlayer}
                    setType={setType}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      }
      <Footer />
    </>
  );
}

export default Team;
