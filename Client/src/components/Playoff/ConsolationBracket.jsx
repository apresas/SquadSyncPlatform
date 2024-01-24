import React from 'react'
import Matchup from "./Matchup";
import "./bracketLayout.css";
import ChampionshipTile from "./ChampionshipTile";

function ConsolationBracket() {
  return (
    <>
          <div className="bracket_container_consolation">
          <div className="prelim_round">
          <div className="connector_p2">
            <span />
          </div>
          <div className="matchup_p2">
            <Matchup gameID={8} homeTeamID={2} awayTeamID={11} />
          </div>
        </div>
        <div className="first_round">
          <div className="connector_1">
            <span />
          </div>
          <div className="matchup_1">
            <Matchup gameID={9} homeTeamID={4} awayTeamID={2} />
          </div>
          <div className="matchup_2">
            <Matchup gameID={10} homeTeamID={10} awayTeamID={5} />
          </div>
          <div className="connector_2">
            <span />
          </div>
          <div className="matchup_3">
            <Matchup gameID={11} homeTeamID={16} awayTeamID={15} />
          </div>
          <div className="matchup_4">
            <Matchup gameID={12} homeTeamID={13} awayTeamID={1} />
          </div>
        </div>
        <div className="semi_finals">
          <div className="connector_3">
            <span />
          </div>
          <div className="matchup_5">
            <Matchup gameID={13} homeTeamID={4} awayTeamID={5} />
          </div>
          <div className="matchup_6">
            <Matchup gameID={14} homeTeamID={16} awayTeamID={13} />
          </div>
        </div>
        <div className="division_finals">
          <div className="connector_4">
            <span />
          </div>
          <div className="matchup_7">
            <Matchup gameID={15} homeTeamID={4} awayTeamID={13} />
          </div>
        </div>
        <ChampionshipTile id={4}/>
      </div>
    </>
  )
}

export default ConsolationBracket