/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./team.css";
import NavBar from "./NavBar";
import SponcerBar from "./Sponcer/SponcerBar";
import Footer from "./Footer";
import PlayerItem from "./PlayerItem";
import rosterData from "../data/rosterData.json";
import PlayerModal from "../modal/PlayerModal";
import Teams from "../data/teams.json";
import PlayerTile from "./PlayerTile/PlayerTile";

function Team({
  id,
  pageID,
  currentTeam,
  rosterTeam,
  setCurrentPlayer,
  currentPlayer,
  teamData,
  getFilterTeam,
  filteredPlayers,
  getFilteredPlayer,
  currentFilterPlayer,
}) {
  // console.log(rosterTeam);
  // const primary_color = "White"
  // const secondary_color = "#031327"
  // const primary_color = rosterTeam.primaryColor;
  // const secondary_color = rosterTeam.secondaryColor;
  // const primary_color = rosterTeam.primaryColor;
  // const secondary_color = rosterTeam.secondaryColor;
  const [openModal, setOpenModal] = useState(false);
  const [teamLogo, setTeamLogo] = useState("");

  const [primaryColor, setPrimaryColor] = useState();
  const [secondaryColor, setSecondaryColor] = useState();

  useEffect(() => {
    {
      Teams.filter((data) => data.id === rosterTeam.teamID).map((data) =>
        setTeamLogo(data.logo)
      );
    }
    // getFilterTeam(currentTeam.teamID)
  }, [currentTeam]);

  useEffect(() => {
    {
      teamData
        .filter((data) => data.teamID === currentTeam.teamID)
        .map((data) => {
          setPrimaryColor(data.primaryColor);
          setSecondaryColor(data.secondaryColor);
        });
    }
    getFilterTeam(currentTeam.teamID);
  }, []);

  const checkCurrentPlayer = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  // console.log(filteredPlayers)
  return (
    <>
      <PlayerModal
        open={openModal}
        currentPlayer={currentPlayer}
        onClose={closeModal}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        teamLogo={teamLogo}
      />
      <SponcerBar />
      <NavBar />
      <div className="team_container">
        <div className="team_content_container">
          {/* <div>TeamID: {id}</div> */}
          <div
            className="team_title_container"
            style={{
              backgroundColor: `${primaryColor}`,
              color: `${secondaryColor}`,
            }}
          >
            <img className="team_logo" src={currentTeam.logo} alt="" />
            <h1 className="school_title">{currentTeam.schoolName}</h1>
            <h3 className="team_title">{currentTeam.teamName}</h3>
          </div>
          {/* <h1 className="roster_title">Roster</h1> */}
          <div className="players_grid">
            <h2 className="grid_title">Forwards</h2>
            <div className="forwards_grid">
              {/* {filteredPlayers
                .filter((roster) => roster.position === "Forward")
                .map((roster, i) => (
                  <PlayerItem
                    key={i}
                    roster={roster}
                    setCurrentPlayer={setCurrentPlayer}
                    checkCurrentPlayer={checkCurrentPlayer}
                    currentPlayer={currentPlayer}
                    getFilteredPlayer={getFilteredPlayer}
                  />
                ))} */}

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
              {/* {filteredPlayers
                .filter((roster) => roster.position === "Defense")
                .map((roster, i) => (
                  <PlayerItem
                    key={i}
                    roster={roster}
                    setCurrentPlayer={setCurrentPlayer}
                    checkCurrentPlayer={checkCurrentPlayer}
                    getFilteredPlayer={getFilteredPlayer}
                  />
                ))} */}

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
              {/* {filteredPlayers
                .filter((roster) => roster.position === "Goalie")
                .map((roster, i) => (
                  <PlayerItem
                    key={i}
                    roster={roster}
                    setCurrentPlayer={setCurrentPlayer}
                    checkCurrentPlayer={checkCurrentPlayer}
                    getFilteredPlayer={getFilteredPlayer}
                  />
                ))} */}
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
