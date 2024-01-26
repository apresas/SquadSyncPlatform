import React from "react";
import "./playerForm.css";
import PlayerDropdown from "./playerDropdown"
import teamData from "../../data/teams.json"

function PlayerForm() {
  const positions = [{name: "F"},{name: "D"} ,{name: "G"}]
  const years = [{name: "Freshmen"},{name: "Sophemore"} ,{name: "Junior"} ,{name: "Senior"}]

  return (
    <form className="player_form_container">
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
        <label htmlFor="">Height (in)</label>
        <input type="number" />
      </div>
      <div className="field">
        <label htmlFor="">Weight (lbs)</label>
        <input type="number" />
      </div>
      <div className="field">
        <label htmlFor="">Jersey Number</label>
        <input type="number" />
      </div>
      <div className="field dropdown_field_container">
        <PlayerDropdown data={teamData} type="Team"/>
        <PlayerDropdown data={positions} type="Position"/>
        <PlayerDropdown data={years} type="Year"/>
      </div>

    </form>
  );
}

export default PlayerForm;
