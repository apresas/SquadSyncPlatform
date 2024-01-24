import React, { useState, useEffect } from "react";
import BracketItem from "./BracketItem";
import TeamData from "../../data/teams.json";

function Matchup({gameID, homeTeamID, awayTeamID}) {


  return (
    <>
      <BracketItem  gameID={gameID} ID={homeTeamID}/>
      <BracketItem  gameID={gameID} ID={awayTeamID}/>
    </>
  );
}

export default Matchup;
