import React, { useEffect, useState } from "react";

function TestGameItem({ data, date, gamesList, gameCount, setGameCount }) {
  console.log(data);
  console.log(date);
  console.log(gamesList);

//   const [gameCount, setGameCount] = useState([])

//   let testGame = []

//   const handleFilter = (item, date) => {
//     if(item.date === date) {
//         testGame.push(item)
//         return item
//     }
//   }

//   useEffect(() => {
//     {gamesList.map((game) => game).filter((game) => handleFilter(game, date))}
//     setGameCount(testGame)
//   }, [data])

  console.log(gameCount)

  return (
    <div className="test_game_item">
      <div className="test_awayteam">
        <img src="" alt="logo" />
        <h3>{data.awayTeam}</h3>
      </div>
      <span>@</span>
      <div className="test_hometeam">
        <h3>{data.homeTeam}</h3>
        <img src="" alt="logo" />
      </div>
      <p className="test_date">{data.arena}</p>
      <p className="test_time">{data.time}</p>
      <p className="test_score">
        {data.awayScore} - {data.homeScore}
      </p>
    </div>
  );
}

export default TestGameItem;
