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
      />
      <Footer />
    </>
  );
}

export default Schdule;
