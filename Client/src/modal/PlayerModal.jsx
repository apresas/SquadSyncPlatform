/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import "./playerModal.css";
import { IoClose } from "react-icons/io5";
import CurrentStatsTable from "../components/currentStatsTable";
import CareerStatsTable from "../components/CareerStatsTable";
import axios from "axios";
function playerModal({ open, onClose, currentPlayer, filterTeam, type }) {
  const [convertedHeight, setConvertedHeight] = useState();

  const [playerStats, setPlayerStats] = useState({
    games: 0,
    goals: 0,
    assists: 0,
    points: 0,
  });

  const [goalieStats, setGoalieStats] = useState([]);
  const [gaaString, setGaaString] = useState("")
  const [wins, setWins] = useState(0)

  const convertHeight = (height) => {
    let feet = Math.floor(height / 12);
    let inches = height - feet * 12;
    let newHeight = `${feet}'${inches}"`;
    setConvertedHeight(newHeight);
  };

  useEffect(() => {
    getPlayerStats();
    getGoalieStats();
  }, [currentPlayer]);

  useEffect(() => {
    getWins()
  }, [goalieStats]);

  const getPlayerStats = async () => {
    const stats = {
      games: 0,
      goals: 0,
      assists: 0,
      points: 0,
    };
    await axios
      .get("http://localhost:9200/event")
      .then((res) => {
        const goals = res.data.filter(
          (goal) => goal.goalID === currentPlayer.playerID
        );
        const assists = res.data.filter(
          (assist) =>
            assist.primaryAssistID === currentPlayer.playerID ||
            assist.secondaryAssistID === currentPlayer.playerID
        );
        const points = goals.length + assists.length;
        stats.goals = goals.length;
        stats.assists = assists.length;
        stats.points = points;
      })
      .catch((err) => console.log(err));

    await axios
      .get("http://localhost:9200/gamesByTeam/" + currentPlayer.teamID)
      .then((res) => {
        const gamesPlayed = res.data.filter(
          (games) =>
            games.homeID === currentPlayer.teamID ||
            games.awayID === currentPlayer.teamID
        );
        stats.games = gamesPlayed.length;
      })
      .catch((err) => console.log(err));

    setPlayerStats({
      games: stats.games,
      goals: stats.goals,
      assists: stats.assists,
      points: stats.points,
    });
  };

  const getGoalieStats = async () => {
    await axios
      .get("http://localhost:9200/goalieStatByPlayer/" + currentPlayer.playerID)
      .then((res) => {
        setGoalieStats(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getWins = async () => {
    let wins = 0;
    let games = []
    {goalieStats.map((stat) => {
      games.push(stat.gameID)
    })}

    let endpoints = []
    {games.map((game) => {
      endpoints.push("http://localhost:9200/game/" + game)
    })}

    let playerGame = []
    await axios.all(endpoints.map((endPoint) => axios.get(endPoint)))
    .then(
      axios.spread(
        (
          ...allData
        ) => {
          {allData.map((data) => {
            playerGame.push(data.data)
          })}

        }
      )
    )
    .catch((err) => {
      console.log(err);
    })

    {playerGame.map((data) => {
      if(data.homeID === currentPlayer.teamID) {
        if(data.homeScore > data.awayScore) {
          wins += 1
        }
      } else if(data.awayID === currentPlayer.teamID) {
        if(data.awayScore > data.homeScore) {
          wins += 1
        }
      }
    })}
    setWins(wins)
};

  useEffect(() => {
    convertHeight(currentPlayer.height);
  }, [currentPlayer]);

  const [currentGoalieStats, setCurrentGoalieStats] = useState({
    games: 0,
    wins: 0,
    gaa: 0,
    sa: 0,
    svPct: 0,
  });

  useEffect(() => {
    let ga = 0;
    let sa = 0
    if(goalieStats.length === 0) {
      setCurrentGoalieStats({
        games: 0,
        wins: 0,
        gaa: 0,
        sa: 0,
        svPct: 0
      })
    } else {
    {
      goalieStats.map((stat) => {
        const rawPct =
          (stat.shotsAgainst - stat.goalsAgainst) / stat.shotsAgainst;
        const svPct = parseFloat(rawPct.toFixed(3));
        const gp = goalieStats.length;
        ga += stat.goalsAgainst;
        sa += stat.shotsAgainst;
        const gaa = parseFloat((ga / gp).toFixed(2));
        let gaaString = ""
        if(gaa.toString().length === 1) {
          gaaString = (gaa + ".00").toString()
        } else if(gaa.toString().length === 3) {
          gaaString = (gaa + "0").toString()
        } else {
          gaaString = gaa.toString()
        }

        setCurrentGoalieStats({
          games: gp,
          wins: wins,
          gaa: gaaString,
          sa: sa,
          svPct: svPct,
        });
      });
    }}
  }, [goalieStats, currentPlayer, wins]);

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="overlay" onClick={onClose}>
        <div className="modal_container" onClick={(e) => e.stopPropagation()}>
          <div className="modal_content">
            <div className="modal_left">
              <div className="player_info">
                <div className="player_portrait_container">
                  <img
                    src="../../src/assets/Player_Icon.svg"
                    alt="player image"
                  />
                </div>
                <h3 className="modal_player_name">
                  {currentPlayer.firstName} {currentPlayer.lastName}
                </h3>
                <h2 className="modal_player_number">
                  {currentPlayer.jerseyNumber}
                </h2>
                <small className="player_class">
                  {currentPlayer.class.toUpperCase()}
                </small>
                <span className="info_divider" />
                <div className="info_section_container">
                  <ul className="info_list">
                    <li>
                      Height: <span>{convertedHeight}</span>
                    </li>
                    <li>
                      Weight: <span>{currentPlayer.weight}lbs</span>
                    </li>
                    <li>
                      Position: <span>{currentPlayer.position}</span>
                    </li>
                    <li>
                      Handedness: <span>{currentPlayer.handedness}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="modal_right"
              style={{
                backgroundColor: `${filterTeam.primaryColor}`,
                color: `${filterTeam.secondaryColor}`,
              }}
            >
              <img src={filterTeam.logo} alt="" className="team_logo_bg" />
              <img
                className="modal_texture"
                src="../../src/assets/modal_texture.png"
                alt=""
              />
              <div className="modal_controls">
                <div className="close_btn_container">
                  <IoClose onClick={onClose} style={{ fontSize: "2.25rem" }} />
                </div>
              </div>
              <div className="stats_container">
                <div className="current_stats_container">
                  <h2 className="season_title">Season Stats</h2>
                  <CurrentStatsTable
                    currentPlayer={currentPlayer}
                    playerStats={playerStats}
                    goalieStats={goalieStats}
                    currentGoalieStats={currentGoalieStats}
                    type={type}
                  />
                </div>
                <div className="career_stats_container">
                  <h2>Career Stats</h2>
                  <CareerStatsTable currentPlayer={currentPlayer} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default playerModal;
