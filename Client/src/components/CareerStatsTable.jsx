import "./careerStatsTable.css";

function CareerStatsTable({ currentPlayer }) {
  let columnHead1 = "G";
  let columnHead2 = "A";
  let columnHead3 = "P";

  if (currentPlayer.position === "Goalie") {
    columnHead1 = "W";
    columnHead2 = "GAA";
    columnHead3 = "SV%";
  } else {
    columnHead1 = "G";
    columnHead2 = "A";
    columnHead3 = "P";
  }

  return (
    <table className="career_stats_table">
      <thead>
        <tr className="career_table_header">
          <th className="career_year_title">YEAR</th>
          <th>GP</th>
          <th>{columnHead1}</th>
          <th>{columnHead2}</th>
          <th>{columnHead3}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="career_year_title">SR <span>(23-24)</span></td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td className="career_year_title">Total</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
  );
}

export default CareerStatsTable;
