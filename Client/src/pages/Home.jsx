import "../App.css";
import TeamTiles from "../components/TeamTiles";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import LeagueLeaders from "../components/LeagueLeaders";
import SponcerBar from "../components/Sponcer/SponcerBar";
import { useParams } from "react-router-dom";

function Home({
    setCurrentTeam,
    currentTeam,
    setRosterTeam,
    rosterTeam,
    teamData,
    getTeamData,
    getDates,
}) {
  return (
    <>
    <div className="nav_container">
      <SponcerBar />
      <NavBar />
    </div>
    <div className="app_container">
      <TeamTiles setCurrentTeam={setCurrentTeam} currentTeam={currentTeam} setRosterTeam={setRosterTeam} rosterTeam={rosterTeam} getTeamData={getTeamData} teamData={teamData} getDates={getDates}/>
      <LeagueLeaders />
      <Footer />
    </div>
  </>
  )
}

export default Home