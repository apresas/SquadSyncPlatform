import React, { useEffect, useState } from "react";
import "./awardItem.css";
import { GrStar } from "react-icons/gr";
import rosterData from "../../data/rosterData.json"
// import team from "../../data/teams.json"
import axios from "axios"

function AwardItem({
  player
}) {
  const [color, setColor] = useState()
  const [logo, setLogo] = useState();
  const [position, setPosition] = useState();
  const [teams, setTeams] = useState([])
  const [teamName, setTeamName] = useState()

  const getLogo = (player) => {
    {teams.filter((data) => data.teamID === player.teamID).map((data) => (
      setColor(data.primaryColor)
    ))}

    {teams.filter((data) => data.teamID === player.teamID).map((data) => {
      setLogo(data.logo)
    })}

    {teams.filter((team) => team.teamID === player.teamID).map((team) => {
      setTeamName(team.schoolName)
    })}
  }

  useEffect(() => {
    getTeams()
  }, [])

  useEffect(() => {
    getLogo(player)
    if(player.position === "Goalie") {
      setPosition("G")
    } else if(player.position === "Forward") {
      setPosition("F")
    } else if(player.position === "Defense") {
      setPosition("D")
    }
    // setPlayerTeam(player)
  }, [player, teams])

  useEffect(() => {
    setPlayerTeam(player)
  }, [teams])

  const setPlayerTeam = (player) => {
    {teams.filter((team) => team.teamID === player.teamID).map((team) => {
      console.log(team)
    })}
  }

  const getTeams = async() => {
    await axios
    .get("http://localhost:9200/team")
    .then((res) => {
      setTeams(res.data)
    }).catch((err) => console.log(err))
  }


  return (
    <div className="award_item_container" style={{backgroundColor: `${color}`, borderColor: `${color}`}}>
      {/* <div className="position_box"> */}
      {/* <div className="star_container">
        <GrStar />
        <GrStar />
        <GrStar />
        </div> */}
        {/* <h3>{player.position}</h3> */}
      {/* </div> */}
      <div className="award_logo_container">
        <img src={`${logo}`} alt="logo" />
      </div>
      <div className="award_item_info">
        <h2>{player.firstName} {player.lastName}</h2>
        <h3>{teamName}</h3>
        <h4>{player.class}</h4>
      </div>
      <div className="award_position_container" style={{color: `${color}`}}>
        <h3>{position}</h3>
              <div className="star_container">
        <GrStar />
        <GrStar />
        <GrStar />
        </div>
      </div>
    </div>
  );
}

export default AwardItem;
