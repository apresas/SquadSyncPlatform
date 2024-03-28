import { useState, useEffect } from "react";
import "./goalieStats.css";
import { MdPostAdd } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import axios from "axios";
import GoalieStatTile from "./GoalieStatTile";

function GoalieStats({
  homeTeam,
  awayTeam,
  status,
  gameScore,
  gameStats,
  homeRoster,
  awayRoster,
  homeSaves,
  homeSavePct,
  awaySaves,
  awaySavePct,
  setHomeSaves,
  setHomeSavePct,
  setAwaySaves,
  setAwaySavePct,
  handleGoalieOpen,
  selectedHomeGoalieOne,
  selectedAwayGoalieOne,
  awayGoalieStats,
  homeGoalieStats,
  goalieStats,
  goalieSubmit,
}) {
  useEffect(() => {
    setGoalie();
  }, [goalieSubmit]);

  // useEffect(() => {
  //   setSaves(
  //     gameStats.homeShots,
  //     gameStats.awayShots,
  //     gameScore.homeScore,
  //     gameScore.awayScore
  //   );
  // }, [gameStats.homeShots, gameStats.awayShots, gameScore]);

  const [homeGoalie, setHomeGoalie] = useState({});
  const [awayGoalie, setAwayGoalie] = useState({});
  const [homeStats, setHomeStats] = useState([]);
  const [awayStats, setAwayStats] = useState([]);

  const setGoalie = () => {
    let homeStat = [];
    let homeGoalie = [];
    let awayStat = [];
    let awayGoalie = [];
    // if (goalieStats.length === 0) {
    //   setHomeStats({ shotsAgainst: "NA", saves: "NA" });
    //   setAwayStats({ shotsAgainst: "NA", saves: "NA" });
    // }
    {
      goalieStats.map((stat) => {
        if (stat.teamID === homeTeam.teamID) {
          homeStat.push(stat);
          setHomeStats(homeStat);
          {
            homeRoster.map((goalie) => {
              if (goalie.playerID === stat.playerID) {
                homeGoalie.push(goalie);
                setHomeGoalie(homeGoalie);
              }
            });
          }
        }
        if (stat.teamID === awayTeam.teamID) {
          awayStat.push(stat);
          setAwayStats(awayStat);
          {
            awayRoster.map((goalie) => {
              if (goalie.playerID === stat.playerID) {
                awayGoalie.push(goalie);
                setAwayGoalie(awayGoalie);
              }
            });
          }
        }
      });
    }
  };

  // const setSaves = (homeShots, awayShots, homeScore, awayScore) => {
  //   let homeSaves = awayShots - awayScore;
  //   let awaySaves = homeShots - homeScore;
  //   setHomeSaves(homeSaves);
  //   setAwaySaves(awaySaves);
  // };

  console.log(homeStats);

  return (
    <div className="goalieStats_container">
      <div className="goalieStats_header">
        <h2 id="lineScore_title">Goalie Stats</h2>
      </div>
      <div className="goalieStats_grid">
        <section className="homeGoalie_section">
          <div className="goalie_header">
            <h3>{homeTeam.schoolName}</h3>
            <img src={homeTeam.logo} alt="Home Logo" />
          </div>
          {homeStats.length === 0
            ? null
            : homeStats.map((stat, i) => {
                return (
                  <GoalieStatTile key={i} stat={stat} goalie={homeGoalie} />
                );
              })}
        </section>
        <section className="awayGoalie_section">
          <div className="goalie_header">
            <h3>{awayTeam.schoolName}</h3>
            <img src={awayTeam.logo} alt="Away Logo" />
          </div>
          {awayStats.length === 0
            ? null
            : awayStats.map((stat, i) => {
                return (
                  <GoalieStatTile key={i} stat={stat} goalie={awayGoalie} />
                );
              })}
        </section>
        {status !== "Final" && gameStats.gameStatsID !== 0 ? (
          <div className="goalieStats_controls">
            {goalieStats.length === 0 ? (
              <button
                className="add_goalie_stats"
                onClick={(e) => handleGoalieOpen(e, "ADD")}
              >
                <MdPostAdd />
              </button>
            ) : null}
            {goalieStats.length > 0 ? (
              <button
                className="update_goalie_stats"
                onClick={(e) => handleGoalieOpen(e, "UPDATE")}
              >
                <BiSolidEdit />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default GoalieStats;
