import React, { useState, useEffect } from "react";
import "./addScheduleModal.css";
import { format } from "date-fns";
import PlayerDropdown from "../components/PlayerForm/playerDropdown";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function AddScheduleModal({ teamData, open, setOpenModal }) {
  const [selected, setSelected] = useState();

  const [newGameID, setNewGameID] = useState();
  const [date, setDate] = useState();
  const [venue, setVenue] = useState();
  const [time, setTime] = useState();
  const [homeID, setHomeID] = useState();
  const [awayID, setAwayID] = useState();
  const [homeScore, setHomeScore] = useState();
  const [awayScore, setAwayScore] = useState();

  const [newGame, setNewGame] = useState({
    date: new Date(),
    arena: "",
    time: "",
    homeID: undefined,
    awayID: undefined,
    homeScore: 0,
    awayScore: 0,
  });

  const handleDayClick = (day) => {
    setSelected(day);
    const formatDate = format(day, "yyyy-MM-dd");
    setDate(formatDate);
  };

  useEffect(() => {
    generateID();
  }, []);

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
    });
  }, [newGameID, date, venue, time, homeScore, awayScore, homeID, awayID]);

  console.log(newGame);

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="update_overlay">
        <div className="update_container">
          <div className="update_content">
            <form className="player_form_container">
              <h2>Add Game</h2>
              <div className="date_time_field">
                <div className="date_picker_field">
                  <DayPicker selected={selected} onDayClick={handleDayClick} />
                </div>
                <div className="venue_time_field">
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
                  <div className="field team_field">
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
                  </div>
                  <div className="update_player_form_controls">
                    <button
                      className="submit_player_btn"
                      // onClick={submitUpdatedPlayer}
                    >
                      Submit
                    </button>
                    <button
                      className="submit_player_btn"
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
