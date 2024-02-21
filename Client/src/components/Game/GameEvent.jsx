import  { useEffect, useRef } from "react";
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
  eventSubmit,
  setGameEvents,
  gameEvents,
}) {

  // useEffect(() => {
  //   let eventList = [];
  //   {gameEvents
  //     .filter((event) => event.gameID === currentGame.gameID)
  //     .forEach(event => {
  //     eventList.push(event);
  //   })}
  //   setCurrentEvents(eventList);
  // }, [currentGame.gameID, gameEvents, setCurrentEvents])

  useEffect(() => {
    getGameEvents(currentGame.gameID);
  }, [currentGame]);

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
              events={gameEvents}
            />
          );
        })}
      </section>
    </div>
  );
}

export default GameEvent;
