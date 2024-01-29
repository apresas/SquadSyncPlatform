import React, { useEffect, useState } from "react";
import "./playerForm.css";
import PlayerDropdown from "./playerDropdown";
import axios from "axios";
// import teamData from "../../data/teams.json";

function PlayerForm({ teamData }) {
  const positions = [
    { name: "Forward" },
    { name: "Defense" },
    { name: "Goalie" },
  ];
  const years = [
    { name: "Freshmen" },
    { name: "Sophomore" },
    { name: "Junior" },
    { name: "Senior" },
  ];

  const shootsCatches = [{ name: "L" }, { name: "R" }];

  const numbers = Array.from({ length: 99 }, (_, i) => i + 1);

  const jerseyNumbers = numbers.map((n) => ({ name: n }));

  // console.log(numbers);

  const [newPlayer, setNewPlayer] = useState({
    playerID: 0,
    firstName: "",
    lastName: "",
    height: 0,
    weight: 0,
    jerseyNumber: 0,
    position: "",
    handedness: "",
    class: "",
    teamID: 0,
  });

  const [currentTeamTitle, setCurrentTeamTitle] = useState();
  const [selectedTeamID, setSelectedTeamID] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [newPlayerID, setNewPlayerID] = useState(0);
  const [selectedHandedness, setSelectedHandedness] = useState();
  const [selectedJerseyNumber, setSelectedJerseyNumber] = useState("");
  const [playerFirstName, setPlayerFirstName] = useState("");
  const [playerLastName, setPlayerLastName] = useState("");
  const [playerHeight, setPlayerHeight] = useState();
  const [playerWeight, setPlayerWeight] = useState();
  const [playerJerseyNumber, setPlayerJerseyNumber] = useState();

  useEffect(() => {
    const newID = Math.floor(100000 + Math.random() * 900000);
    setNewPlayerID(newID);
  }, []);


  const submitPlayer = async (e) => {
    e.preventDefault();
    // setNewPlayer({
    //   playerID:  newPlayerID,
    //   firstName: playerFirstName,
    //   lastName: playerLastName,
    //   height: playerHeight,
    //   weight: playerWeight,
    //   jerseyNumber: playerJerseyNumber,
    //   position: selectedPosition,
    //   class: selectedClass,
    //   teamID: selectedTeamID,
    // });

    try {
      await axios.post("http://localhost:9200/players", newPlayer);
      console.log("Player Added");
    } catch (err) {
      console.log(err);
      console.log(newPlayer);
    }
  };

  useEffect(() => {
    console.log(newPlayer);
  }, [newPlayer]);

  const handleFormChange = (e) => {
    setNewPlayer((player) => ({
      ...player,
      [e.target.name]: e.target.value,
      playerID: newPlayerID,
      position: selectedPosition,
      handedness: selectedHandedness,
      class: selectedClass,
      teamID: selectedTeamID,
    }));
  };

  // console.log(newPlayer);

  // console.log(selectedClass)
  // console.log(selectedPosition)

  return (
    <form className="player_form_container">
      <h2>Add Player</h2>
      <div className="player_id_field">
        <div className="id_field field">
          <label htmlFor="">Player ID</label>
          <input
            type="text"
            disabled="disabled"
            value={newPlayerID}
            // name="playerID"
            onChange={handleFormChange}
          />
        </div>
        <div className="id_field field">
          <label htmlFor="">Team ID</label>
          <input
            type="text"
            disabled="disabled"
            value={selectedTeamID}
            name="teamID"
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className="player_name_field">
        <div className="field">
          <label htmlFor="">First Name</label>
          <input
            name="firstName"
            type="text"
            onChange={handleFormChange}
            // onChange={(e) => setPlayerFirstName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="">Last Name</label>
          <input
            name="lastName"
            type="text"
            onChange={handleFormChange}
            // onChange={(e) => setPlayerLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="player_vitals_field">
        <div className="field">
          <label htmlFor="">Height (in)</label>
          <input
            name="height"
            type="number"
            onChange={handleFormChange}
            // onChange={(e) => setPlayerHeight(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="">Weight (lbs)</label>
          <input
            name="weight"
            type="number"
            onChange={handleFormChange}
            // onChange={(e) => setPlayerWeight(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="">Jersey Number</label>
        <input
          name="jerseyNumber"
          type="number"
          onChange={handleFormChange}
          // onChange={(e) => setPlayerJerseyNumber(e.target.value)}
        />
      </div>
      <div className="field dropdown_field_container">
        <PlayerDropdown
          data={teamData}
          type="Team"
          setSelectedTeamID={setSelectedTeamID}
          currentTeamTitle={currentTeamTitle}
          setCurrentTeamTitle={setCurrentTeamTitle}
          onChange={handleFormChange}
        />
        <PlayerDropdown
          data={positions}
          type="Position"
          setSelectedPosition={setSelectedPosition}
          onChange={handleFormChange}
        />
        <PlayerDropdown
          data={shootsCatches}
          type="Handedness"
          setSelectedHandedness={setSelectedHandedness}
          onChange={handleFormChange}
        />
        <PlayerDropdown
          data={years}
          type="Class"
          setSelectedClass={setSelectedClass}
          onChange={handleFormChange}
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
