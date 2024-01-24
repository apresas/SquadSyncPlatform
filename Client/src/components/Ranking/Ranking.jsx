import React from "react";
import TitleBar from "../TitleBar";
import "./ranking.css";
import RankingData from "../../data/stateRanking.json";

function Ranking() {
  const date = "01-19-24"
  return (
    <div className="ranking_container">
      <div className="ranking_content_container">
        <TitleBar title="State Rankings" subtitle="2023-2024" />
        <table className="rankings_table">
          <thead>
            <th colSpan="6"> OHSAA Hockey Rankings 2023-24</th>
            <tr>
              <td className="ranking_column">Ranking</td>
              <td className="team_column">Team</td>
              <td className="record_column">Record</td>
              <td className="record_column">Rating</td>
              <td className="record_column">Schedule</td>
              <td className="record_column">AGD</td>
            </tr>
          </thead>
          <tbody>
            {RankingData.filter((ranking) => ranking.schoolName !== "").map(
              (ranking, i) => (
                <tr key={i}>
                  <td>{ranking.ranking}.</td>
                  <td>
                    <div className="ranking_name_container">
                      <img src={ranking.logo} alt="logo" />
                      {ranking.schoolName} ({ranking.league})
                    </div>
                  </td>
                  <td>{ranking.record}</td>
                  <td>{ranking.rating}</td>
                  <td>{ranking.schedule}</td>
                  <td>{ranking.AGD}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div className="table_footer">
          <p>
          updated: {date}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
