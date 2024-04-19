import React, {useRef} from "react";
import "./teamFilter.css"

function TeamFilter({homeTeam, awayTeam, setFilterTeamID}) {
    const homeButton = useRef();
    const awayButton = useRef();

    const handleFilterButton = (buttonClass) => {
        if(buttonClass === "team_home_btn") {
          homeButton.current.className = "team_home_btn selected"
          awayButton.current.className = "team_away_btn"
          setFilterTeamID(homeTeam.teamID)
        //   setSectionID("ROSTER")
        } else if(buttonClass === "team_away_btn") {
          awayButton.current.className = "team_away_btn selected"
          homeButton.current.className = "team_home_btn"
          setFilterTeamID(awayTeam.teamID)
        //   setSectionID("EVENTS")
        }
      }
  return (
    <div className="team_filter_container">
      <div className="team_filter_controls">
        <button
          className="team_home_btn selected"
          ref={homeButton}
          onClick={() => handleFilterButton("team_home_btn")}
        >
          {homeTeam.schoolName}
        </button>
        <button
          className="team_away_btn"
          ref={awayButton}
          onClick={() => handleFilterButton("team_away_btn")}
        >
          {awayTeam.schoolName}
        </button>
      </div>
    </div>
  );
}

export default TeamFilter;
