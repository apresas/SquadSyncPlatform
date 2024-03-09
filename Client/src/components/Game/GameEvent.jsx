import { useEffect, useRef, useState } from "react";
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
  setStatus, 
}) {
  const homeButton = useRef();
  const awayButton = useRef();
  const addBtnRef = useRef();
  const finalRef = useRef();

  const [isFinal, setIsFinal] = useState(false)
  const [gameStatus, setGameStatus] = useState(false)
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
    getGameStatus(currentGameID)
  }, [])

  useEffect(() => {
    getGameEvents(currentGameID);
  }, [currentGameID]);

  useEffect(() => {
    getGameEvents(currentGameID);
  }, [eventSubmit]);


  const getGameStatus= async(gameID) => {
    await axios
    .get("http://localhost:9200/game/" + gameID)
    .then((res) => {
      setIsFinal(res.data.final)
    }).catch((err) => {console.log(err)})
  }

  const getGameEvents = async (gameID) => {
    await axios
      .get("http://localhost:9200/eventByGame/" + gameID)
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

  const handleFinal = async(isFinal) => {
    if(!isFinal) {
      finalRef.current.className = "final_btn final_selected"
      // finalRef.current.innerHTML = "Final"
      await axios
      .patch("http://localhost:9200/game/" + currentGameID, {final: true})
      .then(() => console.log("Final updated successfully"))
      .then(() => {
        setIsFinal(true)
      })
      .catch((err) => {console.log(err)})
    } else if(isFinal) {
      finalRef.current.className = "final_btn"
      // finalRef.current.innerHTML = "Set Final"
      await axios
      .patch("http://localhost:9200/game/" + currentGameID, {final: false})
      .then(() => console.log("Final updated successfully"))
      .then(() => {
        setIsFinal(false)
      })
      .catch((err) => {console.log(err)})
    }
  }


  useEffect(() => {
    if(isFinal) {
      addBtnRef.current.className = "gameEvent_add_btn final"
      setStatus("Final")

    } else {
      addBtnRef.current.className = "gameEvent_add_btn"

    }


  }, [isFinal])

  useEffect(() => {
    let lastIndex = 0
    if(gameEvents.length === 0 && !isFinal) {
      setStatus("TBD")
    } else if (gameEvents.length > 0 && !isFinal) {
      lastIndex = gameEvents.length - 1
      setStatus(gameEvents[lastIndex].period)
    }
  }, [gameEvents, isFinal])

  // console.log(gameEvents)

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
        <button className="gameEvent_add_btn" ref={addBtnRef} onClick={handleModalOpen}>
          <span>Add New Event</span>
          <MdOutlineAddBox />
        </button>
        <button className="final_btn" ref={finalRef} onClick={() => handleFinal(isFinal)}>
          {isFinal ? "Final" : "Set Final"}
        </button>
        {/* <button className="gameEvent_add_btn" onClick={handleModalOpen}>
          <MdPostAdd />
        </button> */}
      </div>
    </div>
  );
}

export default GameEvent;
