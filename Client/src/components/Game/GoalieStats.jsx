import { useState, useEffect } from "react";
import "./goalieStats.css";
import { MdPostAdd } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import axios from "axios";

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
  // const [homeSaves, setHomeSaves] = useState();
  // const [awaySaves, setAwaySaves] = useState();
  // const [homeSavePct, setHomeSavePct] = useState();
  // const [awaySavePct, setAwaySavePct] = useState();
  // const [homeGoalie, setHomeGoalie] = useState({});
  // const [awayGoalie, setAwayGoalie] = useState({});
  // const [homeStats, setHomeStats] = useState({});
  // const [awayStats, setAwayStats] = useState({});

  useEffect(() => {
    setGoalie();
  }, []);

  useEffect(() => {
    setGoalie();
  }, [goalieSubmit]);

  useEffect(() => {
    setSaves(
      gameStats.homeShots,
      gameStats.awayShots,
      gameScore.homeScore,
      gameScore.awayScore
    );
  }, [gameStats.homeShots, gameStats.awayShots, gameScore]);

  useEffect(() => {
    setSavePct(gameStats.homeShots, gameStats.awayShots, homeSaves, awaySaves);
  }, [homeSaves, awaySaves, gameStats.homeShots, gameStats.awayShots]);

  const [homeGoalie, setHomeGoalie] = useState({});
  const [awayGoalie, setAwayGoalie] = useState({});
  const [homeStats, setHomeStats] = useState({});
  const [awayStats, setAwayStats] = useState({});

  const setGoalie = () => {
    {
      goalieStats.map((stat) => {
        if (stat.teamID === homeTeam.teamID) {
          setHomeStats(stat);
          {
            homeRoster.map((goalie) => {
              if (goalie.playerID === stat.playerID) {
                setHomeGoalie(goalie);
              }
            });
          }
        }
        if (stat.teamID === awayTeam.teamID) {
          setAwayStats(stat);
          {
            awayRoster.map((goalie) => {
              if (goalie.playerID === stat.playerID) {
                setAwayGoalie(goalie);
              }
            });
          }
        }
      });
    }
  };

  const setSavePct = (homeShots, awayShots, homeSaves, awaySaves) => {
    let homeSavePct = (homeSaves / awayShots).toFixed(3);
    let awaySavePct = (awaySaves / homeShots).toFixed(3);
    setHomeSavePct(homeSavePct);
    setAwaySavePct(awaySavePct);
  };

  const setSaves = (homeShots, awayShots, homeScore, awayScore) => {
    let homeSaves = awayShots - awayScore;
    let awaySaves = homeShots - homeScore;
    setHomeSaves(homeSaves);
    setAwaySaves(awaySaves);
  };

  // const getGoalieStats = async() => {
  //   await axios
  //   .get("http://localhost:9200/goalieStatByGame/" + currentGameID)
  // }

  // console.log(homeGoalieStats);
  // console.log(awayGoalieStats);

  //   console.log(gameStats)
  //   console.log(homeGoalie);
  //   console.log(awayGoalie);

  //   console.log(homeRoster);
  //   console.log(awayRoster);
  // console.log(goalieStats);

  // console.log(homeStats)
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
          <section className="goalie_stat_grid">
            <div className="goalie_stat_player">
              <h4>{homeGoalie.jerseyNumber}</h4>
              <span />
              <h4>
                {homeGoalie.firstName} {homeGoalie.lastName}
              </h4>
            </div>
            <div className="goalie_stat_header">
              <h4>SH/SV</h4>
              <h4>SV%</h4>
              <h4>TOI</h4>
            </div>
            <div className="goalie_stat_body">
              {gameStats.gameStatsID !== 0 ? (
                <div className="goalie_stat">
                  {homeStats.shotsAgainst}/{homeStats.saves}
                </div>
              ) : (
                <div className="goalie_stat">NA</div>
              )}
              {gameStats.gameStatsID !== 0 ? (
                <div className="goalie_stat">{homeSavePct}</div>
              ) : (
                <div className="goalie_stat">NA</div>
              )}
              <div className="goalie_stat">45:00</div>
            </div>
          </section>
        </section>
        <section className="awayGoalie_section">
          <div className="goalie_header">
            <h3>{awayTeam.schoolName}</h3>
            <img src={awayTeam.logo} alt="Away Logo" />
          </div>
          <section className="goalie_stat_grid">
            <div className="goalie_stat_player">
              <h4>{awayGoalie.jerseyNumber}</h4>
              <span />
              <h4>
                {awayGoalie.firstName} {awayGoalie.lastName}
              </h4>
            </div>
            <div className="goalie_stat_header">
              <h4>SH/SV</h4>
              <h4>SV%</h4>
              <h4>TOI</h4>
            </div>
            <div className="goalie_stat_body">
              {gameStats.gameStatsID !== 0 ? (
                <div className="goalie_stat">
                  {awayStats.shotsAgainst}/{awayStats.saves}
                </div>
              ) : (
                <div className="goalie_stat">NA</div>
              )}
              {gameStats.gameStatsID !== 0 ? (
                <div className="goalie_stat">{awaySavePct}</div>
              ) : (
                <div className="goalie_stat">NA</div>
              )}
              <div className="goalie_stat">45:00</div>
            </div>
          </section>
        </section>
        {status !== "Final" ? (
          <div className="goalieStats_controls">
            {goalieStats.length === 0 ? (
              <button className="add_goalie_stats" onClick={(e) => handleGoalieOpen(e, "ADD")}>
                <MdPostAdd />
              </button>
            ) : null}
            {goalieStats.length > 0 ? (
              <button
                className="update_goalie_stats"
                onClick={(e) => handleGoalieOpen(e,"UPDATE")}
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
