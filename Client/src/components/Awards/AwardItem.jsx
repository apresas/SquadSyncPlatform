import React, { useEffect, useState } from "react";
import "./awardItem.css";
import { GrStar } from "react-icons/gr";
import rosterData from "../../data/rosterData.json"
import team from "../../data/teams.json"

function AwardItem({
  player
}) {
  const [color, setColor] = useState()
  const [logo, setLogo] = useState();

  const getLogo = (player) => {
    {rosterData.filter((data) => data.teamID === player.teamID).map((data) => (
      setColor(data.primaryColor)
    ))}

    {team.filter((data) => data.id === player.teamID).map((data) => {
      setLogo(data.logo)
    })}

  }

  useEffect(() => {
    getLogo(player)
  }, [player])

  

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
        <h3>{player.teamName}</h3>
        <h4>{player.class}</h4>
      </div>
      <div className="award_position_container" style={{color: `${color}`}}>
        <h3>{player.position}</h3>
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
