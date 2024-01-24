import React from "react";
import "./allstar.css";
import allStarRoster from "../../data/allstarRoster.json";
import TitleBar from "../TitleBar";
import AllstarPlayer from "./AllstarPlayer";

function Allstar() {
  return (
    <div className="allstar_container">
      <div className="allstar_content_container">
        <TitleBar title="CHC Senior All-Star Game" subtitle="2023-2024" />
        <h1 className="roster_title">Roster</h1>
        <h2 className="allstar_date_title">Sat. March 4, 2024 - 6:15pm @Easton</h2>
        <div className="allstar_team_container">
          <div className="home_team">
            <h1>Blue Team</h1>
            <h2>Forwards</h2>
            <ul className="allstar_forward_grid">
            {allStarRoster
                .map((team) => team.blueTeam.filter((forward) => forward.position === "F")).map((player) => (player).map((player, i) => {
                  console.log(player, i)
                  return (<AllstarPlayer key={i} data={player}/>)
                  }))}
            </ul>
            <h2>Defense</h2>
            <ul className="allstar_defense_grid">
            {allStarRoster
                .map((team) => team.blueTeam.filter((forward) => forward.position === "D")).map((player) => (player).map((player, i) => {
                  console.log(player, i)
                  return (<AllstarPlayer key={i} data={player}/>)
                  }))}
            </ul>
            <h2>Goalies</h2>
            <ul className="allstar_goalies_grid">
            {allStarRoster
                .map((team) => team.blueTeam.filter((forward) => forward.position === "G")).map((player) => (player).map((player, i) => {
                  console.log(player, i)
                  return (<AllstarPlayer key={i} data={player}/>)
                  }))}
            </ul>
          </div>
          <div className="away_team">
            <h1>Red Team</h1>
            <h2>Forwards</h2>
            <ul className="allstar_forward_grid">
              {allStarRoster
                .map((team) => team.redTeam.filter((forward) => forward.position === "F")).map((player) => (player).map((player, i) => {
                  console.log(player, i)
                  return (<AllstarPlayer key={i} data={player}/>)
                  }))}
            </ul>
            <h2>Defense</h2>
            <ul className="allstar_defense_grid">
            {allStarRoster
                .map((team) => team.redTeam.filter((forward) => forward.position === "D")).map((player) => (player).map((player, i) => {
                  console.log(player, i)
                  return (<AllstarPlayer key={i} data={player}/>)
                  }))}
            </ul>
            <h2>Goalies</h2>
            <ul className="allstar_goalies_grid">
            {allStarRoster
                .map((team) => team.redTeam.filter((forward) => forward.position === "G")).map((player) => (player).map((player, i) => {
                  console.log(player, i)
                  return (<AllstarPlayer key={i} data={player}/>)
                  }))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Allstar;
