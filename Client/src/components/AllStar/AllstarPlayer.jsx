import React, { useState, useEffect } from "react";
import "./allstarPlayer.css";
import TeamData from "../../data/teams.json";

function AllstarPlayer({ data }) {
  const [teamName, setTeamName] = useState();
  const [logo, setLogo] = useState();
  useEffect(() => {
    {
      TeamData.filter((team) => team.id === data.teamID).map((team) => {
        setTeamName(team.schoolName);
        setLogo(team.logo);
      });
    }
  }, [data]);
  return (
    <div className="allstar_player_container">
      <img src={logo} alt="Logo" />
      <div className="name_container">
        <h4 className="allstar_player_firstName">
          {data.firstName.toUpperCase()}
        </h4>
        <h3 className="allstar_player_lastName">
          {data.lastName.toUpperCase()}
        </h3>
      </div>
      <small className="allstar_player_school">{teamName}</small>
    </div>
  );
}

export default AllstarPlayer;
