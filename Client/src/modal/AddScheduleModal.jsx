import React, { useState, useEffect } from "react";
import "./addScheduleModal.css";
import { format } from "date-fns";
import PlayerDropdown from "../components/PlayerForm/playerDropdown";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import axios from "axios";

function AddScheduleModal({
  teamData,
  open,
  setOpenModal,
  setGameSubmit,
  gameSubmit
}) {
  const [selected, setSelected] = useState();

  const [newGameID, setNewGameID] = useState();
  const [date, setDate] = useState();
  const [venue, setVenue] = useState();
  const [time, setTime] = useState();
  const [homeID, setHomeID] = useState();
  const [awayID, setAwayID] = useState();
  const [homeScore, setHomeScore] = useState();
  const [awayScore, setAwayScore] = useState();
  // const [gameSubmit, setGameSubmit] = useState(false);

  const [newGame, setNewGame] = useState({
    gameID: 0,
    date: "",
    arena: "",
    time: "",
    homeID: undefined,
    awayID: undefined,
    homeScore: 0,
    awayScore: 0,
    final: false
  });

  const handleDayClick = (day) => {
    setSelected(day);
    const formatDate = format(day, "yyyy-MM-dd");
    setDate(formatDate);
  };

  useEffect(() => {
    generateID();
  }, [gameSubmit]);

  const generateID = () => {
    const newID = Math.floor(100000 + Math.random() * 900000);
    setNewGameID(newID);
  };

  useEffect(() => {
    setNewGame({
      gameID: newGameID,
      date: date,
      arena: venue,
      time: time,
      homeID: homeID,
      awayID: awayID,
      homeScore: homeScore,
      awayScore: awayScore,
      final: false
    });
  }, [newGameID, date, venue, time, homeScore, awayScore, homeID, awayID]);

  const submitGame = async (e) => {
    e.preventDefault();
    try {
      // await axios.post("http://localhost:9200/schedule", newGame);
      await axios.post("http://localhost:9200/game", newGame);
      console.log("Game Added");
    } catch (err) {
      console.log(err);
    }
    // setGameSubmit(!gameSubmit);
    setGameSubmit(true)
    clearFields();
    setOpenModal(false);
  };

  const clearFields = () => {
    // setNewGameID(undefined);
    setDate("");
    setSelected(new Date());
    setVenue("");
    setTime("");
    setHomeID(undefined);
    setAwayID(undefined);
    setHomeScore(0);
    setAwayScore(0);
  };

  // console.log(newGame);

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="games_overlay">
        <div className="add_schedule_container">
          <div className="update_content">
            <form className="game_form_container">
              <h2>Add Game</h2>
              <div className="date_time_field">
                <div className="date_picker_field">
                  <DayPicker selected={selected} onDayClick={handleDayClick} />
                </div>
                <div className="game_form_field">
                  <div className="field">
                    <label htmlFor="">Venue</label>
                    <input
                      name="arena"
                      type="text"
                      onChange={(e) => setVenue(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="">Time</label>
                    <input
                      name="time"
                      type="time"
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <h3>Home Team</h3>
                    <PlayerDropdown
                      data={teamData}
                      type="Home Team"
                      setHomeID={setHomeID}
                    />
                  </div>
                  <div className="field">
                    <h3>Away Team</h3>
                    <PlayerDropdown
                      data={teamData}
                      type="Away Team"
                      setAwayID={setAwayID}
                    />
                  </div>
                  {/* <div className="field team_field">
                    <label htmlFor="">Home Score</label>
                    <input
                      name="homeScore"
                      type="number"
                      onChange={(e) => setHomeScore(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="">Away Score</label>
                    <input
                      name="awayScore"
                      type="number"
                      onChange={(e) => setAwayScore(e.target.value)}
                    />
                  </div> */}
                  <div className="update_player_form_controls">
                    <button className="submit_btn btn" onClick={submitGame}>
                      Submit
                    </button>
                    <button
                      className="cancel_btn btn"
                      onClick={() => setOpenModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddScheduleModal;
