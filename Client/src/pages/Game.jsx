import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import GameSummary from "../components/Game/GameSummary";
import SponcerBar from "../components/Sponcer/SponcerBar";

function Game({
  currentGame,
  teamData,
  getFilterTeam,
  filteredPlayers,
  eventSubmit,
  setEventSubmit,
  gameScore,
  setGameScore,
  getFilterGame,
  getTeamData,
  getCurrentTeam,
  filterTeam, 
  filterGame,
  getRecord,
  record,
  schedule,
  getDates
}) {
  return (
    <>
      <SponcerBar />
      <NavBar />
      <GameSummary
        currentGame={currentGame}
        teamData={teamData}
        getFilterTeam={getFilterTeam}
        filteredPlayers={filteredPlayers}
        eventSubmit={eventSubmit}
        setEventSubmit={setEventSubmit}
        gameScore={gameScore}
        setGameScore={setGameScore}
        getFilterGame={getFilterGame}
        getTeamData={getTeamData}
        getCurrentTeam={getCurrentTeam}
        filterTeam={filterTeam}
        filterGame={filterGame}
        getRecord={getRecord}
        record={record}
        schedule={schedule}
        getDates={getDates}
      />
      <Footer />
    </>
  );
}

export default Game;
