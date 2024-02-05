import React, { useState, useEffect } from "react";
import "./playerStatsModal.css";
import FormInput from "../components/PlayerForm/FormInput";

function PlayerStatsModal({
  open,
  currentPlayer,
  teamData,
  setOpenStats,
  getTestPlayers,
  getFilterTeam,
  filterTeamID,
}) {
  if (!open) {
    return null;
  }

  const [playerValues, setPlayerValues] = useState({
    playerID: currentPlayer.playerID,
    statID: "",
    games: 0,
    goals: 0,
    assists: 0,
  });

  const [goalieValues, setGoalieValues] = useState({
    playerID: currentPlayer.playerID,
    statID: "",
    games: 0,
    goalsAgainst: 0,
    shotsAgainst: 0,
  });

  const playerInputs = [
    {
      id: 1,
      name: "games",
      type: "number",
      label: "Games",
      errorMessage:
        "*Required* Name must only contain letters. No numbers or special characters.",
      //   required: true,
    },
    {
      id: 2,
      name: "goals",
      type: "number",
      label: "Goals",
      errorMessage:
        "*Required* Name must only contain letters. No numbers or special characters.",
      //   required: true,
    },
    {
      id: 3,
      name: "assists",
      type: "number",
      label: "Assists",
      errorMessage:
        "*Required* Must only contain numbers. No letters or special characters",
      //   required: true,
    },
  ];

  const goalieInputs = [
    {
      id: 1,
      name: "games",
      type: "number",
      label: "Games",
      errorMessage:
        "*Required* Name must only contain letters. No numbers or special characters.",
      //   required: true,
    },
    {
      id: 2,
      name: "goalsAgainst",
      type: "number",
      label: "Goals Against",
      errorMessage:
        "*Required* Name must only contain letters. No numbers or special characters.",
      //   required: true,
    },
    {
      id: 3,
      name: "shotsAgainst",
      type: "number",
      label: "Shot Against",
      errorMessage:
        "*Required* Must only contain numbers. No letters or special characters",
      //   required: true,
    },
  ];

  const handlePlayerFormChange = (e) => {
    setPlayerValues({ ...playerValues, [e.target.name]: e.target.value });
    console.log(playerValues)
  };

  const handleGoalieFormChange = (e) => {
    setGoalieValues({ ...goalieValues, [e.target.name]: e.target.value });
    console.log(goalieValues)
  };
  return (
    <div className="update_overlay">
      <div className="update_container">
        <div className="update_content">
          <form className="player_form_container">
            <section className="stats_player_info">
              <h1>
                {currentPlayer.firstName} {currentPlayer.lastName}
              </h1>
              {teamData.filter((data) => data.teamID === currentPlayer.teamID)
              .map((data, i) => (
                <small key={i}>{data.schoolName}</small>
              ))}
              {teamData
                .filter((data) => data.teamID === currentPlayer.teamID)
                .map((data, i) => (
                  <img
                    key={i}
                    className="stats_team_logo"
                    src={data.logo}
                    alt="logo"
                  />
                ))}
            </section>
            <h2>Add Stats</h2>
            <div className="player_stats_field">
              {currentPlayer.position === "Goalie"
                ? goalieInputs.map((input) => (
                    <FormInput
                      key={input.id}
                      {...input}
                      value={goalieValues[input.name]}
                      onChange={handleGoalieFormChange}
                    />
                  ))
                : playerInputs.map((input) => (
                    <FormInput
                      key={input.id}
                      {...input}
                      value={playerValues[input.name]}
                      onChange={handlePlayerFormChange}
                    />
                  ))}
              {/* <div className="field">
                <label htmlFor="">Games Played</label>
                <input
                  name="gamesPlayed"
                  type="number"
                  //   onChange={(e) => setPlayerHeight(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="">Goals</label>
                <input
                  name="goals"
                  type="number"
                  //   onChange={(e) => setPlayerWeight(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="">Assists</label>
                <input
                  name="assists"
                  type="number"
                  //   onChange={(e) => setPlayerHeight(e.target.value)}
                />
              </div> */}
            </div>
            <div className="field dropdown_field_container"></div>
            <div className="update_player_form_controls">
              <button
                className="submit_player_btn"
                // onClick={submitUpdatedPlayer}
              >
                Submit
              </button>
              <button
                className="submit_player_btn"
                onClick={() => setOpenStats(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PlayerStatsModal;
