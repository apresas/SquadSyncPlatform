import React from "react";
import "./boxScore.css";

function BoxScore() {
  return (
    <div className="boxScore_container">
      <section className="boxScore_header">
        <h2>Game Sheet</h2>
        <div className="boxScore_controls">
          <button className="home_btn selected">Home Team</button>
          <button className="away_btn">Away Team</button>
        </div>
      </section>
      <section className="boxScore_tables_container">
        <table className="gameSheet_table_forwards">
          <thead>
            <tr className="player_row">
              <th># Forwards</th>
              <th>G</th>
              <th>A</th>
              <th>P</th>
              <th>+/-</th>
              <th>PIM</th>
              <th>S</th>
              <th>PPG</th>
              <th>H</th>
              <th>TOI</th>
              <th>FO%</th>
            </tr>
          </thead>
          <tbody>
            <tr className="player_row">
              <td>99 Test Forward</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr className="player_row">
              <td>99 Test Forward</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr className="player_row">
              <td>99 Test Forward</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
        <table className="gameSheet_table_defense">
          <thead>
            <tr className="player_row">
              <th># Defense</th>
              <th>G</th>
              <th>A</th>
              <th>P</th>
              <th>+/-</th>
              <th>PIM</th>
              <th>S</th>
              <th>PPG</th>
              <th>H</th>
              <th>TOI</th>
            </tr>
          </thead>
          <tbody>
            <tr className="player_row">
              <td>44 Test Defense</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr className="player_row">
              <td>44 Test Defense</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr className="player_row">
              <td>44 Test Defense</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
        <table className="gameSheet_table_goalies">
          <thead>
            <tr className="player_row">
              <th className="name_row"># Goalies</th>
              <th>EV</th>
              <th>PP</th>
              <th>SH</th>
              <th>GA</th>
              <th>Save-Shots</th>
              <th>SV%</th>
            </tr>
          </thead>
          <tbody>
            <tr className="player_row">
              <td className="name_row">33 Test Goalie</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr className="player_row">
              <td className="name_row">33 Test Goalie</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default BoxScore;
