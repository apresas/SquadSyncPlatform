import React, { useState, useEffect} from 'react'
import teamData from "../../data/teams.json"

function ChampionshipTile({id}) {
const [logo, setLogo] = useState();
const [schoolName, setSchoolName] = useState();
useEffect(() => {
    {teamData.map((data) => {
        if(data.id === id) {
            setLogo(data.logo)
            setSchoolName(data.schoolName)
        }
    })}
}, [id])

  return (
    <div className="champions" id={9}>
    <div className="champions_item">
      <h2>Blue Jackets Cup</h2>
      <h2>Champions</h2>
      <div className="champion_logo_container">
        <img src={logo} alt="logo" />
      </div>
      <h3>{schoolName}</h3>
    </div>
  </div>
  )
}

export default ChampionshipTile