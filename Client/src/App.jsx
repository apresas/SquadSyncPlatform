import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TeamPage from "./pages/TeamPage";
import StatsLeader from "./pages/StatsLeader";
import Schedule from "./pages/Schdule";
import LeagueInfo from "./pages/LeagueInfo";
import Rankings from "./pages/Rankings";
import PostSeason from "./pages/PostSeason";
import PlayerAwards from "./pages/PlayerAwards";
import AllstarGame from "./pages/AllstarGame";
import History from "./pages/LeagueHistory";
import Archieve from "./pages/Archieve";
import Links from "./pages/Links";
import About from "./pages/About";
import Game from "./pages/Game";
import { useSite } from "./context/SiteContext";

function App() {
  const {
    currentTeam,
    setCurrentTeam,
    setRosterTeam,
    rosterTeam,
    setCurrentPlayer,
    currentPlayer,
    setDateList,
    dateList,
    getDates,
    currentTeamTitle,
    setCurrentTeamTitle,
    selected,
    setSelected,
    nextClick,
    prevClick,
    setFilteredItem,
    filteredItem,
    defaultTeam,
    setDefaultTeam,
    getTeamData,
    teamData,
    testPlayers,
    getTestPlayers,
    getFilterTeam,
    filteredPlayers,
    getFilteredPlayer,
    currentFilterPlayer,
    schedule,
    gameSubmit,
    setGameSubmit
  } = useSite();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setCurrentTeam={setCurrentTeam}
              setRosterTeam={setRosterTeam}
              rosterTeam={rosterTeam}
              getTeamData={getTeamData}
              teamData={teamData}
            />
          }
        />
        <Route
          path="/team/:id"
          element={
            <TeamPage
              currentTeam={currentTeam}
              rosterTeam={rosterTeam}
              setCurrentPlayer={setCurrentPlayer}
              currentPlayer={currentPlayer}
              teamData={teamData}
              getFilterTeam={getFilterTeam}
              filteredPlayers={filteredPlayers}
              getFilteredPlayer={getFilteredPlayer}
              currentFilterPlayer={currentFilterPlayer}
            />
          }
        />
        <Route path="/stats" elememt={<StatsLeader />} />
        <Route
          path="/schedule"
          element={
            <Schedule
              setDateList={setDateList}
              dateList={dateList}
              getDates={getDates}
              setCurrentTeamTitle={setCurrentTeamTitle}
              currentTeamTitle={currentTeamTitle}
              selected={selected}
              setSelected={setSelected}
              prevClick={prevClick}
              nextClick={nextClick}
              setFilteredItem={setFilteredItem}
              filteredItem={filteredItem}
              defaultTeam={defaultTeam}
              setDefaultTeam={setDefaultTeam}
              schedule={schedule}
              teamData={teamData}
              gameSubmit={gameSubmit}
              setGameSubmit={setGameSubmit}
            />
          }
        />
        <Route path="/info" element={<LeagueInfo />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/postseason" element={<PostSeason />} />
        <Route path="/awards" element={<PlayerAwards />} />
        <Route path="/allstar" element={<AllstarGame />} />
        <Route path="/history" element={<History />} />
        <Route path="/archive" element={<Archieve teamData={teamData} testPlayers={testPlayers} getTestPlayers={getTestPlayers} getFilterTeam={getFilterTeam} filteredPlayers={filteredPlayers} setCurrentPlayer={setCurrentPlayer} currentPlayer={currentPlayer}/>} />
        <Route path="/links" element={<Links />} />
        <Route path="/info" element={<LeagueInfo />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
