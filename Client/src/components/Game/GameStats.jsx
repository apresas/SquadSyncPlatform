import React, { useEffect, useState } from "react";
import "./gameStats.css";
import GameStatRow from './GameStatRow'
import { MdPostAdd } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import axios from "axios";
function GameStats({currentGame, homeTeam, awayTeam, gameScore, handleStatsOpen, gameStats, gameStatsSubmit}) {

  const [currentGameStats, setCurrentGameStats] = useState({
    gameStatID: 0,
    gameID: currentGame.gameID,
    homeShots: 0,
    awayShots: 0,
    homeFaceoff: 0,
    awayFaceoff: 0,
    homePP: 0,
    awayPP: 0,
    homePPG: 0,
    awayPPG: 0,
    homeMinors: 0,
    awayMinors: 0,
    homeMajors: 0,
    awayMajors: 0,
    homeHits: 0,
    awayHits: 0,
    homeBlocks: 0,
    awayBlocks: 0,
    homeGiveaways: 0,
    awayGiveaway: 0,
    homeTakeaway: 0,
    awayTakeaway: 0,
  })

  const [homePIMs, setHomePIMs] = useState(0)
  const [awayPIMs, setAwayPIMs] = useState(0)

  const [homePP, setHomePP] = useState(0)
  const [awayPP, setAwayPP] = useState(0)

  const [homeFO, setHomeFO] = useState(0)
  const [awayFO, setAwayFO] = useState(0)

  const [homePK, setHomePK] = useState(0)
  const [awayPK, setAwayPK] = useState(0)

  // useEffect(() => {
  //   getGameStats(currentGame.gameID)
  // }, [currentGame.gameID])

  useEffect(() => {
    formatPIM(gameStats.homeMinors, gameStats.awayMinors)
    formatPP(gameStats.homeMinors, gameStats.awayMinors, gameStats.homePPG, gameStats.awayPPG)
    formatFO(gameStats.homeFO, gameStats.awayFO)
    formatSV( gameScore.homeScore, gameScore.awayScore, gameStats.homeShots, gameStats.awayShots)
  }, [gameStats, gameStatsSubmit, gameScore])

  useEffect(() => {
    formatPK(homePP, awayPP)
  }, [homePP, awayPP])

  // const getGameStats = async (gameID) => {
  //   await axios
  //     .get("http://localhost:9200/currentGameStats/" + gameID)
  //     .then((res) => {
  //       {res.data.map((data) => {
  //         setCurrentGameStats({
  //           gameStatID: data.gameStatID,
  //           gameID: currentGame.gameID,
  //           homeShots: data.home_shots,
  //           awayShots: data.away_shots,
  //           homeFaceoff: data.home_faceoff,
  //           awayFaceoff: data.away_faceoff,
  //           homePP: data.home_pp,
  //           awayPP: data.away_pp,
  //           homePPG: data.home_ppg,
  //           awayPPG: data.away_ppg,
  //           homeMinors: data.home_minors,
  //           awayMinors: data.away_minors,
  //           homeMajors: data.home_majors,
  //           awayMajors: data.away_majors,
  //           homeHits: data.home_hits,
  //           awayHits: data.away_hits,
  //           homeBlocks: data.home_blocks,
  //           awayBlocks: data.away_blocks,
  //           homeGiveaways: data.home_giveaways,
  //           awayGiveaway: data.away_giveaways,
  //           homeTakeaway: data.home_takeaways,
  //           awayTakeaway: data.away_takeaways,
  //         });
  //       })}
  //     })
  //     .catch((err) => console.log(err));
  // };

  const formatPIM = (homeMinors, awayMinors) => {
    const homePIMS = homeMinors * 2
    setHomePIMs(homePIMS)
    const awayPIMS = awayMinors * 2
    setAwayPIMs(awayPIMS)
  }

  const formatPP = (homePenalties, awayPenalties, homePPG, awayPPG) => {
    const homePP = homePPG/(homePPG + homePenalties)*100
    const homePPRounded = Math.round(homePP * 10) / 10
    setHomePP(homePPRounded)
    const awayPP = awayPPG/(awayPPG + awayPenalties)*100
    const awayPPRounded = Math.round(awayPP * 10) / 10
    setAwayPP(awayPPRounded)
  }

  const formatPK = (homePP, awayPP) => {
    setHomePK(100 - awayPP)
    setAwayPK(100 - homePP)
  }

  const formatFO = (homeFaceoff, awayFaceoff) => {
    const homeFO = ((homeFaceoff/(homeFaceoff + awayFaceoff))*100)
    const homeRounded = Math.round(homeFO *10) / 10
    const awayFO = ((awayFaceoff/(awayFaceoff + homeFaceoff))*100)
    const awayRounded = Math.round(awayFO *10) / 10
    setHomeFO(homeRounded)
    setAwayFO(awayRounded)
    // console.log(homeRounded)
    // console.log(awayRounded)
  }

  const formatSV = (homeScore, awayScore, homeShots, awayShots) => {
    const awaySaves = (homeShots - homeScore)
    const awaySVPct = parseFloat(((awaySaves / homeShots)).toFixed(3))
    console.log(`Away Saves: ${awaySaves}, Away Save%: ${awaySVPct}`)
    const homeSaves = (awayShots - awayScore)
    const homeSVPct = parseFloat(((homeSaves / awayShots)).toFixed(3))
    console.log(`Home Saves: ${homeSaves}, Home Save%: ${homeSVPct}`)
  }

  return (
    <div className="gameStats_container">
      <div className="gameStats_header">
        <img src={homeTeam.logo} alt="Home Logo" />
        <h2>Game Stats</h2>
        <img src={awayTeam.logo} alt="Home Logo" />
      </div>
      <div className="gameStats_content">
      <GameStatRow title="Shots on Goal" homeValue={gameStats.homeShots} awayValue={gameStats.awayShots} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor} percentage={false}/>
      <GameStatRow title="Faceoff %" homeValue={homeFO} awayValue={awayFO} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor} percentage={true}/>
      <GameStatRow title="Powerplays" homeValue={gameStats.homePP} awayValue={gameStats.awayPP} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor} percentage={false}/>
      <GameStatRow title="Powerplay %" homeValue={homePP} awayValue={awayPP} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor} percentage={true}/>
      <GameStatRow title="Penalty Minutes" homeValue={homePIMs} awayValue={awayPIMs} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor} percentage={false}/>
      <GameStatRow title="Penalty Kill %" homeValue={homePK} awayValue={awayPK} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor} percentage={true}/>
      <GameStatRow title="Hits" homeValue={gameStats.homeHits} awayValue={gameStats.awayHits} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor} percentage={false}/>
      <GameStatRow title="Blocked Shots" homeValue={gameStats.homeBlocks} awayValue={gameStats.awayBlocks} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor} percentage={false}/>
      <GameStatRow title="Giveaways" homeValue={gameStats.homeGiveaways} awayValue={gameStats.awayGiveaways} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor} percentage={false}/>
      <GameStatRow title="Takeaways" homeValue={gameStats.awayGiveaways} awayValue={gameStats.homeGiveaways} homeColor={homeTeam.primaryColor} awayColor={awayTeam.primaryColor} percentage={false}/>
      </div>
      <div className="gameStats_controls">
        {gameStats.isNull === true ? <button className="gameStat_add_btn" onClick={handleStatsOpen}><MdPostAdd /></button> : <button className="gameStat_update_btn"onClick={handleStatsOpen}><BiSolidEdit /></button>}
      </div>
    </div>
  );
}

export default GameStats;
