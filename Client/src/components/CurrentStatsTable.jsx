import "./currentStatsTable.css";

function currentStatsTable({
  currentPlayer,
  playerStats,
  currentGoalieStats,
  type,
}) {
  let columnHead1 = "G";
  let columnHead2 = "A";
  let columnHead3 = "P";
  let columnHead4 = null;

  if (currentPlayer.position === "Goalie") {
    columnHead1 = "W";
    columnHead2 = "SA";
    columnHead3 = "GAA"
    columnHead4 = "SV%";
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
          {type === "GOALIE" ? (
            <>
              <th>{columnHead1}</th>
              <th>{columnHead2}</th>
              <th>{columnHead3}</th>
              <th>{columnHead4}</th>
            </>
          ) : (
            <>
              <th>{columnHead1}</th>
              <th>{columnHead2}</th>
              <th>{columnHead3}</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="current_year_title">2023-24</td>
          {type === "GOALIE" ? (
            <>
              <td>{currentGoalieStats.games}</td>
              <td>{currentGoalieStats.wins}</td>
              <td>{currentGoalieStats.sa}</td>
              <td>{currentGoalieStats.gaa}</td>
              <td>{currentGoalieStats.svPct}</td>
            </>
          ) : (
            <>
              {" "}
              <td>{playerStats.games}</td>
              <td>{playerStats.goals}</td>
              <td>{playerStats.assists}</td>
              <td>{playerStats.points}</td>
            </>
          )}
          {/* <td>{playerStats.games}</td>
          <td>{playerStats.goals}</td>
          <td>{playerStats.assists}</td>
          <td>{playerStats.points}</td> */}
        </tr>
      </tbody>
    </table>
  );
}

export default currentStatsTable;
