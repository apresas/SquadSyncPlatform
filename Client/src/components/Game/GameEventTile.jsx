import React, { useEffect, useState, useRef } from "react";
import "./gameEvent.css";
import { LuSiren } from "react-icons/lu";
import axios from "axios";

function GameEventTile({
  homeTeam,
  awayTeam,
  homeRoster,
  awayRoster,
  data,
  filteredPlayers,
  length,
  homeLoading,
  awayLoading,
  events,
}) {
  const [bannerColor, setBannerColor] = useState();
  const [homeLogoOpacity, setHomeLogoOpacity] = useState(0);
  const [awayLogoOpacity, setAwayLogoOpacity] = useState(0);
  const [homeOpacity, setHomeOpacity] = useState(1);
  const [awayOpacity, setAwayOpacity] = useState(1);
  const [eventLogo, setEventLogo] = useState();

  const homeScore = useRef(0);
  const awayScore = useRef(0);
  // const score = useRef({
  //   homeScore: 0,
  //   awayScore: 0,
  // });

  // const [homeScore, setHomeScore] = useState(0)
  // const [awayScore, setAwayScore] = useState(0)

  // const [testHomeScore, setTestHomeScore] = useState(0)
  // const [testAwayScore, setTestAwayScore] = useState(0)

  // const score = useRef({
  //   homeScore: homeScore,
  //   awayScore: awayScore,
  // })

  const [testHomeScore, setTestHomeScore] = useState(0);
  const [testAwayScore, setTestAwayScore] = useState(0);

  const prevHomeScore = useRef(0);
  const prevAwayScore = useRef(0);

  const updateScore = (homeScore, awayScore) => {
    setTestHomeScore(homeScore);
    setTestAwayScore(awayScore);
  };

  const count = useRef(0);
  const [goalScorer, setGoalScorer] = useState({
    playerID: "",
    firstName: "",
    lastName: "",
    jerseyNumber: "",
  });
  const [primaryAssistPlayer, setPrimaryAssistPlayer] = useState({
    playerID: "",
    firstName: "",
    lastName: "",
    jerseyNumber: "",
  });
  const [secondaryAssistPlayer, setSecondaryAssistPlayer] = useState({
    playerID: "",
    firstName: "",
    lastName: "",
    jerseyNumber: "",
  });

  useEffect(() => {
    prevAwayScore.current = testAwayScore;
    prevHomeScore.current = testHomeScore;
  }, [testAwayScore, testHomeScore]);

  useEffect(() => {
    if (data.scoreTeam === homeTeam.teamID) {
      setBannerColor(homeTeam.primaryColor);
      setHomeLogoOpacity(0.5);
      setAwayOpacity(0.5);
      setEventLogo(homeTeam.logo);
      // setTestHomeScore((score) => score + 1)
      // homeScore.current += 1;
      // awayScore.current += 0;
    } else if (data.scoreTeam === awayTeam.teamID) {
      setBannerColor(awayTeam.primaryColor);
      setAwayLogoOpacity(0.5);
      setHomeOpacity(0.5);
      setEventLogo(awayTeam.logo);
      // setTestAwayScore((score) => score + 1)
      // homeScore.current += 0;
      // awayScore.current += 1;
    }

    // if(data.type === "HOME") {
    //   homeScore.current = 1;
    //   awayScore.current = 1;
    // }
    // if(data.type === "AWAY") {
    //   awayScore.current = 1;
    //   homeScore.current = 0;
    // }

    // {events.forEach((event) => {
    //   if(event.type === "HOME"){
    //     let count = 0
    //     count += 1
    //     console.log(count)
    //     setTestHomeScore(count)
    //   } else if(event.type === "AWAY")
    //   setTestAwayScore((score) => score + 1)

    // })}
    // count.current += 1
  }, []);

  useEffect(() => {
    if (homeLoading === false) {
      {
        homeRoster.map((player) => {
          if (player.playerID === data.scorerID) {
            setGoalScorer({
              teamID: player.teamID,
              playerID: player.playerID,
              firstName: player.firstName,
              lastName: player.lastName,
              jerseyNumber: player.jerseyNumber,
            });
          }
          if (player.playerID === data.primaryAssistID) {
            setPrimaryAssistPlayer({
              playerID: player.playerID,
              firstName: player.firstName,
              lastName: player.lastName,
              jerseyNumber: player.jerseyNumber,
            });
          }
          if (player.playerID === data.secondaryAssistID) {
            setSecondaryAssistPlayer({
              playerID: player.playerID,
              firstName: player.firstName,
              lastName: player.lastName,
              jerseyNumber: player.jerseyNumber,
            });
          }
        });
      }
      // homeScore.current += 1;
      // let scoreCount = 0
      // scoreCount += 1;
      // setHomeScore(scoreCount)
    }
    if (awayLoading === false) {
      {
        awayRoster.map((player, i) => {
          if (player.playerID === data.scorerID) {
            setGoalScorer({
              teamID: player.teamID,
              playerID: player.playerID,
              firstName: player.firstName,
              lastName: player.lastName,
              jerseyNumber: player.jerseyNumber,
            });
          }
          if (player.playerID === data.primaryAssistID) {
            setPrimaryAssistPlayer({
              playerID: player.playerID,
              firstName: player.firstName,
              lastName: player.lastName,
              jerseyNumber: player.jerseyNumber,
            });
          }
          if (player.playerID === data.secondaryAssistID) {
            setSecondaryAssistPlayer({
              playerID: player.playerID,
              firstName: player.firstName,
              lastName: player.lastName,
              jerseyNumber: player.jerseyNumber,
            });
          }
        });
      }
      // awayScore.current += 1;
      // setAwayScore(() => + 1)
    } else {
      setGoalScorer({ firstName: "Loading..." });
    }
  }, [homeLoading, awayLoading]);

  useEffect(() => {
    updateScore(
      (homeScore) => homeScore + 1,
      (awayScore) => awayScore + 1
    );
  }, [goalScorer]);

  // console.log(data.homeScore)

  // console.log(testHomeScore)
  // console.log(events)

  // console.log(count)
  // console.log(score)

  // console.log(homeScore)
  // console.log(awayScore)

  // console.log(testHomeScore)

  // console.log(`prevAwayScore: ${prevAwayScore.current} newAwayScore: ${testAwayScore}`)
  // console.log(`prevHomeScore: ${prevHomeScore.current} newHomeScore: ${testHomeScore}`)

  return (
    <div className="gameEvent_tile_container">
      <section
        className="gameEvent_banner"
        style={{ backgroundColor: `${bannerColor}` }}
      >
        <img
          src={homeTeam.logo}
          alt=""
          className="home_banner_logo"
          style={{ opacity: `${homeLogoOpacity}` }}
        />
        <img
          src={awayTeam.logo}
          alt=""
          className="away_banner_logo"
          style={{ opacity: `${awayLogoOpacity}` }}
        />
        <div
          className="gameEvent_homeTeam"
          style={{ opacity: `${homeOpacity}` }}
        >
          <img src={homeTeam.logo} alt="" />
          <h2>{data.homeScore}</h2>
        </div>
        <div className="gameEvent_icon">
          <div className="gameEvent_icon_container">
            <LuSiren />
          </div>
          <p>Goal</p>
        </div>
        <div
          className="gameEvent_awayTeam"
          style={{ opacity: `${awayOpacity}` }}
        >
          <h2>{data.awayScore}</h2>
          <img src={awayTeam.logo} alt="" />
        </div>
      </section>
      <section className="gameEvent_tile_content">
        <div className="gameEvent_time_container">
          <p>{data.gameTime}</p>
          <small>{data.period}</small>
        </div>
        <div className="gameEvent_event_container">
          <img src={eventLogo} alt="Logo" />
          <div className="gameEvent_event">
            <h3>
              {goalScorer.firstName} {goalScorer.lastName} #
              {goalScorer.jerseyNumber}
            </h3>
            <div className="assist_container">
              {primaryAssistPlayer.playerID === "" ? <p>Unassisted</p> : (
                <p>
                  Assists: {primaryAssistPlayer.firstName}{" "}
                  {primaryAssistPlayer.lastName} #
                  {primaryAssistPlayer.jerseyNumber}
                </p>
              )}
              {secondaryAssistPlayer.playerID === "" ? null : (
                <p>
                  , {secondaryAssistPlayer.firstName}{" "}
                  {secondaryAssistPlayer.lastName} #
                  {secondaryAssistPlayer.jerseyNumber}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GameEventTile;
