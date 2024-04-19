import React, {useRef} from "react";
import "./gameControls.css"

function GameControls({setSectionID}) {
    const rosterButton = useRef();
    const eventButton = useRef();

    const handleFilterButton = (buttonClass) => {
        if(buttonClass === "game_roster_btn") {
          rosterButton.current.className = "game_roster_btn selected"
          eventButton.current.className = "game_events_btn"
          setSectionID("ROSTER")
        } else if(buttonClass === "game_events_btn") {
          eventButton.current.className = "game_events_btn selected"
          rosterButton.current.className = "game_roster_btn"
          setSectionID("EVENTS")
        }
      }

  return (
    <div className="game_controls_container">
      <div className="game_filter_controls">
        <button
          className="game_roster_btn"
          ref={rosterButton}
          onClick={() => handleFilterButton("game_roster_btn")}
        >
            Roster
        </button>
        <button
          className="game_events_btn selected"
          ref={eventButton}
          onClick={() => handleFilterButton("game_events_btn")}
        >
            Events
        </button>
      </div>
    </div>
  );
}

export default GameControls;
