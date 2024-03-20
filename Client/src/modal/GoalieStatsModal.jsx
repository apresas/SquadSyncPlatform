import { useState, useEffect, useRef } from "react";
import "./goalieStatsModal.css";
import axios from "axios";
import PlayerDropdown from "../components/PlayerForm/playerDropdown";
import { FaPlus, FaMinus } from "react-icons/fa6";

function GoalieStatsModal({
  currentGameID,
  homeTeam,
  awayTeam,
  open,
  homeSavePct,
  awaySavePct,
  homeSaves,
  awaySaves,
  homeShots,
  awayShots,
  gameScore,
  setOpenGoalieModal,
  setGoalieSubmit,
  goalieSubmit,
  selectedHomeGoalieOne,
  setSelectedHomeGoalieOne,
  selectedAwayGoalieOne,
  setSelectedAwayGoalieOne,
  setAwayGoalieStats,
  setHomeGoalieStats,
  goalieType,
}) {
  const addHomeGoalie = useRef();
  const [addHomeToggle, setAddHomeToggle] = useState(false);
  const [addAwayToggle, setAddAwayToggle] = useState(false);
  const [selected, setSelected] = useState(false);
  const [twoHomeGoalies, setTwoHomeGoalies] = useState(false);
  const [twoAwayGoalies, setTwoAwayGoalies] = useState(false);
  // const [homeTOIOne, setHomeTOIOne] = useState(45);
  // const [homeTOITwo, setHomeTOITwo] = useState(0);
  // const [awayTOIOne, setAwayTOIOne] = useState(0);
  // const [awayTOITwo, setAwayTOITwo] = useState(0);
  const [homeGoalies, setHomeGoalies] = useState([]);
  const [awayGoalies, setAwayGoalies] = useState([]);
  // const [selectedHomeGoalieOne, setSelectedHomeGoalieOne] = useState({});
  const [selectedHomeGoalieTwo, setSelectedHomeGoalieTwo] = useState({});
  // const [selectedAwayGoalieOne, setSelectedAwayGoalieOne] = useState({});
  const [selectedAwayGoalieTwo, setSelectedAwayGoalieTwo] = useState({});

  const [homeOneShotsAgainst, setHomeOneShotsAgainst] = useState(
    parseInt(awayShots)
  );
  const [awayOneShotsAgainst, setAwayOneShotsAgainst] = useState(
    parseInt(homeShots)
  );
  const [homeTwoShotsAgainst, setHomeTwoShotsAgainst] = useState(0);
  const [awayTwoShotsAgainst, setAwayTwoShotsAgainst] = useState(0);

  const [homeOneMinutes, setHomeOneMinutes] = useState(45);
  const [homeOneSeconds, setHomeOneSeconds] = useState(0);
  const [homeTwoMinutes, setHomeTwoMinutes] = useState(0);
  const [homeTwoSeconds, setHomeTwoSeconds] = useState(0);
  const [awayOneMinutes, setAwayOneMinutes] = useState(45);
  const [awayOneSeconds, setAwayOneSeconds] = useState(0);
  const [awayTwoMinutes, setAwayTwoMinutes] = useState(0);
  const [awayTwoSeconds, setAwayTwoSeconds] = useState(0);
  const [homeGoalieOneStats, setHomeGoalieOneStats] = useState({
    goalieStatsID: 0,
    playerID: null,
    gameID: currentGameID,
    saves: awayShots,
    shotsAgainst: awayShots,
    goalsAgainst: 0,
    savePct: homeSavePct,
    TOI: null,
  });
  const [awayGoalieOneStats, setAwayGoalieOneStats] = useState({
    goalieStatsID: 0,
    playerID: null,
    gameID: null,
    saves: null,
    shotsAgainst: homeShots,
    goalsAgainst: 0,
    savePct: null,
    TOI: null,
  });
  const [homeGoalieTwoStats, setHomeGoalieTwoStats] = useState({
    goalieStatsID: 0,
    playerID: null,
    gameID: currentGameID,
    saves: homeSaves,
    shotsAgainst: 0,
    goalsAgainst: 0,
    savePct: homeSavePct,
    TOI: null,
  });
  const [awayGoalieTwoStats, setAwayGoalieTwoStats] = useState({
    goalieStatsID: 0,
    playerID: null,
    gameID: null,
    saves: null,
    shotsAgainst: 0,
    goalsAgainst: 0,
    savePct: null,
    TOI: null,
  });

  const [newGoalieStatID, setNewGoalieStatID] = useState();

  const [homeGoalieStatID, setHomeGoalieStatID] = useState();
  const [awayGoalieStatID, setAwayGoalieStatID] = useState();

  const generateID = (type) => {
    if (type === "HOME") {
      const newID = Math.floor(100000 + Math.random() * 900000);
      setHomeGoalieStatID(newID);
    }
    if (type === "AWAY") {
      const newID = Math.floor(100000 + Math.random() * 900000);
      setAwayGoalieStatID(newID);
    }
  };

  useEffect(() => {
    if (goalieType === "UPDATE") {
      // setGameStatsID(gameStats.gameStatsID);
      // setHomeShots(gameStats.homeShots);
      // setAwayShots(gameStats.awayShots);
      // setHomeFaceoffs(gameStats.homeFO);
      // setAwayFaceoffs(gameStats.awayFO);
      // setHomePP(gameStats.homePP);
      // setAwayPP(gameStats.awayPP);
      // setHomePPG(gameStats.homePPG);
      // setAwayPPG(gameStats.awayPPG);
      // setHomeMinors(gameStats.homeMinors);
      // setAwayMinors(gameStats.awayMinors);
      // setHomeMajors(gameStats.homeMajors);
      // setAwayMajors(gameStats.awayMajors);
      // setHomeHits(gameStats.homeHits);
      // setAwayHits(gameStats.awayHits);
      // setHomeBlocks(gameStats.homeBlocks);
      // setAwayBlocks(gameStats.awayBlocks);
      // setHomeGiveaways(gameStats.homeGiveaways);
      // setHomeGiveaways(gameStats.homeGiveaways);
    }
  }, [open]);

  useEffect(() => {
    generateID("HOME");
    generateID("AWAY");
  }, [goalieSubmit]);

  useEffect(() => {
    generateID("HOME");
    generateID("AWAY");
    setSelected(false);
  }, []);

  useEffect(() => {
    getGoalies(homeTeam.teamID, awayTeam.teamID);
  }, [homeTeam, awayTeam]);

  useEffect(() => {
    setHomeGoalieOneStats({
      goalieStatsID: homeGoalieStatID,
      playerID: selectedHomeGoalieOne.playerID,
      gameID: currentGameID,
      teamID: homeTeam.teamID,
      saves: awayShots - gameScore.awayScore,
      savePct: homeSavePct,
      shotsAgainst: awayShots,
      goalsAgainst: gameScore.awayScore,
      TOI: parseFloat(homeOneMinutes + "." + homeOneSeconds),
    });
    setAwayGoalieOneStats({
      goalieStatsID: awayGoalieStatID,
      playerID: selectedAwayGoalieOne.playerID,
      gameID: currentGameID,
      teamID: awayTeam.teamID,
      saves: homeShots - gameScore.homeScore,
      savePct: awaySavePct,
      shotsAgainst: homeShots,
      goalsAgainst: gameScore.homeScore,
      TOI: parseFloat(awayOneMinutes + "." + awayOneSeconds),
    });

    setHomeGoalieTwoStats({
      goalieStatsID: 0,
      playerID: selectedHomeGoalieTwo.playerID,
      gameID: currentGameID,
      saves: homeTwoShotsAgainst - gameScore.awayScore,
      savePct: homeSavePct,
      shotsAgainst: parseInt(homeTwoShotsAgainst),
      goalsAgainst: gameScore.awayScore,
      TOI: parseFloat(homeTwoMinutes + "." + homeTwoSeconds),
    });
    setAwayGoalieTwoStats({
      goalieStatsID: 0,
      playerID: selectedAwayGoalieTwo.playerID,
      gameID: currentGameID,
      saves: awayTwoShotsAgainst - gameScore.homeScore,
      savePct: awaySavePct,
      shotsAgainst: parseInt(awayTwoShotsAgainst),
      goalsAgainst: gameScore.homeScore,
      TOI: parseFloat(awayTwoMinutes + "." + awayTwoSeconds),
    });
  }, [
    newGoalieStatID,
    selectedHomeGoalieOne,
    selectedHomeGoalieTwo,
    selectedAwayGoalieOne,
    selectedAwayGoalieTwo,
    currentGameID,
    homeSaves,
    homeSavePct,
    awaySaves,
    awaySavePct,
    homeOneMinutes,
    homeOneSeconds,
    awayOneMinutes,
    awayOneSeconds,
    homeTwoMinutes,
    homeTwoSeconds,
    awayTwoMinutes,
    awayTwoSeconds,
    gameScore,
    homeOneShotsAgainst,
    homeTwoShotsAgainst,
    awayOneShotsAgainst,
    awayTwoShotsAgainst,
    awayShots,
    homeShots,
  ]);

  const getGoalies = async (homeID, awayID) => {
    let endPoints = [
      "http://localhost:9200/playerByTeam/" + homeID + "/" + "Goalie",
      "http://localhost:9200/playerByTeam/" + awayID + "/" + "Goalie",
    ];
    await Promise.all(endPoints.map((endPoint) => axios.get(endPoint)))
      .then(
        axios.spread(({ data: homeGoalies }, { data: awayGoalies }) => {
          setHomeGoalies(homeGoalies);
          setAwayGoalies(awayGoalies);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const goalieStatSubmit = async (e) => {
    e.preventDefault();
    await axios
      .all([
        axios.post("http://localhost:9200/goalieStat", homeGoalieOneStats),
        axios.post("http://localhost:9200/goalieStat", awayGoalieOneStats),
      ])
      .then(() => {
        setGoalieSubmit(true);
      })
      .catch((err) => console.log(err));
    // await axios
    // .post("http://localhost:9200/goalieStat", homeGoalieOneStats)
    // console.log("Event Added");
    // setGoalieSubmit(true)
    // .catch(err => console.log(err))
    // await axios
    // .post("http://localhost:9200/goalieStat", awayGoalieOneStats)
    // console.log("Event Added");
    // setGoalieSubmit(true)
    // .catch(err => console.log(err))

    setGoalieSubmit(false);
    handleClose();
  };

  const handleClose = () => {
    setOpenGoalieModal(false);
    setGoalieSubmit(false);
  };

  const handleAddHomeGoalie = (e) => {
    e.preventDefault();
    console.log(addHomeGoalie.current);
    setAddHomeToggle(true);
    setTwoHomeGoalies(true);
  };
  const handleMinusHomeGoalie = (e) => {
    e.preventDefault();
    console.log(addHomeGoalie.current);
    setAddHomeToggle(false);
    setTwoHomeGoalies(false);
    // setHomeTOITwo(0);
  };

  const handleAddAwayGoalie = (e) => {
    e.preventDefault();
    console.log(addHomeGoalie.current);
    setAddAwayToggle(true);
    setTwoAwayGoalies(true);
  };
  const handleMinusAwayGoalie = (e) => {
    e.preventDefault();
    console.log(addHomeGoalie.current);
    setAddAwayToggle(false);
    setTwoAwayGoalies(false);
  };

  useEffect(() => {
    console.log(homeGoalieOneStats);
    console.log(awayGoalieOneStats);
    console.log(homeGoalieTwoStats);
    console.log(awayGoalieTwoStats);

    let homeGoalieStats = [];
    let awayGoaliesStats = [];
    homeGoalieStats.push(homeGoalieOneStats);
    homeGoalieStats.push(homeGoalieTwoStats);
    awayGoaliesStats.push(awayGoalieOneStats);
    awayGoaliesStats.push(awayGoalieTwoStats);
    setHomeGoalieStats(homeGoalieStats);
    setAwayGoalieStats(awayGoaliesStats);
  }, [
    homeGoalieOneStats,
    awayGoalieOneStats,
    homeGoalieTwoStats,
    awayGoalieTwoStats,
  ]);

  useEffect(() => {
    // console.log(selectedHomeGoalieOne);
    // console.log(selectedAwayGoalieOne);
    // console.log(selectedHomeGoalieTwo);
    // console.log(selectedAwayGoalieTwo);
  }, [
    selectedHomeGoalieOne,
    selectedAwayGoalieOne,
    selectedHomeGoalieTwo,
    selectedAwayGoalieTwo,
  ]);

  const handleGoalieSubmit = async () => {
    await axios.post("http://localhost:9200/goalieStats", homeGoalieOneStats);
    console.log("Event Added");
    setGoalieSubmit(true).catch((err) => console.log(err));
    await axios.post("http://localhost:9200/goalieStats", awayGoalieOneStats);
    console.log("Event Added");
    setGoalieSubmit(true).catch((err) => console.log(err));

    setGoalieSubmit(false);
    handleClose();
  };

  // useEffect(() => {
  //   if(selectedHomeGoalieTwo.playerID === undefined) {
  //     setTwoGoalies(false)
  //   } else if(selectedHomeGoalieTwo.playerID !== undefined) {
  //     setTwoGoalies(true)
  //   }
  // }, [selected])

  if (!open) {
    return null;
  }

  return (
    <>
      {goalieType === "UPDATE" ? (
        <div className="goalie_overlay">
          <div className="goalie_container">
            <div className="goalie_content">
              <div className="goalie_modal_title">
                <h2 className="modal_title">Update Goalie Stats</h2>
              </div>
              <div className="goalie_form_container">
                <form action="" className="home_goalie_form">
                  <div className="goalie_title">
                    <h2 className="modal_title">{homeTeam.schoolName}</h2>
                    <div className="modal_logo_container">
                      <img className="title_logo" src={homeTeam.logo} alt="" />
                      {/* <small>{homeTeam.schoolName}</small> */}
                    </div>
                  </div>
                  <section className="goalie_section">
                    <h4>Goalie 1</h4>
                    <div className="goalie_field">
                      {/* <label htmlFor="home_shots">Shots</label> */}
                      <PlayerDropdown
                        data={homeGoalies}
                        type="Home Goalies"
                        setSelectedHomeGoalie={setSelectedHomeGoalieOne}
                      />
                    </div>

                    {twoHomeGoalies ? (
                      <>
                        <div className="goalie_field">
                          <label htmlFor="home_TOI">TOI</label>
                          {/* <input
                          id="home_TOI"
                          type="number"
                          max={45}
                          min={0}
                          onChange={(e) => setHomeTOIOne(e.target.value)}
                        /> */}
                          <div id="time-input">
                            <input
                              type="text"
                              id="hours"
                              max="2"
                              dir="rtl"
                              onChange={(e) =>
                                setHomeOneMinutes(e.target.value)
                              }
                            />
                            <div id="colon">:</div>
                            <input
                              type="text"
                              id="minutes"
                              max="2"
                              onChange={(e) =>
                                setHomeOneSeconds(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="goalie_field">
                          <label htmlFor="home_shotsAgainst">
                            Shots Against
                          </label>
                          <input
                            id="home_shotsAgainst"
                            type="number"
                            max={awayShots}
                            min={0}
                            onChange={(e) =>
                              setHomeOneShotsAgainst(e.target.value)
                            }
                          />
                        </div>
                      </>
                    ) : null}
                    <div className="goalie_item_controls">
                      {!addHomeToggle ? (
                        <button
                          ref={addHomeGoalie}
                          className="add_goalie_two_btn"
                          onClick={handleAddHomeGoalie}
                        >
                          <FaPlus />
                        </button>
                      ) : (
                        <button
                          ref={addHomeGoalie}
                          className="add_goalie_two_btn"
                          onClick={handleMinusHomeGoalie}
                        >
                          <FaMinus />
                        </button>
                      )}
                    </div>
                  </section>
                  {twoHomeGoalies ? (
                    <section className="goalie_section">
                      <h4>Goalie 2</h4>
                      <div className="goalie_field">
                        {/* <label htmlFor="home_shots">Shots</label> */}
                        <PlayerDropdown
                          data={homeGoalies}
                          type="Home Goalies"
                          setSelectedHomeGoalie={setSelectedHomeGoalieTwo}
                          setSelected={setSelected}
                          selected={selected}
                        />
                      </div>
                      <div className="goalie_field">
                        <label htmlFor="home_TOI">TOI</label>
                        <div id="time-input">
                          <input
                            type="text"
                            id="hours"
                            max="2"
                            dir="rtl"
                            onChange={(e) => setHomeTwoMinutes(e.target.value)}
                          />
                          <div id="colon">:</div>
                          <input
                            type="text"
                            id="minutes"
                            max="2"
                            onChange={(e) => setHomeTwoSeconds(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="goalie_field">
                        <label htmlFor="home_shotsAgainst">Shots Against</label>
                        <input
                          id="home_shotsAgainst"
                          type="number"
                          onChange={(e) =>
                            setHomeTwoShotsAgainst(e.target.value)
                          }
                        />
                      </div>
                    </section>
                  ) : null}
                </form>
                <form action="" className="away_goalie_form">
                  <div className="goalie_title">
                    <h2 className="modal_title">{awayTeam.schoolName}</h2>
                    <div className="modal_logo_container">
                      <img className="title_logo" src={awayTeam.logo} alt="" />
                      {/* <small>{awayTeam.schoolName}</small> */}
                    </div>
                  </div>
                  <section className="goalie_section">
                    <h4>Goalie 1</h4>
                    <div className="goalie_field">
                      {/* <label htmlFor="away_shots">Shots</label> */}
                      <PlayerDropdown
                        data={awayGoalies}
                        type="Away Goalies"
                        setSelectedAwayGoalie={setSelectedAwayGoalieOne}
                      />
                    </div>
                    {twoAwayGoalies ? (
                      <>
                        <div className="goalie_field">
                          <label htmlFor="away_TOI">TOI</label>
                          <div id="time-input">
                            <input
                              type="text"
                              id="hours"
                              max="2"
                              dir="rtl"
                              onChange={(e) =>
                                setAwayOneMinutes(e.target.value)
                              }
                            />
                            <div id="colon">:</div>
                            <input
                              type="text"
                              id="minutes"
                              max="2"
                              onChange={(e) =>
                                setAwayOneSeconds(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="goalie_field">
                          <label htmlFor="home_shotsAgainst">
                            Shots Against
                          </label>
                          <input
                            id="home_shotsAgainst"
                            type="number"
                            max={homeShots}
                            min={0}
                            onChange={(e) =>
                              setAwayOneShotsAgainst(e.target.value)
                            }
                          />
                        </div>
                      </>
                    ) : null}
                    <div className="goalie_item_controls">
                      {!addAwayToggle ? (
                        <button
                          ref={addHomeGoalie}
                          className="add_goalie_two_btn"
                          onClick={handleAddAwayGoalie}
                        >
                          <FaPlus />
                        </button>
                      ) : (
                        <button
                          ref={addHomeGoalie}
                          className="add_goalie_two_btn"
                          onClick={handleMinusAwayGoalie}
                        >
                          <FaMinus />
                        </button>
                      )}
                    </div>
                  </section>
                  {twoAwayGoalies ? (
                    <section className="goalie_section">
                      <h4>Goalie 2</h4>
                      <div className="goalie_field">
                        {/* <label htmlFor="away_shots">Shots</label> */}
                        <PlayerDropdown
                          data={awayGoalies}
                          type="Away Goalies"
                          setSelectedAwayGoalie={setSelectedAwayGoalieTwo}
                        />
                      </div>
                      {twoAwayGoalies ? (
                        <>
                          <div className="goalie_field">
                            <label htmlFor="away_TOI">TOI</label>
                            <div id="time-input">
                              <input
                                type="text"
                                id="hours"
                                max="2"
                                dir="rtl"
                                onChange={(e) =>
                                  setAwayTwoMinutes(e.target.value)
                                }
                              />
                              <div id="colon">:</div>
                              <input
                                type="text"
                                id="minutes"
                                max="2"
                                onChange={(e) =>
                                  setAwayTwoSeconds(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="goalie_field">
                            <label htmlFor="away_shotsAgainst">
                              Shots Against
                            </label>
                            <input
                              id="away_shotsAgainst"
                              type="number"
                              onChange={(e) =>
                                setAwayTwoShotsAgainst(e.target.value)
                              }
                            />
                          </div>
                        </>
                      ) : null}
                    </section>
                  ) : null}
                </form>
              </div>
              <div className="goalie_controls">
                <button className="submit_btn btn" onClick={goalieStatSubmit}>
                  Submit
                </button>
                <button className="cancel_btn btn" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="goalie_overlay">
          <div className="goalie_container">
            <div className="goalie_content">
              <div className="goalie_modal_title">
                <h2 className="modal_title">Add Goalie Stats</h2>
              </div>
              <div className="goalie_form_container">
                <form action="" className="home_goalie_form">
                  <div className="goalie_title">
                    <h2 className="modal_title">{homeTeam.schoolName}</h2>
                    <div className="modal_logo_container">
                      <img className="title_logo" src={homeTeam.logo} alt="" />
                      {/* <small>{homeTeam.schoolName}</small> */}
                    </div>
                  </div>
                  <section className="goalie_section">
                    <h4>Goalie 1</h4>
                    <div className="goalie_field">
                      {/* <label htmlFor="home_shots">Shots</label> */}
                      <PlayerDropdown
                        data={homeGoalies}
                        type="Home Goalies"
                        setSelectedHomeGoalie={setSelectedHomeGoalieOne}
                      />
                    </div>

                    {twoHomeGoalies ? (
                      <>
                        <div className="goalie_field">
                          <label htmlFor="home_TOI">TOI</label>
                          {/* <input
                      id="home_TOI"
                      type="number"
                      max={45}
                      min={0}
                      onChange={(e) => setHomeTOIOne(e.target.value)}
                    /> */}
                          <div id="time-input">
                            <input
                              type="text"
                              id="hours"
                              max="2"
                              dir="rtl"
                              onChange={(e) =>
                                setHomeOneMinutes(e.target.value)
                              }
                            />
                            <div id="colon">:</div>
                            <input
                              type="text"
                              id="minutes"
                              max="2"
                              onChange={(e) =>
                                setHomeOneSeconds(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="goalie_field">
                          <label htmlFor="home_shotsAgainst">
                            Shots Against
                          </label>
                          <input
                            id="home_shotsAgainst"
                            type="number"
                            max={awayShots}
                            min={0}
                            onChange={(e) =>
                              setHomeOneShotsAgainst(e.target.value)
                            }
                          />
                        </div>
                      </>
                    ) : null}
                    <div className="goalie_item_controls">
                      {!addHomeToggle ? (
                        <button
                          ref={addHomeGoalie}
                          className="add_goalie_two_btn"
                          onClick={handleAddHomeGoalie}
                        >
                          <FaPlus />
                        </button>
                      ) : (
                        <button
                          ref={addHomeGoalie}
                          className="add_goalie_two_btn"
                          onClick={handleMinusHomeGoalie}
                        >
                          <FaMinus />
                        </button>
                      )}
                    </div>
                  </section>
                  {twoHomeGoalies ? (
                    <section className="goalie_section">
                      <h4>Goalie 2</h4>
                      <div className="goalie_field">
                        {/* <label htmlFor="home_shots">Shots</label> */}
                        <PlayerDropdown
                          data={homeGoalies}
                          type="Home Goalies"
                          setSelectedHomeGoalie={setSelectedHomeGoalieTwo}
                          setSelected={setSelected}
                          selected={selected}
                        />
                      </div>
                      <div className="goalie_field">
                        <label htmlFor="home_TOI">TOI</label>
                        <div id="time-input">
                          <input
                            type="text"
                            id="hours"
                            max="2"
                            dir="rtl"
                            onChange={(e) => setHomeTwoMinutes(e.target.value)}
                          />
                          <div id="colon">:</div>
                          <input
                            type="text"
                            id="minutes"
                            max="2"
                            onChange={(e) => setHomeTwoSeconds(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="goalie_field">
                        <label htmlFor="home_shotsAgainst">Shots Against</label>
                        <input
                          id="home_shotsAgainst"
                          type="number"
                          onChange={(e) =>
                            setHomeTwoShotsAgainst(e.target.value)
                          }
                        />
                      </div>
                    </section>
                  ) : null}
                </form>
                <form action="" className="away_goalie_form">
                  <div className="goalie_title">
                    <h2 className="modal_title">{awayTeam.schoolName}</h2>
                    <div className="modal_logo_container">
                      <img className="title_logo" src={awayTeam.logo} alt="" />
                      {/* <small>{awayTeam.schoolName}</small> */}
                    </div>
                  </div>
                  <section className="goalie_section">
                    <h4>Goalie 1</h4>
                    <div className="goalie_field">
                      {/* <label htmlFor="away_shots">Shots</label> */}
                      <PlayerDropdown
                        data={awayGoalies}
                        type="Away Goalies"
                        setSelectedAwayGoalie={setSelectedAwayGoalieOne}
                      />
                    </div>
                    {twoAwayGoalies ? (
                      <>
                        <div className="goalie_field">
                          <label htmlFor="away_TOI">TOI</label>
                          <div id="time-input">
                            <input
                              type="text"
                              id="hours"
                              max="2"
                              dir="rtl"
                              onChange={(e) =>
                                setAwayOneMinutes(e.target.value)
                              }
                            />
                            <div id="colon">:</div>
                            <input
                              type="text"
                              id="minutes"
                              max="2"
                              onChange={(e) =>
                                setAwayOneSeconds(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="goalie_field">
                          <label htmlFor="home_shotsAgainst">
                            Shots Against
                          </label>
                          <input
                            id="home_shotsAgainst"
                            type="number"
                            max={homeShots}
                            min={0}
                            onChange={(e) =>
                              setAwayOneShotsAgainst(e.target.value)
                            }
                          />
                        </div>
                      </>
                    ) : null}
                    <div className="goalie_item_controls">
                      {!addAwayToggle ? (
                        <button
                          ref={addHomeGoalie}
                          className="add_goalie_two_btn"
                          onClick={handleAddAwayGoalie}
                        >
                          <FaPlus />
                        </button>
                      ) : (
                        <button
                          ref={addHomeGoalie}
                          className="add_goalie_two_btn"
                          onClick={handleMinusAwayGoalie}
                        >
                          <FaMinus />
                        </button>
                      )}
                    </div>
                  </section>
                  {twoAwayGoalies ? (
                    <section className="goalie_section">
                      <h4>Goalie 2</h4>
                      <div className="goalie_field">
                        {/* <label htmlFor="away_shots">Shots</label> */}
                        <PlayerDropdown
                          data={awayGoalies}
                          type="Away Goalies"
                          setSelectedAwayGoalie={setSelectedAwayGoalieTwo}
                        />
                      </div>
                      {twoAwayGoalies ? (
                        <>
                          <div className="goalie_field">
                            <label htmlFor="away_TOI">TOI</label>
                            <div id="time-input">
                              <input
                                type="text"
                                id="hours"
                                max="2"
                                dir="rtl"
                                onChange={(e) =>
                                  setAwayTwoMinutes(e.target.value)
                                }
                              />
                              <div id="colon">:</div>
                              <input
                                type="text"
                                id="minutes"
                                max="2"
                                onChange={(e) =>
                                  setAwayTwoSeconds(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="goalie_field">
                            <label htmlFor="away_shotsAgainst">
                              Shots Against
                            </label>
                            <input
                              id="away_shotsAgainst"
                              type="number"
                              onChange={(e) =>
                                setAwayTwoShotsAgainst(e.target.value)
                              }
                            />
                          </div>
                        </>
                      ) : null}
                    </section>
                  ) : null}
                </form>
              </div>
              <div className="goalie_controls">
                <button className="submit_btn btn" onClick={goalieStatSubmit}>
                  Submit
                </button>
                <button className="cancel_btn btn" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GoalieStatsModal;
