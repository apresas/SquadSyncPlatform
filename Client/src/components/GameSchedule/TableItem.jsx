/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./tableItem.css";
import teamData from "../../data/teams.json";

function TableItem({ id, gameData }) {
  const [homeLogo, setHomeLogo] = useState();
  const [awayLogo, setAwayLogo] = useState();

  useEffect(() => {
    {
      teamData
        .filter((data) => data.id === gameData.homeID)
        .map((data) => setHomeLogo(data.logo));
    }
    {
      teamData
        .filter((data) => data.id === gameData.awayID)
        .map((data) => setAwayLogo(data.logo));
    }
  }, [gameData]);

  let rowColor = "#ffffff";
  if (parseInt(id) % 2 === 0) {
    rowColor = "rgb(245, 245, 252)";
  }

  return (
    <>
      <div className="table_item_container">
        <div className="item_body" style={{ backgroundColor: `${rowColor}` }}>
          <div className="schedule_game_container">
            <div className="away_info_container">
              <img src={awayLogo} alt="team1" className="schedule_logo" />
              <span>{gameData.awayTeam} </span>{" "}
            </div>
            <div className="at_symbol">@</div>
            <div className="home_info_container">
              <span>{gameData.homeTeam}</span>
              <img src={homeLogo} alt="team2" className="schedule_logo" />
            </div>
          </div>
          <div className="schedule_arena_container">
            {gameData.arena}
          </div>
          <div className="schedule_time_container">
            {gameData.time}
          </div>
          <div className="score">
            {gameData.awayScore} - {gameData.homeScore}
          </div>
        </div>
      </div>
    </>
  );
}

export default TableItem;
