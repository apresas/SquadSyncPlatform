import React from 'react'

function TeamHeader({filterTeam}) {
  return (
    <div
    className="team_title_container"
    style={{
      backgroundColor: `${filterTeam.primaryColor}`,
      color: `${filterTeam.secondaryColor}`,
    }}
  >
    <img className="team_logo" src={filterTeam.logo} alt="" />
    <h1 className="school_title">{filterTeam.schoolName}</h1>
    <h3 className="team_title">{filterTeam.mascotName}</h3>
  </div>
  )
}

export default TeamHeader