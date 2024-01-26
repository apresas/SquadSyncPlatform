import React, { useEffect, useState } from "react";
import "./playerForm.css";
import PlayerDropdown from "./playerDropdown";
// import teamData from "../../data/teams.json";

function PlayerForm({ teamData }) {
  const positions = [{ name: "Forward" }, { name: "Defense" }, { name: "Goalie" }];
  const years = [
    { name: "Freshmen" },
    { name: "Sophomore" },
    { name: "Junior" },
    { name: "Senior" },
  ];

  const [newPlayer, setNewPlayer] = useState({
    playerID: 0,
    firstName: "",
    lastName: "",
    height: 0,
    weight: 0,
    jerseyNumber: 0,
    position: "",
    class: "",
    teamID: 0,
  });

  const [currentTeamTitle, setCurrentTeamTitle] = useState();
  const [selectedTeamID, setSelectedTeamID] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [newPlayerID, setNewPlayerID] = useState(0);
  const [playerFirstName, setPlayerFirstName] = useState("");
  const [playerLastName, setPlayerLastName] = useState("");
  const [playerHeight, setPlayerHeight] = useState();
  const [playerWeight, setPlayerWeight] = useState();
  const [playerJerseyNumber, setPlayerJerseyNumber] = useState();

  useEffect(() => {
    // const min = 0;
    // const max = 1000000;
    // const random = Math.random() * (max - min);
    // const newID = Math.round(random);
    const newID = Math.floor(100000 + Math.random() * 900000)
    setNewPlayerID(newID);
  }, []);

  const submitPlayer = (e) => {
    e.preventDefault();
    setNewPlayer({
      playerID: { newPlayerID },
      firstName: { playerFirstName },
      lastName: { playerLastName },
      height: { playerHeight },
      weight: { playerWeight },
      jerseyNumber: { playerJerseyNumber },
      position: {selectedPosition},
      class: {selectedClass},
      teamID: { selectedTeamID },
    });
  };

  useEffect(() => {
    console.log(newPlayer);
  }, [newPlayer]);


  // console.log(selectedClass)
  // console.log(selectedPosition)

  return (
    <form className="player_form_container">
      <h2>Add Player</h2>
      <div className="player_id_field">
        <div className="id_field field">
          <label htmlFor="">Player ID</label>
          <input type="text" disabled="disabled" value={newPlayerID} />
        </div>
        <div className="id_field field">
          <label htmlFor="">Team ID</label>
          <input type="text" disabled="disabled" value={selectedTeamID} />
        </div>
      </div>
      <div className="player_name_field">
        <div className="field">
          <label htmlFor="">First Name</label>
          <input
            type="text"
            onChange={(e) => setPlayerFirstName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            onChange={(e) => setPlayerLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="player_vitals_field">
        <div className="field">
          <label htmlFor="">Height (in)</label>
          <input
            type="number"
            onChange={(e) => setPlayerHeight(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="">Weight (lbs)</label>
          <input
            type="number"
            onChange={(e) => setPlayerWeight(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="">Jersey Number</label>
        <input
          type="number"
          onChange={(e) => setPlayerJerseyNumber(e.target.value)}
        />
      </div>
      <div className="field dropdown_field_container">
        <PlayerDropdown
          data={teamData}
          type="Team"
          setSelectedTeamID={setSelectedTeamID}
          currentTeamTitle={currentTeamTitle}
          setCurrentTeamTitle={setCurrentTeamTitle}
        />
        <PlayerDropdown
          data={positions}
          type="Position"
          setSelectedPosition={setSelectedPosition}
        />
        <PlayerDropdown
          data={years}
          type="Class"
          setSelectedClass={setSelectedClass}
        />
      </div>
      <div className="player_form_controls">
        <button className="submit_player_btn" onClick={submitPlayer}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default PlayerForm;
