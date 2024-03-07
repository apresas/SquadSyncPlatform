import { useState, useEffect } from "react";
import axios from "axios";
import TitleBar from "../TitleBar";
import GameHeader from "./GameHeader";
// import BoxScore from "./BoxScore";
import LineScore from "./LineScore";
import GameStats from "./GameStats";
import SeasonSeries from "./SeasonSeries";
import GameEvent from "./GameEvent";
import "./gameSummary.css";
import AddGameEventModal from "../../modal/AddGameEventModal";
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
  getDates
}) {
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

  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = async (e) => {
    e.preventDefault();
    setOpenModal(true);
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
    getCurrentGame(currentGameID);
    getDates(new Date())
    // getHomeTeam(currentGame.homeID);
    // getAwayTeam(currentGame.awayID);
    // setTestID(parseInt(location.pathname.split("/")[2]))
    // getFilteredGame(currentGameID);
  }, []);

  useEffect(() => {
    getCurrentGame(currentGameID);
  }, [currentGameID]);

  useEffect(() => {
    getHomeTeam(game.homeID);
    getAwayTeam(game.awayID);
    formatGameDate(game.date);
  }, [game]);

  const getHomeTeam = async (teamID) => {
    const res = await axios.get("http://localhost:9200/team/" + teamID);
    setHomeTeam(res.data);
    // setHomeTeam(...res.data);
  };

  const getAwayTeam = async (teamID) => {
    const res = await axios.get("http://localhost:9200/team/" + teamID);
    setAwayTeam(res.data);
    // setAwayTeam(...res.data);
  };

  useEffect(() => {
    // {
    //   teamData
    //     .map((data) => data)
    //     .filter((data) => data.teamID === currentGame.homeID)
    //     .map((data) => {
    //       home.current = data;
    //       setHomeTeam(data);
    //     });
    // }
    // {
    //   teamData
    //     .map((data) => data)
    //     .filter((data) => data.teamID === currentGame.awayID)
    //     .map((data) => {
    //       away.current = data;
    //       setAwayTeam(data);
    //     });
    // }

    // setResult(currentGame.homeScore, currentGame.awayScore);
    getGameEvents(currentGameID);
    // formatGameDate(currentGame.date);
  }, [
    currentGame.awayID,
    currentGame.awayScore,
    currentGame.date,
    currentGameID,
    currentGame.homeID,
    currentGame.homeScore,
    teamData,
  ]);

  useEffect(() => {
    let teamList = [];
    getHomeRoster(homeTeam.teamID);
    getAwayRoster(awayTeam.teamID);
    teamList.push(homeTeam);
    teamList.push(awayTeam);
    setTeams(teamList);
    getSeasonSeries();
    getRecord(homeTeam.teamID, awayTeam.teamID)
  }, [homeTeam, awayTeam]);

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
  }, [homeTeam, awayTeam, gameEvents, eventSubmit]);

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
        if (event.scoreTeam === homeTeam.teamID && event.period === "1st") {
          homeFirst += 1;
        } else if (
          event.scoreTeam === homeTeam.teamID &&
          event.period === "2nd"
        ) {
          homeSecond += 1;
        } else if (
          event.scoreTeam === homeTeam.teamID &&
          event.period === "3rd"
        ) {
          homeThird += 1;
        }

        if (event.scoreTeam === awayTeam.teamID && event.period === "1st") {
          awayFirst += 1;
        } else if (
          event.scoreTeam === awayTeam.teamID &&
          event.period === "2nd"
        ) {
          awaySecond += 1;
        } else if (
          event.scoreTeam === awayTeam.teamID &&
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

  useEffect(() => {
    // setNewGameScore(currentGameID, gameScore)
  }, [gameScore])

  const getGameEvents = async (gameID) => {
    await axios
      .get("http://localhost:9200/events/" + gameID)
      .then((res) => {
        setGameEvents(res.data);
      })
      .catch((err) => console.log(err));
  };

  const [games, setGames] = useState([]);

  const getSeasonSeries = async () => {
    let gameList = [];
    await axios
      .get("http://localhost:9200/schedule")
      .then((res) => {
        gameList = Array.from(res.data);
      })
      .catch((err) => console.log(err));

    const filterGames = gameList.filter(
      (game) =>
        (game.homeID === homeTeam.teamID || game.awayID === homeTeam.teamID) &&
        (game.homeID === awayTeam.teamID || game.awayID === awayTeam.teamID)
    );
    setGames(filterGames);
  };

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
        setGame(res.data)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 550);
      });

    // const game = gameList.filter((game) => game.gameID === currentGameID);
    // setGame(...game);
    
  };

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
  console.log(games)
  // console.log(homeTeam)
  // console.log(awayTeam)

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
                currentGame={currentGame}
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                gameScore={gameScore}
                record={record}
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
                  />
                </section>
                <section className="gameSummary_side_content">
                  <LineScore
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    gameScore={gameScore}
                    lineScore={lineScore}
                  />
                  <GameStats
                    currentGame={game}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    gameScore={gameScore}
                  />
                  <SeasonSeries
                    games={games}
                    currentGame={game}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    teamData={teamData}
                    gameScore={gameScore}
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
