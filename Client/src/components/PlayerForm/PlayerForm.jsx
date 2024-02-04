import React, { useEffect, useState } from "react";
import "./playerForm.css";
import PlayerDropdown from "./playerDropdown";
import axios from "axios";
// import teamData from "../../data/teams.json";

function PlayerForm({ teamData, getTestPlayers, getFilterTeam, filterTeamID }) {
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

  // const numbers = Array.from({ length: 99 }, (_, i) => i + 1);
  // const jerseyNumbers = numbers.map((n) => ({ name: n }));

  const errorMessage = {
    nameError:
      "*Required* Name must only contain letters. No numbers or special characters.",
    numbersError:
      "*Required* Must only contain numbers. No letters or special characters",
  };

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

  const defaultTeamID = teamData.length + 1;

  const [currentTeamTitle, setCurrentTeamTitle] = useState();
  const [selectedTeamID, setSelectedTeamID] = useState('');
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [newPlayerID, setNewPlayerID] = useState(0);
  const [selectedHandedness, setSelectedHandedness] = useState();
  const [playerFirstName, setPlayerFirstName] = useState("");
  const [playerLastName, setPlayerLastName] = useState("");
  const [playerHeight, setPlayerHeight] = useState();
  const [playerWeight, setPlayerWeight] = useState();
  const [playerJerseyNumber, setPlayerJerseyNumber] = useState();

  const [submitted, setSubmitted] = useState(false);

  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  useEffect(() => {
    // const newID = Math.floor(100000 + Math.random() * 900000);
    // setNewPlayerID(newID);
    generateID()
  }, []);


  const generateID = () => {
    const newID = Math.floor(100000 + Math.random() * 900000);
    setNewPlayerID(newID);
  };

  useEffect(() => {
    setNewPlayer({
      playerID: newPlayerID,
      firstName: playerFirstName,
      lastName: playerLastName,
      height: playerHeight,
      weight: playerWeight,
      jerseyNumber: playerJerseyNumber,
      teamID: Number(selectedTeamID),
      handedness: selectedHandedness,
      position: selectedPosition,
      class: selectedClass,
    });
  }, [
    newPlayerID,
    playerFirstName,
    playerLastName,
    playerHeight,
    playerWeight,
    playerJerseyNumber,
    selectedTeamID,
    selectedPosition,
    selectedHandedness,
    selectedClass,
  ]);

  const submitPlayer = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9200/players", newPlayer);
      console.log("Player Added");
    } catch (err) {
      console.log(err);
    }

    // getTestPlayers();
    getFilterTeam(filterTeamID);
    generateID();
    clearFields();
  };

  const clearFields = () => {
    setPlayerFirstName("");
    setPlayerLastName("");
    setPlayerHeight(undefined);
    setPlayerWeight(undefined);
    setPlayerJerseyNumber(undefined);
    setSelectedTeamID('');
    setSelectedPosition(undefined);
    setSelectedHandedness(undefined);
    setSelectedClass(undefined);
    setSubmitted(true)
    generateID();
  };

  useEffect(() => {
    console.log(newPlayer);
    setSubmitted(false)
  }, [newPlayer]);

  // const [values, setValues] = useState({
  //   playerID: newPlayerID,
  //   teamID: selectedTeamID,
  //   firstName: "",
  //   lastName: "",
  //   height: "",
  //   weight: "",
  //   jerseyNumber: 0,
  //   position: selectedPosition,
  //   handedness: selectedHandedness,
  //   class: selectedClass,
  // });

  // const inputs = [
  //   {
  //     id: 1,
  //     name: "firstName",
  //     type: "text",
  //     label: "First Name",
  //     errorMessage:
  //       "*Required* Name must only contain letters. No numbers or special characters.",
  //     required: true,
  //   },
  //   {
  //     id: 2,
  //     name: "lastName",
  //     type: "text",
  //     label: "Last Name",
  //     errorMessage:
  //       "*Required* Name must only contain letters. No numbers or special characters.",
  //     required: true,
  //   },
  //   {
  //     id: 3,
  //     name: "weight",
  //     type: "number",
  //     label: "Weight",
  //     errorMessage:
  //       "*Required* Must only contain numbers. No letters or special characters",
  //     required: true,
  //   },
  //   {
  //     id: 4,
  //     name: "height",
  //     type: "number",
  //     label: "Height",
  //     errorMessage:
  //       "*Required* Must only contain numbers. No letters or special characters",
  //     required: true,
  //   },
  //   {
  //     id: 5,
  //     name: "jerseyNumber",
  //     type: "number",
  //     label: "Jersey Number",
  //     errorMessage:
  //       "*Required* Must only contain numbers. No letters or special characters",
  //     required: true,
  //   },
  // ];

  // const handleFormChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

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
          <input
            type="text"
            disabled="disabled"
            onChange={(e) => setSelectedTeamID(e.target.value)}
            value={selectedTeamID}
            name="teamID"
          />
        </div>
      </div>
      <div className="player_name_field">
        <div className="field">
          <label htmlFor="">First Name</label>
          <input
            name="firstName"
            type="text"
            pattern="^[A-Za-z\-\.]{0,60}$"
            required={true}
            onChange={(e) => setPlayerFirstName(e.target.value)}
            value={playerFirstName || ""}
            // onBlur={handleFocus}
            // focused={focused.toString()}
          />
          <span>{errorMessage.nameError}</span>
        </div>
        <div className="field">
          <label htmlFor="">Last Name</label>
          <input
            name="lastName"
            type="text"
            pattern="^[A-Za-z\-]{0,60}$"
            required={true}
            onChange={(e) => setPlayerLastName(e.target.value)}
            value={playerLastName || ""}
            // onBlur={handleFocus}
            // focused={focused.toString()}
          />
          <span>{errorMessage.nameError}</span>
        </div>
      </div>
      <div className="player_vitals_field">
        <div className="field">
          <label htmlFor="">Height (in)</label>
          <input
            name="height"
            type="number"
            min={0}
            max={100}
            required={true}
            onChange={(e) => setPlayerHeight(e.target.value)}
            value={playerHeight || ""}
          />
          <span>{errorMessage.numbersError}</span>
        </div>
        <div className="field">
          <label htmlFor="">Weight (lbs)</label>
          <input
            name="weight"
            type="number"
            min={0}
            max={400}
            required={true}
            onChange={(e) => setPlayerWeight(e.target.value)}
            value={playerWeight || ""}
          />
          <span>{errorMessage.numbersError}</span>
        </div>
      </div>
      <div className="field">
        <label htmlFor="">Jersey Number</label>
        <input
          name="jerseyNumber"
          type="number"
          min={1}
          max={99}
          required={true}
          onChange={(e) => setPlayerJerseyNumber(e.target.value)}
          value={playerJerseyNumber || ""}
        />
        <span>{errorMessage.numbersError}</span>
      </div>
      <div className="field dropdown_field_container">
        <PlayerDropdown
          data={teamData}
          type="Team"
          setSelectedTeamID={setSelectedTeamID}
          currentTeamTitle={currentTeamTitle}
          setCurrentTeamTitle={setCurrentTeamTitle}
          submitted={submitted}
        />
        <PlayerDropdown
          data={positions}
          type="Position"
          setSelectedPosition={setSelectedPosition}
          submitted={submitted}
        />
        <PlayerDropdown
          data={shootsCatches}
          type="Handedness"
          setSelectedHandedness={setSelectedHandedness}
          submitted={submitted}
        />
        <PlayerDropdown
          data={years}
          type="Class"
          setSelectedClass={setSelectedClass}
          submitted={submitted}
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
