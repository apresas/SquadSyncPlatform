import React, { useState, useEffect } from "react";
import "./bracketItem.css";
import TeamData from "../../data/teams.json";
import playoffGames from "../../data/playoffGames.json";
import rosterData from "../../data/rosterData.json";

function BracketItem({ homeTeamInfo, awayTeamInfo, gameID, ID }) {
  // console.log(teamInfo)
  const [teamData, setTeamData] = useState({});
  const [gameData, setGameData] = useState({});
  const [score, setScore] = useState();
  const [seed, setSeed] = useState();
  const [color, setColor] = useState();
  useEffect(() => {
    {
      TeamData.map((data) => {
        if (data.id === ID) {
          console.log(data);
          setTeamData(data);
        }
        if (data.id === ID) {
          // console.log(data);
          setTeamData(data);
        }
      });
    }

    {
      playoffGames.map((data) => {
        if (data.gameID === gameID) {
          setGameData(data);
          // console.log(data);
          if (ID === data.homeTeamID) {
            setScore(data.homeScore);
          } else if (ID === data.awayTeamID) {
            setScore(data.awayScore);
          }
          if (ID === data.homeTeamID) {
            setSeed(data.homeSeed);
          } else if (ID === data.awayTeamID) {
            setSeed(data.awaySeed);
          }
        }
      });
    }

    {
      rosterData.map((data) => {
        if (data.teamID === ID) {
          setColor(data.primaryColor);
        }
      });
    }
  }, [ID]);

  return (
    <div className="bracket_item_container">
      <div className="bracket_item_logo" style={{ backgroundColor: color }}>
      <span className="seed">{seed}</span> 
        <img src={teamData.logo} alt="" />
      </div>
      <div className="bracket_item_info">
        {teamData.schoolName} 
      </div>
      <div className="bracket_item_score">{score}</div>
    </div>
  );
}

export default BracketItem;
