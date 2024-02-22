/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./team.css";
import NavBar from "./NavBar";
import SponcerBar from "./Sponcer/SponcerBar";
import Footer from "./Footer";
import PlayerModal from "../modal/PlayerModal";
import PlayerTile from "./PlayerTile/PlayerTile";
import TeamHeader from "../components/Team/TeamHeader";
import { useLocation } from "react-router-dom";

function Team({
  setCurrentPlayer,
  currentPlayer,
  teamData,
  getFilterTeam,
  filteredPlayers,
  getFilteredPlayer,
  getCurrentTeam,
  filterTeam
}) {

  const [openModal, setOpenModal] = useState(false);

  const location = useLocation();
  const currentTeamID = location.pathname.split("/")[2];


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

  return (
    <>
      <PlayerModal
        open={openModal}
        currentPlayer={currentPlayer}
        onClose={closeModal}
        filterTeam={filterTeam}
      />
      <SponcerBar />
      <NavBar />
      <div className="team_container">
        <div className="team_content_container">
          <TeamHeader
            filterTeam={filterTeam}
          />
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
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Team;
