import React from "react";
import { useParams } from "react-router-dom";
import Team from "../components/Team";

function TeamPage({
  currentTeam,
  setCurrentTeam,
  rosterTeam,
  setCurrentPlayer,
  currentPlayer,
  teamData,
  getFilterTeam,
  filteredPlayers,
  getFilteredPlayer,
  currentFilterPlayer,
  getCurrentTeam,
  filterTeam,
  teamLoading
}) {
  const { id } = useParams(currentTeam.id);
  return (
    <Team
      id={currentTeam.id}
      pageID={id}
      currentTeam={currentTeam}
      setCurrentTeam={setCurrentTeam}
      rosterTeam={rosterTeam}
      setCurrentPlayer={setCurrentPlayer}
      currentPlayer={currentPlayer}
      teamData={teamData}
      filteredPlayers={filteredPlayers}
      getFilterTeam={getFilterTeam}
      getFilteredPlayer={getFilteredPlayer}
      currentFilterPlayer={currentFilterPlayer}
      getCurrentTeam={getCurrentTeam}
      filterTeam={filterTeam}
      teamLoading={teamLoading}
    />
  );
}

export default TeamPage;
