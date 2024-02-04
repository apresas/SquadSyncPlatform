import React from "react";
import { useParams } from "react-router-dom";
import Team from "../components/Team";

function TeamPage({
  currentTeam,
  rosterTeam,
  setCurrentPlayer,
  currentPlayer,
  teamData,
  getFilterTeam,
  filteredPlayers,
  getFilteredPlayer,
  currentFilterPlayer
}) {
  const { id } = useParams(currentTeam.id);
  return (
    <Team
      id={currentTeam.id}
      pageID={id}
      currentTeam={currentTeam}
      rosterTeam={rosterTeam}
      setCurrentPlayer={setCurrentPlayer}
      currentPlayer={currentPlayer}
      teamData={teamData}
      filteredPlayers={filteredPlayers}
      getFilterTeam={getFilterTeam}
      getFilteredPlayer={getFilteredPlayer}
      currentFilterPlayer={currentFilterPlayer}
    />
  );
}

export default TeamPage;
