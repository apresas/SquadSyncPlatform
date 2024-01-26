import React from "react";
import "./playerForm.css";
import PlayerDropdown from "./playerDropdown"

function PlayerForm() {
  return (
    <div className="player_form_container">
      <h2>Add Player</h2>
      <div className="field">
        <label htmlFor="">First Name</label>
        <input type="text" />
      </div>
      <div className="field">
        <label htmlFor="">Last Name</label>
        <input type="text" />
      </div>
      <div className="field">
        <label htmlFor="">Jersey Number</label>
        <input type="number" />
      </div>
      <div className="field">
        <label htmlFor="">Jersey Number</label>
        <PlayerDropdown />
      </div>

    </div>
  );
}

export default PlayerForm;
