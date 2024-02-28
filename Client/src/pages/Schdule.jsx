import NavBar from "../components/NavBar";
import GameSchedule from "../components/GameSchedule/GameSchedule";
import SponcerBar from "../components/Sponcer/SponcerBar";
import Footer from "../components/Footer";

function Schdule({
  setCurrentTeamTitle,
  currentTeamTitle,
  dateList,
  setDateList,
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
  setGameSubmit,
  setCurrentGame
}) {
  return (
    <>
      <SponcerBar />
      <NavBar />
      <GameSchedule
        setCurrentTeamTitle={setCurrentTeamTitle}
        currentTeamTitle={currentTeamTitle}
        dateList={dateList}
        setDateList={setDateList}
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
        setCurrentGame={setCurrentGame}
      />
      <Footer />
    </>
  );
}

export default Schdule;
