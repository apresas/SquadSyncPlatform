import NavBar from "../components/NavBar";
import GameSchedule from "../components/GameSchedule/GameSchedule";
import SponcerBar from "../components/Sponcer/SponcerBar";
import Footer from "../components/Footer";
import { useEffect } from "react";

function Schdule({
  setCurrentTeamTitle,
  currentTeamTitle,
  dateList,
  getDates,
  selected,
  setSelected,
  prevClick,
  nextClick,
  setFilteredItem,
  filteredItem,
  defaultTeam,
  setDefaultTeam,
  schedule,
  teamData,
  gameSubmit,
  setGameSubmit
}) {
  return (
    <>
      <SponcerBar />
      <NavBar />
      <GameSchedule
        setCurrentTeamTitle={setCurrentTeamTitle}
        currentTeamTitle={currentTeamTitle}
        dateList={dateList}
        getDates={getDates}
        selected={selected}
        setSelected={setSelected}
        prevClick={prevClick}
        nextClick={nextClick}
        setFilteredItem={setFilteredItem}
        filteredItem={filteredItem}
        setDefaultTeam={setDefaultTeam}
        defaultTeam={defaultTeam}
        schedule={schedule}
        teamData={teamData}
        gameSubmit={gameSubmit}
        setGameSubmit={setGameSubmit}
      />
      <Footer />
    </>
  );
}

export default Schdule;
