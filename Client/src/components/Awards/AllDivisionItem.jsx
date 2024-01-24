import React, { useState, useEffect } from 'react'
import "./allDivision.css"
import teamData from "../../data/teams.json"
import rosterData from "../../data/rosterData.json"

function AllDivisionItem({
  player
}) {

  const [logo, setLogo] = useState();
  // const [color, setColor] = useState();

  useEffect(() => {
    {teamData.filter((data) => data.id === player.teamID).map((data) => {
      setLogo(data.logo)
    })}

    // {rosterData.filter((data) => data.teamID === player.teamID).map((data) => {
    //   setColor(data.primaryColor)
    // })}

  }, [player])


  // console.log(player)
  return (
    <div className="all_division_item_container">
        <div className="all_division_position">{player.position}</div>
        <div className="all_division_logo" >
            <img src={logo} alt="logo" />
        </div>
        <div className="all_division_info">
            <h2>{player.firstName} {player.lastName}</h2>
            <h3>{player.teamName}</h3>
            <small>{player.class}</small>
        </div>
    </div>
  )
}

export default AllDivisionItem