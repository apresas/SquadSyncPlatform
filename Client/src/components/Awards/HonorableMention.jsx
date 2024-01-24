import React from "react";
import HonorableItem from "./HonorableItem";
import "./honorableMention.css";
import teamData from "../../data/teams.json";
import playerAwards from "../../data/playerAwards.json";

function HonorableMention() {
  return (
    <div className="hororable_content_container">
      <div className="honorable_column">
        {playerAwards
          .filter((data) => data.category === "honorableMention")
          .map((data) => <HonorableItem key={data.playerID} player={data} />)
          .slice(0, 6)}
      </div>
      <div className="honorable_column">
        {playerAwards
          .filter((data) => data.category === "honorableMention")
          .map((data) => <HonorableItem key={data.playerID} player={data} />)
          .slice(7, 13)}
      </div>
      <div className="honorable_column">
        {playerAwards
          .filter((data) => data.category === "honorableMention")
          .map((data) => <HonorableItem key={data.playerID} player={data} />)
          .slice(14, 22)}
      </div>
    </div>
  );
}

export default HonorableMention;
