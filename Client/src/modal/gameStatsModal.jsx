import { useState, useEffect } from "react";
import "./gameStatsModal.css";
import axios from "axios";

function gameStatsModal({
  homeTeam,
  awayTeam,
  open,
  setOpenModal,
  currentGameID,
  gameStatsSubmit,
  setGameStatsSubmit
}) {
//   const [gameStatSubmit, setGameStatSubmit] = useState(false);

  const [gameStatID, setGameStatID] = useState(0);
  const [homeShots, setHomeShots] = useState(0);
  const [awayShots, setAwayShots] = useState(0);
  const [homeFaceoffs, setHomeFaceoffs] = useState(0);
  const [awayFaceoffs, setAwayFaceoffs] = useState(0);
  const [homePP, setHomePP] = useState(0);
  const [awayPP, setAwayPP] = useState(0);
  const [homePPG, setHomePPG] = useState(0);
  const [awayPPG, setAwayPPG] = useState(0);
  const [homeMinors, setHomeMinors] = useState(0);
  const [awayMinors, setAwayMinors] = useState(0);
  const [homeMajors, setHomeMajors] = useState(0);
  const [awayMajors, setAwayMajors] = useState(0);
  const [homeHits, setHomeHits] = useState(0);
  const [awayHits, setAwayHits] = useState(0);
  const [homeBlocks, setHomeBlocks] = useState(0);
  const [awayBlocks, setAwayBlocks] = useState(0);
  const [homeGiveaways, setHomeGiveaways] = useState(0);
  const [awayGiveaways, setAwayGiveaways] = useState(0);

  const [gameStat, setGameStat] = useState({
    gameStatsID: 0,
    gameID: currentGameID,
    homeShots: 0,
    awayShots: 0,
    homeFaceoffs: 0,
    awayFaceoffs: 0,
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
  });

  useEffect(() => {
    generateID();
  }, [gameStatsSubmit]);

  const generateID = () => {
    const newID = Math.floor(100000 + Math.random() * 900000);
    setGameStatID(newID);
  };

  useEffect(() => {
    setGameStat({
      gameStatsID: gameStatID,
      gameID: currentGameID,
      homeShots: homeShots,
      awayShots: awayShots,
      homeFaceoff: homeFaceoffs,
      awayFaceoff: awayFaceoffs,
      homePP: homePP,
      awayPP: awayPP,
      homePPG: homePPG,
      awayPPG: awayPPG,
      homeMinors: homeMinors,
      awayMinors: awayMinors,
      homeMajors: homeMajors,
      awayMajors: awayMajors,
      homeHits: homeHits,
      awayHits: awayHits,
      homeBlocks: homeBlocks,
      awayBlocks: awayBlocks,
      homeGiveaways: homeGiveaways,
      awayGiveaways: awayGiveaways,
    });
  }, [
    gameStatID,
    homeShots,
    awayShots,
    homeFaceoffs,
    awayFaceoffs,
    homePP,
    awayPP,
    homePPG,
    awayPPG,
    homeMinors,
    awayMinors,
    homeMajors,
    awayMajors,
    homeHits,
    awayHits,
    homeBlocks,
    awayBlocks,
    homeGiveaways,
    currentGameID,
    awayGiveaways,
  ]);

  const handleClose = () => {
    setOpenModal(false);
    setGameStatsSubmit(false)
    // clearFields()
  };

  const submitGameStat = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9200/gameStat", gameStat);
      console.log("GameStat Added");
    } catch (err) {
      console.log(err);
    }
    setGameStatsSubmit(true);
    clearFields();
    handleClose()
  };

  const clearFields = () => {
    // setNewGameID(undefined);
    setHomeShots(0);
    setHomeFaceoffs(0);
    setHomeHits(0);
    setHomeBlocks(0);
    setHomeGiveaways(0);
    setHomePP(0);
    setHomePPG(0);
    setHomeMinors(0);
    setHomeMajors(0);
    setAwayShots(0);
    setAwayFaceoffs(0);
    setAwayHits(0);
    setAwayBlocks(0);
    setAwayGiveaways(0);
    setAwayPP(0);
    setAwayPPG(0);
    setAwayMinors(0);
    setAwayMajors(0);

  };

