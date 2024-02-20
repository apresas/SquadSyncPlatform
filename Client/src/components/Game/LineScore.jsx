import React, { useState, useEffect, useRef } from "react";
import "./lineScore.css";

function LineScore({ homeTeam, awayTeam, lineScore, gameScore }) {
  // console.log(currentEvents);

  // console.log(lineScore);

  // const [firstHomeScore, setFirstHomeScore] = useState(0);
  // const [secondHomeScore, setSecondHomeScore] = useState(0);
  // const [thirdHomeScore, setThirdHomeScore] = useState(0);

  // const [firstAwayScore, setFirstAwayScore] = useState(0);
  // const [secondAwayScore, setSecondAwayScore] = useState(0);
  // const [thirdAwayScore, setThirdAwayScore] = useState(0);

  // useEffect(() => {
  //   getHomeFirst()
  //   getHomeSecond()
  //   getHomeThird()
  //   getAwayFirst()
  //   getAwaySecond()
  //   getAwayThird()
  // }, [currentEvents]);

  // useEffect(() => {
  //   setGameScores({
  //     homeScore: firstHomeScore + secondHomeScore + thirdHomeScore,
  //     awayScore: firstAwayScore + secondAwayScore + thirdAwayScore
  //   })
  // }, [firstHomeScore, secondHomeScore, thirdHomeScore, firstAwayScore, secondAwayScore, thirdAwayScore])

  // const getHomeFirst = () => {
  //   let count = 0;
  //   {
  //     currentEvents.map((event) => {
  //       if (event.scoreTeam === homeTeam.teamID && event.period === '1st') {
  //         count += 1;
  //       }
  //     });
  //   }
  //   setFirstHomeScore(count);
  // }

  // const getHomeSecond = () => {
  //   let count = 0;
  //   {
  //     currentEvents.map((event) => {
  //       if (event.scoreTeam === homeTeam.teamID && event.period === '2nd') {
  //         count += 1;
  //       }
  //     });
  //   }
  //   setSecondHomeScore(count);
  // }

  // const getHomeThird = () => {
  //   let count = 0;
  //   {
  //     currentEvents.map((event) => {
  //       if (event.scoreTeam === homeTeam.teamID && event.period === '3rd') {
  //         count += 1;
  //       }
  //     });
  //   }
  //   setThirdHomeScore(count);
  // }

  // const getAwayFirst = () => {
  //   let count = 0;
  //   {
  //     currentEvents.map((event) => {
  //       if (event.scoreTeam === awayTeam.teamID && event.period === '1st') {
  //         count += 1;
  //       }
  //     });
  //   }
  //   setFirstAwayScore(count);
  // }

  // const getAwaySecond = () => {
  //   let count = 0;
  //   {
  //     currentEvents.map((event) => {
  //       if (event.scoreTeam === awayTeam.teamID && event.period === '2nd') {
  //         count += 1;
  //       }
  //     });
  //   }
  //   setSecondAwayScore(count);
  // }

  // const getAwayThird = () => {
  //   let count = 0;
  //   {
  //     currentEvents.map((event) => {
  //       if (event.scoreTeam === awayTeam.teamID && event.period === '3rd') {
  //         count += 1;
  //       }
  //     });
  //   }
  //   setThirdAwayScore(count);
  // }

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
          <img src={homeTeam.logo} alt="Home Logo" />
          <h2>{homeTeam.mascotName}</h2>
        </div>
        <p>{lineScore.homeScore.first}</p>
        <p>{lineScore.homeScore.second}</p>
        <p>{lineScore.homeScore.third}</p>
        <p>{gameScore.homeScore}</p>
      </div>
      <div className="lineScore_team_item">
        <div className="lineScore_awayTeam">
          <img src={awayTeam.logo} alt="Home Logo" />
          <h2>{awayTeam.mascotName}</h2>
        </div>
        <p>{lineScore.awayScore.first}</p>
        <p>{lineScore.awayScore.second}</p>
        <p>{lineScore.awayScore.third}</p>
        <p>{gameScore.awayScore}</p>
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
