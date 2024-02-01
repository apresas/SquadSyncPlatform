/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import "./updatePlayerModal.css";
import PlayerDropdown from "../components/PlayerForm/playerDropdown";
function UpdatePlayerModal({
  open,
  currentPlayer,
  teamData,
  setOpenModal,
  getTestPlayers,
}) {
  
  const [updatedPlayer, setUpdatedPlayer] = useState({
    playerID: currentPlayer.playerID,
    playerImage: null,
    firstName: currentPlayer.firstName,
    lastName: currentPlayer.lastName,
    height: currentPlayer.height,
    weight: currentPlayer.weight,
    jerseyNumber: currentPlayer.jerseyNumber,
    position: currentPlayer.position,
    handedness: currentPlayer.handedness,
    class: currentPlayer.class,
    teamID: currentPlayer.teamID,
  });
  

  const [currentTeamTitle, setCurrentTeamTitle] = useState();
  const [selectedTeamID, setSelectedTeamID] = useState(currentPlayer.teamID);
  const [selectedPosition, setSelectedPosition] = useState(
    currentPlayer.position
  );
  const [selectedClass, setSelectedClass] = useState(currentPlayer.class);
  const [selectedHandedness, setSelectedHandedness] = useState(
    currentPlayer.handedness
  );
  const [playerFirstName, setPlayerFirstName] = useState(
    currentPlayer.firstName
  );
  const [playerLastName, setPlayerLastName] = useState(currentPlayer.lastName);
  const [playerHeight, setPlayerHeight] = useState(currentPlayer.height);
  const [playerWeight, setPlayerWeight] = useState(currentPlayer.weight);
  const [playerJerseyNumber, setPlayerJerseyNumber] = useState(
    currentPlayer.jerseyNumber
  );

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

  const submitUpdatedPlayer = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        "http://localhost:9200/players/" + currentPlayer.playerID,
        updatedPlayer
      );
      console.log("Player Updated");
      console.log(updatedPlayer);
      setOpenModal(false);
      getTestPlayers();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setUpdatedPlayer({
      playerID: currentPlayer.playerID,
      playerImage: null,
      firstName: playerFirstName,
      lastName: playerLastName,
      height: playerHeight,
      weight: playerWeight,
      jerseyNumber: playerJerseyNumber,
      teamID: selectedTeamID,
      handedness: selectedHandedness,
      position: selectedPosition,
      class: selectedClass,
    });
  }, [
    currentPlayer,
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

  useEffect(() => {
    setPlayerFirstName(currentPlayer.firstName);
    setPlayerLastName(currentPlayer.lastName);
    setPlayerHeight(currentPlayer.height);
    setPlayerWeight(currentPlayer.weight);
    setPlayerJerseyNumber(currentPlayer.jerseyNumber);
    setSelectedTeamID(currentPlayer.teamID);
    setSelectedPosition(currentPlayer.position);
    setSelectedHandedness(currentPlayer.handedness);
    setSelectedClass(currentPlayer.class)
  }, [currentPlayer])

//   useEffect(() => {
//     console.log(updatedPlayer)
//   }, [updatedPlayer])
//   console.log(currentPlayer)
//   console.log(playerFirstName)
// console.log(updatedPlayer)
  if (!open) {
    return null;
  }

  return (
    <div className="update_overlay">
      <div className="update_container">
        <div className="update_content">
          <form className="player_form_container">
            <h2>Update Player</h2>
            <div className="player_id_field">
              <div className="id_field field">
                <label htmlFor="">Player ID</label>
                <input
                  type="text"
                  disabled="disabled"
                  value={currentPlayer.playerID}
                />
              </div>
              <div className="id_field field">
                <label htmlFor="">Team ID</label>
                <input
                  type="text"
                  disabled="disabled"
                  value={currentPlayer.teamID}
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
                  defaultValue={currentPlayer.firstName}
                  onChange={(e) => setPlayerFirstName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  defaultValue={currentPlayer.lastName}
                  onChange={(e) => setPlayerLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="player_vitals_field">
              <div className="field">
                <label htmlFor="">Height (in)</label>
                <input
                  name="height"
                  type="number"
                  defaultValue={currentPlayer.height}
                  onChange={(e) => setPlayerHeight(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="">Weight (lbs)</label>
                <input
                  name="weight"
                  type="number"
                  defaultValue={currentPlayer.weight}
                  onChange={(e) => setPlayerWeight(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="">Jersey Number</label>
              <input
                name="jerseyNumber"
                type="number"
                defaultValue={currentPlayer.jerseyNumber}
                onChange={(e) => setPlayerJerseyNumber(e.target.value)}
              />
            </div>
            <div className="field dropdown_field_container">
              <PlayerDropdown
                data={teamData}
                type="Update Team"
                currentPlayer={currentPlayer}
                setSelectedTeamID={setSelectedTeamID}
                currentTeamTitle={currentTeamTitle}
                setCurrentTeamTitle={setCurrentTeamTitle}
              />
              <PlayerDropdown
                data={positions}
                currentPlayer={currentPlayer}
                type="Update Position"
                setSelectedPosition={setSelectedPosition}
              />
              <PlayerDropdown
                data={shootsCatches}
                currentPlayer={currentPlayer}
                type="Update Handedness"
                setSelectedHandedness={setSelectedHandedness}
              />
              <PlayerDropdown
                data={years}
                currentPlayer={currentPlayer}
                type="Update Class"
                setSelectedClass={setSelectedClass}
              />
            </div>
            <div className="update_player_form_controls">
              <button
                className="submit_player_btn"
                onClick={submitUpdatedPlayer}
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePlayerModal;
