import React from 'react'
import "./currentStatsTable.css";

function currentStatsTable({currentPlayer}) {
  let columnHead1 = "G";
  let columnHead2 = "A";
  let columnHead3 = "P";

  if(currentPlayer.position === "G") {
    columnHead1 = "W"
    columnHead2 = "GAA"
    columnHead3 = "SV%"
  } else {
    columnHead1 = "G";
    columnHead2 = "A";
    columnHead3 = "P";
  }
  return (
    <table className="current_stats_table">
    <thead>
      <tr className="current_table_header">
        <th className="current_year_title">SEASON</th>
        <th>GP</th>
        <th>{columnHead1}</th>
        <th>{columnHead2}</th>
        <th>{columnHead3}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="current_year_title">
          2023-24
        </td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        {/* <td>{currentPlayer.stats.currentSeason.gamesPlayed}</td>
        <td>{currentPlayer.stats.currentSeason.goals}</td>
        <td>{currentPlayer.stats.currentSeason.assists}</td>
        <td>{currentPlayer.stats.currentSeason.points}</td> */}
      </tr>
    </tbody>
  </table>
  )
}

export default currentStatsTable