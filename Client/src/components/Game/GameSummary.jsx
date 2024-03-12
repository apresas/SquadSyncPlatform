import { useState, useEffect } from "react";
import axios from "axios";
import TitleBar from "../TitleBar";
import GameHeader from "./GameHeader";
// import BoxScore from "./BoxScore";
import LineScore from "./LineScore";
import GameStats from "./GameStats";
import SeasonSeries from "./SeasonSeries";
import GameEvent from "./GameEvent";
import GoalieStats from "./GoalieStats";
import "./gameSummary.css";
import AddGameEventModal from "../../modal/AddGameEventModal";
import GameStatsModal from "../../modal/gameStatsModal";
import { DateTime } from "luxon";
import { useLocation } from "react-router-dom";
import LoadingOverlay from "../Loading/LoadingOverlay";

function GameSummary({
  currentGame,
  teamData,
  getFilterTeam,
  filteredPlayers,
  eventSubmit,
  setEventSubmit,
  gameScore,
  setGameScore,
  getFilterGame,
  getTeamData,
  getRecord,
  record,
  getDates,
}) {
  const [type, setType] = useState("ADD");
  const [homeTeam, setHomeTeam] = useState({});
  const [awayTeam, setAwayTeam] = useState({});
  const [scoringID, setScoringID] = useState();
  const [goalID, setGoalID] = useState();
  const [primaryID, setPrimaryID] = useState();
  const [secondaryID, setSecondaryID] = useState();

  const [homeRoster, setHomeRoster] = useState([]);
  const [awayRoster, setAwayRoster] = useState([]);
  const [teams, setTeams] = useState([]);

  // const home = useRef();
  // const away = useRef();

  const [dateTitle, setDateTitle] = useState();

  const [homeLoading, setHomeLoading] = useState(false);
  const [awayLoading, setAwayLoading] = useState(false);

  const [gameEvents, setGameEvents] = useState([]);

  const [game, setGame] = useState({});

  const location = useLocation();
  const currentGameID = parseInt(location.pathname.split("/")[2]);

  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState("TBD");

  const [games, setGames] = useState([]);

  const [gameStatsSubmit, setGameStatsSubmit] = useState(false);

  const [gameStats, setGameStats] = useState({
    gameStatsID: 0,
    homeShots: 0,
    awayShots: 0,
    homeFO: 0,
    awayFO: 0,
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
    awayGiveaways: 0,
    isNull: true,
  });
  // const [homeResult, setHomeResult] = useState();
  // const [awayResult, setAwayResult] = useState();
  // const setResult = (homeScore, awayScore) => {
  //   if (homeScore > awayScore) {
  //     setHomeResult("WIN");
  //     setAwayResult("LOSE");
  //   } else if (homeScore === awayScore) {
  //     setHomeResult("TIE");
  //     setAwayResult("TIE");
  //   } else {
  //     setHomeResult("LOSE");
  //     setAwayResult("WIN");
  //   }
  // };

  const [isFinal, setIsFinal] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [openStatsModal, setOpenStatsModal] = useState(false);

  const handleModalOpen = async (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const handleStatsOpen = async (e, type) => {
    e.preventDefault();
    console.log(type);
    setType(type);
    setOpenStatsModal(true);
  };

  const getGameStats = async () => {
    await axios
      .get("http://localhost:9200/gameStatByGame/" + currentGameID)
      .then((res) => {
        {
          res.data.map((stat) => {
            setGameStats({
              gameStatsID: stat.gameStatsID,
              homeShots: stat.homeShots,
              awayShots: stat.awayShots,
              homeFO: stat.homeFaceoff,
              awayFO: stat.awayFaceoff,
              homePP: stat.homePP,
              awayPP: stat.awayPP,
              homePPG: stat.homePPG,
              awayPPG: stat.awayPPG,
              homeMinors: stat.homeMinors,
              awayMinors: stat.awayMinors,
              homeMajors: stat.homeMajors,
              awayMajors: stat.awayMajors,
              homeHits: stat.homeHits,
              awayHits: stat.awayHits,
              homeBlocks: stat.homeBlocks,
              awayBlocks: stat.awayBlocks,
              homeGiveaways: stat.homeGiveaways,
              awayGiveaways: stat.awayGiveaways,
              isNull: false,
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getHomeRoster = async (teamID) => {
    if (teamID !== undefined) {
      setHomeLoading(true);
      await axios
        .get("http://localhost:9200/players/" + teamID)
        .then((res) => {
          setHomeRoster(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setHomeLoading(false));
    }
  };

  const getAwayRoster = async (teamID) => {
    if (teamID !== undefined) {
      setAwayLoading(true);
      await axios
        .get("http://localhost:9200/players/" + teamID)
        .then((res) => {
          setAwayRoster(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setAwayLoading(false));
    }
  };

  // const getFilteredGame = async (gameID) => {
  //   await axios.get("http://localhost:9200/schedule/" + gameID).then((res) => {
  //     console.log(res.data);
  //     setGame(res.data);
  //   });
  // };

  // const getTeamRosters = async (homeID, awayID) => {
  //   setIsLoading(true)
  //   await axios
  //     .get("http://localhost:9200/players/" + homeID)
  //     .then((res) => {
  //       setHomeRoster(res.data)
  //       // console.log(res.data)
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setIsLoading(false))
  //   await axios
  //     .get("http://localhost:9200/players/" + awayID)
  //     .then((res) => {
  //       setAwayRoster(res.data)
  //       // console.log(res.data)
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setIsLoading(false))
  // };

  useEffect(() => {
    getFilterGame(currentGameID);
    getTeamData();
    getDates(new Date());
    // getHomeTeam(currentGame.homeID);
    // getAwayTeam(currentGame.awayID);
    // setTestID(parseInt(location.pathname.split("/")[2]))
    // getFilteredGame(currentGameID);
  }, []);

  useEffect(() => {
    getCurrentGame(currentGameID);
  }, [currentGameID]);

  // useEffect(() => {
  //   getHomeTeam(game.homeID);
  //   getAwayTeam(game.awayID);
  //   formatGameDate(game.date);
  // }, [game]);

  // const getHomeTeam = async (teamID) => {
  //   const res = await axios.get("http://localhost:9200/team/" + teamID);
  //   setHomeTeam(res.data);
  //   // setHomeTeam(...res.data);
  // };

  // const getAwayTeam = async (teamID) => {
  //   const res = await axios.get("http://localhost:9200/team/" + teamID);
  //   setAwayTeam(res.data);
  //   // setAwayTeam(...res.data);
  // };

  // useEffect(() => {
  //   // {
  //   //   teamData
  //   //     .map((data) => data)
  //   //     .filter((data) => data.teamID === currentGame.homeID)
  //   //     .map((data) => {
  //   //       home.current = data;
  //   //       setHomeTeam(data);
  //   //     });
  //   // }
  //   // {
  //   //   teamData
  //   //     .map((data) => data)
  //   //     .filter((data) => data.teamID === currentGame.awayID)
  //   //     .map((data) => {
  //   //       away.current = data;
  //   //       setAwayTeam(data);
  //   //     });
  //   // }

  //   // setResult(currentGame.homeScore, currentGame.awayScore);
  //   getGameEvents(currentGameID);
  //   // formatGameDate(currentGame.date);
  // }, [
  //   currentGame.awayID,
  //   currentGame.awayScore,
  //   currentGame.date,
  //   currentGameID,
  //   currentGame.homeID,
  //   currentGame.homeScore,
  //   teamData,
  // ]);

  // useEffect(() => {
  //   let teamList = [];
  //   // getHomeRoster(homeTeam.teamID);
  //   // getAwayRoster(awayTeam.teamID);
  //   teamList.push(homeTeam);
  //   teamList.push(awayTeam);
  //   setTeams(teamList);
  //   // getGameSummary(homeTeam.teamID, awayTeam.teamID)

  // }, [homeTeam, awayTeam]);

  const [lineScore, setLineScore] = useState({
    homeScore: {
      first: 0,
      second: 0,
      third: 0,
    },
    awayScore: {
      first: 0,
      second: 0,
      third: 0,
    },
  });

  useEffect(() => {
    setScores();
    // getRecord(homeTeam.teamID, awayTeam.teamID);
    // getSeasonSeries(homeTeam.teamID, awayTeam.teamID);
  }, [homeTeam, awayTeam, gameEvents, eventSubmit]);

  // useEffect(() => {
  //   getRecord(homeTeam.teamID, awayTeam.teamID);
  //   // getSeasonSeries(homeTeam.teamID, awayTeam.teamID);
  // }, [gameEvents, eventSubmit])

  useEffect(() => {
    setGameScore({
      homeScore:
        lineScore.homeScore.first +
        lineScore.homeScore.second +
        lineScore.homeScore.third,
      awayScore:
        lineScore.awayScore.first +
        lineScore.awayScore.second +
        lineScore.awayScore.third,
    });
  }, [lineScore, setGameScore]);

  const setScores = () => {
    let homeFirst = 0;
    let homeSecond = 0;
    let homeThird = 0;
    let awayFirst = 0;
    let awaySecond = 0;
    let awayThird = 0;

    {
      gameEvents.map((event) => {
        if (event.scoringTeam === homeTeam.teamID && event.period === "1st") {
          homeFirst += 1;
        } else if (
          event.scoringTeam === homeTeam.teamID &&
          event.period === "2nd"
        ) {
          homeSecond += 1;
        } else if (
          event.scoringTeam === homeTeam.teamID &&
          event.period === "3rd"
        ) {
          homeThird += 1;
        }

        if (event.scoringTeam === awayTeam.teamID && event.period === "1st") {
          awayFirst += 1;
        } else if (
          event.scoringTeam === awayTeam.teamID &&
          event.period === "2nd"
        ) {
          awaySecond += 1;
        } else if (
          event.scoringTeam === awayTeam.teamID &&
          event.period === "3rd"
        ) {
          awayThird += 1;
        }
      });
    }
    setLineScore({
      homeScore: {
        first: homeFirst,
        second: homeSecond,
        third: homeThird,
      },
      awayScore: {
        first: awayFirst,
        second: awaySecond,
        third: awayThird,
      },
    });
  };

  // useEffect(() => {
  //   console.log(`home: ${homeResult} ` + `away: ${awayResult}`);
  // }, [homeResult, awayResult]);

  // useEffect(() => {
  //   let eventList = [];
  //   {
  //     gameEvents
  //       .filter((event) => event.gameID === currentGame.gameID)
  //       .forEach((event) => {
  //         eventList.push(event);
  //       });
  //   }
  //   setCurrentEvents(eventList);
  // }, [gameEvents]);

  // useEffect(() => {
  //   // setNewGameScore(currentGameID, gameScore)
  // }, [gameScore]);

  // const getGameEvents = async (gameID) => {
  //   await axios
  //     .get("http://localhost:9200/eventByGame/" + gameID)
  //     .then((res) => {
  //       setGameEvents(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const getSeasonSeries = async () => {
  //   let gameList = [];
  //   await axios
  //     .get("http://localhost:9200/schedule")
  //     .then((res) => {
  //       gameList = Array.from(res.data);
  //     })
  //     .catch((err) => console.log(err));

  //   const filterGames = gameList.filter(
  //     (game) =>
  //       (game.homeID === homeTeam.teamID || game.awayID === homeTeam.teamID) &&
  //       (game.homeID === awayTeam.teamID || game.awayID === awayTeam.teamID)
  //   );
  //   setGames(filterGames);
  // };

  // const getSeasonSeries = async (homeID, awayID) => {
  //   // let gameList = [];
  //   // const endPoints = [
  //   //   "http://localhost:9200/gamesByTeam/" + homeID,
  //   //   "http://localhost:9200/gamesByTeam/" + awayID,
  //   // ];
  //   // console.log(endPoints);
  //   await axios
  //   .get("http://localhost:9200/gamesByTeam/" + homeID + "/" + awayID)
  //   .then((res) => {
  //     // console.log(res.data);
  //     setGames(res.data)
  //   })
  //     .catch((err) => console.log(err));
  //   // setGames(gameList);

  //   // .get(endPoints.map((endpoint) => axios.get(endpoint)))
  //   // .then(axios.spread((game1, game2) => {
  //   //   console.log(game1.data);
  //   //   console.log(game2.data);
  //   //   setGames(game1.data)
  //   // }))
  //   // const filterGames = gameList.filter(
  //   //   (game) =>
  //   //     (game.homeID === homeTeam.teamID || game.awayID === homeTeam.teamID) &&
  //   //     (game.homeID === awayTeam.teamID || game.awayID === awayTeam.teamID)
  //   // );
  //   // setGames(filterGames);
  // };

  useEffect(() => {
    // if(gameStatsSubmit) {
    //   getGameSummary()
    // }
    console.log(gameStatsSubmit);
    getGameStats();
  }, [gameStatsSubmit]);

  useEffect(() => {
    setGameStatsSubmit(true);
  }, [gameStats]);

  const formatGameDate = (date) => {
    const newDate = DateTime.fromISO(date).toFormat("DD");
    const week = DateTime.fromISO(date).toFormat("EEE");
    const title = week + ", " + newDate;
    setDateTitle(title);
  };

  const getCurrentGame = async (currentGameID) => {
    setIsLoading(true);
    // let gameList = [];
    await axios
      // .get("http://localhost:9200/schedule")
      .get("http://localhost:9200/game/" + currentGameID)
      .then((res) => {
        // gameList = Array.from(res.data);
        if (res.data.final === true) {
          setIsFinal(true);
        } else if (res.data.final === false) {
          setIsFinal(false);
        }
        setGame(res.data);
        getGameSummary(res.data.homeID, res.data.awayID, res.data.date);
      })
      .catch((err) => console.log(err));
    // .finally(() => {
    //   setTimeout(() => {
    //     setIsLoading(false);
    //   }, 550);
    // });

    // const game = gameList.filter((game) => game.gameID === currentGameID);
    // setGame(...game);
  };

  const [seriesRecord, setSeriesRecord] = useState({
    team: "",
    record: "",
  });

  const getGameSummary = async (homeID, awayID, date) => {
    formatGameDate(date);
    let endPoints = [
      // "http://localhost:9200/game/" + currentGameID,

      "http://localhost:9200/gamesByTeam/" + homeID + "/" + awayID,
      "http://localhost:9200/eventByGame/" + currentGameID,
      "http://localhost:9200/team/" + homeID,
      "http://localhost:9200/team/" + awayID,
    ];
    let teamList = [];

    await Promise.all(endPoints.map((endPoint) => axios.get(endPoint)))
      .then(
        axios.spread(
          (
            { data: series },
            { data: events },
            { data: homeTeam },
            { data: awayTeam }
          ) => {
            setGames(series);
            setGameEvents(events);
            setHomeTeam(homeTeam);
            setAwayTeam(awayTeam);
            getHomeRoster(homeTeam.teamID);
            getAwayRoster(awayTeam.teamID);
            teamList.push(homeTeam);
            teamList.push(awayTeam);
            setTeams(teamList);
            console.log({ series, events, homeTeam, awayTeam });
            getGameStats();
            getSeriesRecord(
              homeTeam.teamID,
              awayTeam.teamID,
              series,
              homeTeam,
              awayTeam
            );
            // getRecord(homeTeam.teamID, awayTeam.teamID);
          }
        )
      )
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 550);
      });
  };

  useEffect(() => {
    getSeriesRecord(
      homeTeam.teamID,
      awayTeam.teamID,
      games,
      homeTeam,
      awayTeam
    );
    getRecord(homeTeam.teamID, awayTeam.teamID);
  }, [games]);

  const getSeriesRecord = (homeID, awayID, series, homeTeam, awayTeam) => {
    let teamOneWins = 0;
    let teamTwoWins = 0;

    // console.log(series);

    {
      series
        .filter((game) => game.homeID === homeID || game.awayID === homeID)
        .map((game) => {
          if (game.homeID === homeID) {
            if (game.homeScore > game.awayScore) {
              teamOneWins += 1;
            }
          }
          if (game.awayID === homeID) {
            if (game.awayScore > game.homeScore) {
              teamOneWins += 1;
            }
          }
        });
    }

    {
      series
        .filter((game) => game.homeID === awayID || game.awayID === awayID)
        .map((game) => {
          if (game.homeID === awayID) {
            if (game.homeScore > game.awayScore) {
              teamTwoWins += 1;
            }
          }
          if (game.awayID === awayID) {
            if (game.awayScore > game.homeScore) {
              teamTwoWins += 1;
            }
          }
        });
    }

    // console.log(teamOneWins)
    // console.log(teamTwoWins)

    if (teamOneWins > teamTwoWins) {
      setSeriesRecord({
        team: homeTeam.abbreviation,
        record: teamOneWins + "-" + teamTwoWins,
      });
    }
    if (teamTwoWins > teamOneWins) {
      setSeriesRecord({
        team: awayTeam.abbreviation,
        record: teamTwoWins + "-" + teamOneWins,
      });
    }
    if (teamOneWins === teamTwoWins) {
      setSeriesRecord({
        team: "TIE",
        record: teamTwoWins + "-" + teamOneWins,
      });
    }
  };

  // useEffect(() => {
  //   // if(eventSubmit){
  //   //   updateScore()
  //   // }
  //   updateScore()
  // }, [gameScore])

  // const updateScore = async(homeScore, awayScore) => {
  //   let score = {homeScore: homeScore, awayScore: awayScore}
  //   await axios
  //   .patch("http://localhost:9200/game/" + currentGameID, score)
  //   .catch(err => {console.log(err)})

  //   setEventSubmit(false)
  // }

  // console.log(seriesRecord)

  // const setNewGameScore = async(currentGameID, gameScore) => {
  //   try {
  //     await axios
  //     .put("http://localhost:9200/schedule/" + currentGameID, gameScore)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // console.log(gameScore)
  // console.log(lineScore)
  // console.log(teamData)

  // console.log(filterTeam)
  // console.log(games);
  // console.log(homeRoster)
  // console.log(awayRoster)
  // console.log(currentGame)

  console.log(status);

  return (
    <>
      <AddGameEventModal
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        open={openModal}
        setOpenModal={setOpenModal}
        setScoringID={setScoringID}
        setGoalID={setGoalID}
        setPrimaryID={setPrimaryID}
        setSecondaryID={setSecondaryID}
        getFilterTeam={getFilterTeam}
        scoringID={scoringID}
        goalID={goalID}
        primaryID={primaryID}
        secondaryID={secondaryID}
        // currentEvents={currentEvents}
        currentGameID={currentGameID}
        currentGame={currentGame}
        homeRoster={homeRoster}
        awayRoster={awayRoster}
        gameScore={gameScore}
        setEventSubmit={setEventSubmit}
        eventSubmit={eventSubmit}
        teams={teams}
        gameEvents={gameEvents}
      />
      <GameStatsModal
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        open={openStatsModal}
        setOpenModal={setOpenStatsModal}
        currentGameID={currentGameID}
        gameStatsSubmit={gameStatsSubmit}
        setGameStatsSubmit={setGameStatsSubmit}
        setType={setType}
        type={type}
        gameStats={gameStats}
        setGameStats={setGameStats}
      />
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <div className="gameSummary_container">
          <div className="gameSummary_content_container">
            <TitleBar title="Game Summary" subtitle="2023-2024" />
            <div className="gameSummary_app_container">
              <h2>{dateTitle}</h2>
              <GameHeader
                game={game}
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                gameScore={gameScore}
                record={record}
                status={status}
              />
              <div className="gameSummary_grid">
                <section className="gameSummary_main_content">
                  {/* <BoxScore currentGame={currentGame} homeTeam={homeTeam} awayTeam={awayTeam}/> */}
                  <GameEvent
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    homeRoster={homeRoster}
                    awayRoster={awayRoster}
                    handleModalOpen={handleModalOpen}
                    currentGame={currentGame}
                    filteredPlayers={filteredPlayers}
                    homeLoading={homeLoading}
                    awayLoading={awayLoading}
                    // currentEvents={currentEvents}
                    // setCurrentEvents={setCurrentEvents}
                    gameScore={gameScore}
                    eventSubmit={eventSubmit}
                    gameEvents={gameEvents}
                    setGameEvents={setGameEvents}
                    currentGameID={currentGameID}
                    setStatus={setStatus}
                    isFinal={isFinal}
                    setIsFinal={setIsFinal}
                  />
                </section>
                <section className="gameSummary_side_content">
                  <LineScore
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    gameScore={gameScore}
                    lineScore={lineScore}
                    status={status}
                  />
                  <GameStats
                    currentGame={game}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    gameScore={gameScore}
                    handleStatsOpen={handleStatsOpen}
                    gameStats={gameStats}
                    gameStatsSubmit={gameStatsSubmit}
                    status={status}
                  />
                  <GoalieStats
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    gameStats={gameStats}
                    status={status}
                    gameScore={gameScore}
                    homeRoster={homeRoster}
                    awayRoster={awayRoster}
                  />
                  <SeasonSeries
                    games={games}
                    currentGame={game}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    teamData={teamData}
                    gameScore={gameScore}
                    status={status}
                    gameEvents={gameEvents}
                    seriesRecord={seriesRecord}
                  />
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GameSummary;
