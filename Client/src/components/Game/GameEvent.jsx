import { useEffect, useRef } from "react";
import GameEventTile from "./GameEventTile";
import "./gameEvent.css";
import axios from "axios";
// import { MdPostAdd } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";

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
  eventSubmit,
  setGameEvents,
  gameEvents,
  currentGameID,
}) {
  const homeButton = useRef();
  const awayButton = useRef();
  // console.log(currentGameID)

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
    getGameEvents(currentGameID);
  }, [currentGame]);

  useEffect(() => {
    getGameEvents(currentGameID);
  }, [eventSubmit]);

  const getGameEvents = async (gameID) => {
    await axios
      .get("http://localhost:9200/events/" + gameID)
      .then((res) => {
        setGameEvents(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleFilterButton = (buttonClass) => {
    if(buttonClass === "gameEvent_home_btn") {
      homeButton.current.className = "gameEvent_home_btn selected"
      awayButton.current.className = "gameEvent_away_btn"
    } else if(buttonClass === "gameEvent_away_btn") {
      awayButton.current.className = "gameEvent_away_btn selected"
      homeButton.current.className = "gameEvent_home_btn"
    }
  }

  return (
    <div className="gameEvent_container">
      <header className="gameEvent_header_container">
        <h2 className="gameEvent_title">Game Events</h2>
        <div className="gameEvent_filters">
          <button className="gameEvent_home_btn" ref={homeButton} onClick={() => handleFilterButton("gameEvent_home_btn")}>
            {homeTeam.schoolName}
          </button>
          <button className="gameEvent_away_btn selected" ref={awayButton} onClick={() => handleFilterButton("gameEvent_away_btn")}>
            {awayTeam.schoolName}
          </button>
        </div>
      </header>
      <section className="gameEvent_content">
        {gameEvents
          .filter((event) => event.gameID === currentGameID)
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
      <div className="gameEvent_controls">
        <button className="gameEvent_add_btn" onClick={handleModalOpen}>
          <span>Add New Event</span>
          <MdOutlineAddBox />
        </button>
        {/* <button className="gameEvent_add_btn" onClick={handleModalOpen}>
          <MdPostAdd />
        </button> */}
      </div>
    </div>
  );
}

export default GameEvent;
