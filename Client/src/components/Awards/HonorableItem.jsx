import React, { useEffect, useState } from "react";
import "./honorableMention.css"
import teamData from "../../data/teams.json"

function HonorableItem({player}) {
    const [logo, setLogo] = useState();
    const [position, setPosition] = useState();
    useEffect(() => {
        {teamData.filter((data) => data.id === player.teamID).map((data) => {
            setLogo(data.logo)
        })}

        if(player.position === "Goalie") {
            setPosition("G")
          } else if(player.position === "Forward") {
            setPosition("F")
          } else if(player.position === "Defense") {
            setPosition("D")
          }
    }, [player])
  return <div className="honorable_item">
    <div className="honorable_logo">
        <img src={logo} alt="logo" />
    </div>
    <div className="honorable_info">
        <h2>{player.firstName} {player.lastName}</h2>
        <h3>{player.teamName}</h3>
    </div>
    <div className="honorable_position">
        {position}
    </div>
  </div>;
}

export default HonorableItem;