//   console.log(gameStat);

  if (!open) {
    return null;
  }
  return (
    <div className="stats_modal_overlay">
      <div className="stats_modal_container">
        <div className="stats_content">
          <form action="" className="home_stat_form">
            <div className="stats_title">
              <h2 className="modal_title">Home Stats</h2>
              <div className="modal_logo_container">
                <img className="title_logo" src={homeTeam.logo} alt="" />
                <small>{homeTeam.schoolName}</small>
              </div>
            </div>
            <div className="stats_field">
              <label htmlFor="home_shots">Shots</label>
              <input
                id="home_shots"
                type="number"
                onChange={(e) => setHomeShots(e.target.value)}
              />
            </div>
            <div className="stats_field">
              <label htmlFor="home_FO">Faceoffs</label>
              <input
                id="home_FO"
                type="number"
                onChange={(e) => setHomeFaceoffs(e.target.value)}
              />
            </div>
            <div className="stats_field">
              <label htmlFor="home_hits">Hits</label>
              <input
                id="home_hits"
                type="number"
                onChange={(e) => setHomeHits(e.target.value)}
              />
            </div>
            <div className="stats_field">
              <label htmlFor="home_blocks">Blocks</label>
              <input
                id="home_blocks"
                type="number"
                onChange={(e) => setHomeBlocks(e.target.value)}
              />
            </div>
            <div className="stats_field">
              <label htmlFor="home_giveAwy">Giveaways</label>
              <input
                id="home_giveAwy"
                type="number"
                onChange={(e) => setHomeGiveaways(e.target.value)}
              />
            </div>
            <div className="stats_field">
              <label htmlFor="home_PP">Powerplays</label>
              <input
                id="home_PP"
                type="number"
                onChange={(e) => setHomePP(e.target.value)}
              />
            </div>
            <div className="stats_field">
              <label htmlFor="home_PPG">Powerplay Goals</label>
              <input
                id="home_PPG"
                type="number"
                onChange={(e) => setHomePPG(e.target.value)}
              />
            </div>
            <div className="stats_field">
              <label htmlFor="home_minors">Minors</label>
              <input
                id="home_minors"
                type="number"
                onChange={(e) => setHomeMinors(e.target.value)}
              />
            </div>
            <div className="stats_field">
              <label htmlFor="home_majors">Majors</label>
              <input
                id="home_majors"
                type="number"
                onChange={(e) => setHomeMajors(e.target.value)}
              />
            </div>
          </form>
          <form action="" className="away_stat_form">
            <div className="stats_title">
              <h2 className="modal_title">Away Stats</h2>
              <div className="modal_logo_container">
                <img className="title_logo" src={awayTeam.logo} alt="" />
                <small>{awayTeam.schoolName}</small>
              </div>
            </div>
            <div className="stats_field">
              <label htmlFor="away_shots">Shots</label>
              <input
                id="away_shots"
                type="number"
                onChange={(e) => setAwayShots(e.target.value)}
              />
            </div>
            <div className="stats_field">
              <label htmlFor="away_FO">Faceoffs</label>
              <input
                id="away_FO"
                type="number"
                onChange={(e) => setAwayFaceoffs(e.target.value)}
              />
            </div>
            <div className="stats_field">
              <label htmlFor="away_hits">Hits</label>
              <input
                id="away_hits"
                type="number"
                onChange={(e) => setAwayHits(e.target.value)}
              />
            </div>
            <div className="stats_field">
              <label htmlFor="away_blocks">Blocks</label>
              <input
                id="away_blocks"
                type="number"
                onChange={(e) => setAwayBlocks(e.target.value)}
              />
            </div>
            <div className="stats_field">
              <label htmlFor="away_giveAwy">Giveaways</label>
              <input
                id="away_giveAwy"
                type="number"
                onChange={(e) => setAwayGiveaways(e.target.value)}
              />
            </div>
            <div className="stats_field">
              <label htmlFor="away_PP">Powerplays</label>
              <input
                id="away_PP"
                type="number"
                onChange={(e) => setAwayPP(e.target.value)}
              />
            </div>
            <div className="stats_field">
              <label htmlFor="away_PPG">Powerplay Goals</label>
              <input
                id="away_PPG"
                type="number"
                onChange={(e) => setAwayPPG(e.target.value)}
              />
            </div>
            <div className="stats_field">
              <label htmlFor="away_minors">Minors</label>
              <input
                id="away_minors"
                type="number"
                onChange={(e) => setAwayMinors(e.target.value)}
              />
            </div>
            <div className="stats_field">
              <label htmlFor="away_majors">Majors</label>
              <input
                id="away_majors"
                type="number"
                onChange={(e) => setAwayMajors(e.target.value)}
              />
            </div>
          </form>
          <div className="stats_controls">
            <button className="submit_btn btn" onClick={submitGameStat}>Submit</button>
            <button className="cancel_btn btn" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default gameStatsModal;
