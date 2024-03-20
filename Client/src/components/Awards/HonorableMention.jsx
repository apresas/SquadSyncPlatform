import React from "react";
import HonorableItem from "./HonorableItem";
import "./honorableMention.css";
import teamData from "../../data/teams.json";
import playerAwards from "../../data/playerAwards.json";

function HonorableMention({ data }) {
  console.log(data)
  return (
    <div className="hororable_content_container">
      {/* <div className="honorable_column">
        {playerAwards
          .filter((data) => data.category === "honorableMention")
          .map((data) => <HonorableItem key={data.playerID} player={data} />)
          .slice(0, 7)}
      </div> */}
      <div className="honorable_column">
        {data
          .map((data) => <HonorableItem key={data.playerID} player={data} />)
          .slice(0, 7)}
      </div>
      {/* <div className="honorable_column">
        {playerAwards
          .filter((data) => data.category === "honorableMention")
          .map((data) => <HonorableItem key={data.playerID} player={data} />)
          .slice(8, 16)}
      </div> */}
      <div className="honorable_column">
        {data
          .map((data) => <HonorableItem key={data.playerID} player={data} />)
          .slice(8, 16)}
      </div>
      {/* <div className="honorable_column">
        {playerAwards
          .filter((data) => data.category === "honorableMention")
          .map((data) => <HonorableItem key={data.playerID} player={data} />)
          .slice(17, 24)}
      </div> */}
      <div className="honorable_column">
        {data
          .map((data) => <HonorableItem key={data.playerID} player={data} />)
          .slice(17, 24)}
      </div>
    </div>
  );
}

export default HonorableMention;
