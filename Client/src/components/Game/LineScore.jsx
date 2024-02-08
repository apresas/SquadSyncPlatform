import React from "react";
import './lineScore.css'

function LineScore() {
  return (
    <div className="lineScore_container">
      <h2>Line Score</h2>
      <div className="lineScore_header">
        <span></span>
        <h3>1st</h3>
        <h3>2nd</h3>
        <h3>3rd</h3>
        <h3>T</h3>
      </div>
      <div className="lineScore_team_item">
        <div className="lineScore_homeTeam">
            <img src="../../src/assets/Logos/Xavier_logo.svg" alt="Home Logo" />
            <h2>Home</h2>
        </div>
        <p>0</p>
        <p>0</p>
        <p>0</p>
        <p>0</p>
      </div>
      <div className="lineScore_team_item">
        <div className="lineScore_awayTeam">
            <img src="../../src/assets/Logos/Moeller_logo.svg" alt="Away Logo" />
            <h2>Away</h2>
        </div>
        <p>0</p>
        <p>0</p>
        <p>0</p>
        <p>0</p>
      </div>
      {/* <table>
        <thead>
          <tr>
            <th>1st</th>
            <th>2nd</th>
            <th>3rd</th>
            <th>T</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}

export default LineScore;
