import React, { useEffect, useState, useRef } from "react";
import GameEventTile from "./GameEventTile";
import "./gameEvent.css";
import axios from "axios";

function GameEvent({
  homeTeam,
  awayTeam,
  handleModalOpen,
  currentGame,
  filteredPlayers,
  homeRoster,
  awayRoster,
  homeLoading,
  awayLoading,
  setCurrentEvents,
  currentEvents,
  gameScore,
  eventSubmit,
  setGameEvents,
  gameEvents,
}) {
  const goals = [
    {
      scoreID: 0,
      homeScore: 0,
      awayScore: 1,
      goalTeam: "AWAY",
      time: "15:20",
      period: "1st",
      scorer: { name: "Steve Smith", jerseyNumber: 88 },
      assist1: { name: "Bob Smith", jerseyNumber: 22 },
      assist2: { name: "Danny Dimes", jerseyNumber: 44 },
    },
    {
      scoreID: 0,
      homeScore: 1,
      awayScore: 1,
      goalTeam: "HOME",
      time: "13:50",
      period: "1st",
      scorer: { name: "John Smith", jerseyNumber: 18 },
      assist1: { name: "Dale Jones", jerseyNumber: 28 },
      assist2: { name: "James Jones", jerseyNumber: 23 },
    },
  ];

  const count = useRef(0)

  // const [homeScore, setHomeScore] = useState();
  // const [awayScore, setAwayScore] = useState();

  const homeScore = useRef(0)
  const awayScore = useRef(0)

  // const score = useRef(0)

  // const [gameEvents, setGameEvents] = useState([]);
  // const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    let eventList = [];
    {gameEvents
      .filter((event) => event.gameID === currentGame.gameID)
      .forEach(event => {
      eventList.push(event);
    })}
    setCurrentEvents(eventList);
  }, [])

  useEffect(() => {
    getGameEvents(currentGame.gameID);

  }, [currentGame]);

  useEffect(() => {
    {gameEvents.map((event) => {
      if(event.type === "AWAY") {
        let count = 0
        count += 1
        // console.log(count)
      }
    })}

  }, [gameEvents])

  useEffect(() => {
    getGameEvents(currentGame.gameID)
  }, [eventSubmit])

  const getGameEvents = async (gameID) => {
    await axios
      .get("http://localhost:9200/events/" + gameID)
      .then((res) => {
        setGameEvents(res.data);
      })
      .catch((err) => console.log(err));
  };


  // console.log(currentEvents)

  return (
    <div className="gameEvent_container">
      <header className="gameEvent_header_container">
        <h2 className="gameEvent_title">Game Events</h2>
        <button className="gameEvent_add_btn" onClick={handleModalOpen}>
          add
        </button>
        <div className="gameEvent_controls">
          <button className="gameEvent_home_btn">{homeTeam.schoolName}</button>
          <button className="gameEvent_away_btn selected">{awayTeam.schoolName}</button>
        </div>
      </header>
      <section className="gameEvent_content">
        {/* {goals.map((data, i) => (
          <GameEventTile
            key={i}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            data={data}
          />
        ))} */}
        {gameEvents
        .filter((event) => event.gameID === currentGame.gameID)
        .map((data, i) => {
          return (
            <GameEventTile
              key={i}
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              homeRoster={homeRoster}
              awayRoster={awayRoster}
              data={data}
              filteredPlayers={filteredPlayers}
              length={gameEvents.length}
              homeLoading={homeLoading}
              awayLoading={awayLoading}
              count={count}
              events={gameEvents}
              homeScore={homeScore}
              awayScore={awayScore}
            />
          );
        })}
        {/* <GameEventTile homeTeam={homeTeam} awayTeam={awayTeam}/>
            <GameEventTile homeTeam={homeTeam} awayTeam={awayTeam}/>
            <GameEventTile homeTeam={homeTeam} awayTeam={awayTeam}/>
            <GameEventTile homeTeam={homeTeam} awayTeam={awayTeam}/>
            <GameEventTile homeTeam={homeTeam} awayTeam={awayTeam}/>
            <GameEventTile homeTeam={homeTeam} awayTeam={awayTeam}/> */}
      </section>
    </div>
  );
}

export default GameEvent;
