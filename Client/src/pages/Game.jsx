import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import GameSummary from "../components/Game/GameSummary";
import SponcerBar from "../components/Sponcer/SponcerBar";

function Game({currentGame, teamData, getFilterTeam, filteredPlayers}) {
  return (
    <>
      <SponcerBar />
      <NavBar />
      <GameSummary currentGame={currentGame} teamData={teamData} getFilterTeam={getFilterTeam} filteredPlayers={filteredPlayers} />
      <Footer />
    </>
  );
}

export default Game;
