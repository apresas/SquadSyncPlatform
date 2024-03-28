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
import GoalieStatsModal from "../../modal/GoalieStatsModal";
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

  const [goalieSubmit, setGoalieSubmit] = useState(false);

  const [homeSaves, setHomeSaves] = useState();
  const [awaySaves, setAwaySaves] = useState();
  const [homeSavePct, setHomeSavePct] = useState();
  const [awaySavePct, setAwaySavePct] = useState();
  const [selectedHomeGoalieOne, setSelectedHomeGoalieOne] = useState({});
  const [selectedAwayGoalieOne, setSelectedAwayGoalieOne] = useState({});
  const [homeGoalieStats, setHomeGoalieStats] = useState([]);
  const [awayGoalieStats, setAwayGoalieStats] = useState([]);

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

  const [isFinal, setIsFinal] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [openStatsModal, setOpenStatsModal] = useState(false);

  const [openGoalieModal, setOpenGoalieModal] = useState(false);

  const handleModalOpen = async (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const handleStatsOpen = async (e, type) => {
    e.preventDefault();
    // console.log(type);
    setType(type);
    setOpenStatsModal(true);
  };

  const [goalieType, setGoalieType] = useState("ADD");
  const handleGoalieOpen = async (e, type) => {
    e.preventDefault();
    setGoalieType(type);
    setOpenGoalieModal(true);
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
    // let timeOfGoals = [];
    // let goalsAgainst = [];
    // {
    //   gameEvents.map((event) => {
    //     if (event.scoringTeam === awayTeam.teamID && event.period === "1st") {
    //       timeOfGoals.push(
    //         Math.round((45 - (15 - event.gameTime)) * 100) / 100
    //       );
    //       console.log(timeOfGoals);
    //     }
    //     if (event.scoringTeam === awayTeam.teamID && event.period === "2nd") {
    //       timeOfGoals.push(
    //         Math.round((45 - (30 - event.gameTime)) * 100) / 100
    //       );
    //       console.log(timeOfGoals);
    //     }
    //     if (event.scoringTeam === awayTeam.teamID && event.period === "3rd") {
    //       timeOfGoals.push(
    //         Math.round((45 - (45 - event.gameTime)) * 100) / 100
    //       );
    //       console.log(timeOfGoals);
    //     }
    //   });
    // }
    // let toi = 0;
    // toi = 45 - 25;
    // {
    //   timeOfGoals.map((goal) => {
    //     if (goal >= toi) {
    //       // console.log(goal)
    //       goalsAgainst.push(goal);
    //     }
    //   });
    // }
    // console.log(goalsAgainst);
    // console.log(goalsAgainst.length);
    // getGoalsAgainst(25,20,30,15)
  }, [gameEvents]);

  const [homeOneGoals, setHomeOneGoals] = useState();
  const [homeTwoGoals, setHomeTwoGoals] = useState();
  const [awayOneGoals, setAwayOneGoals] = useState();
  const [awayTwoGoals, setAwayTwoGoals] = useState();

  const getGoalsAgainst = (homeOne, homeTwo, awayOne, awayTwo) => {
    let timeOfGoalsHome = [];
    let homeOneGA = [];
    let timeOfGoalsAway = [];
    let awayOneGA = [];
    let awayTwoGA = [];
    let homeTwoGA = [];

    let homeTOI = 0;
    homeTOI = 45 - homeOne;
    let awayTOI = 0;
    awayTOI = 45 - awayOne;
    let homeTwoTOI = 0;
    homeTwoTOI = 45 - (homeTwo + homeOne);
    let awayTwoTOI = 0;
    awayTwoTOI = 45 - (awayTwo + awayOne);

    let homeOneGoals = 0;
    let homeTwoGoals = 0;
    let awayOneGoals = 0;
    let awayTwoGoals = 0;

    {
      gameEvents.map((event) => {
        if (event.scoringTeam === awayTeam.teamID && event.period === "1st") {
          timeOfGoalsHome.push(
            Math.round((45 - (15 - event.gameTime)) * 100) / 100
          );
        }
        if (event.scoringTeam === awayTeam.teamID && event.period === "2nd") {
          timeOfGoalsHome.push(
            Math.round((45 - (30 - event.gameTime)) * 100) / 100
          );
        }
        if (event.scoringTeam === awayTeam.teamID && event.period === "3rd") {
          timeOfGoalsHome.push(
            Math.round((45 - (45 - event.gameTime)) * 100) / 100
          );
        }
        if (event.scoringTeam === homeTeam.teamID && event.period === "1st") {
          timeOfGoalsAway.push(
            Math.round((45 - (15 - event.gameTime)) * 100) / 100
          );
        }
        if (event.scoringTeam === homeTeam.teamID && event.period === "2nd") {
          timeOfGoalsAway.push(
            Math.round((45 - (30 - event.gameTime)) * 100) / 100
          );
        }
        if (event.scoringTeam === homeTeam.teamID && event.period === "3rd") {
          timeOfGoalsAway.push(
            Math.round((45 - (45 - event.gameTime)) * 100) / 100
          );
        }
      });
    }

    // console.log(timeOfGoalsHome);
    // console.log(timeOfGoalsAway);

    {
      timeOfGoalsHome.map((goal) => {
        if (goal >= homeTOI) {
          homeOneGA.push(goal);
        }
        if (goal >= homeTwoTOI) {
          homeTwoGA.push(goal);
        }
      });
    }
    {
      timeOfGoalsAway.map((goal) => {
        if (goal >= awayTOI) {
          awayOneGA.push(goal);
        }
        if (goal >= awayTwoTOI) {
          awayTwoGA.push(goal);
        }
      });
    }

    homeOneGoals = homeOneGA.length;
    homeTwoGoals = homeTwoGA.length - homeOneGA.length;
    awayOneGoals = awayOneGA.length;
    awayTwoGoals = awayTwoGA.length - awayOneGA.length;

    setHomeOneGoals(homeOneGoals);
    setHomeTwoGoals(homeTwoGoals);
    setAwayOneGoals(awayOneGoals);
    setAwayTwoGoals(awayTwoGoals);

    // console.log(`homeOneGA: ${homeOneGoals}`);
    // console.log(`homeTwoGA: ${homeTwoGoals}`);
    // console.log(`awayOneGA: ${awayOneGoals}`);
    // console.log(`awayTwoGA: ${awayTwoGoals}`);
  };

  useEffect(() => {
    getCurrentGame(currentGameID);
  }, [currentGameID, isFinal]);

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

  const updateScore = async () => {
    await axios
      .patch("http://localhost:9200/game/" + currentGameID, gameScore)
      .catch((err) => {
        console.log(err);
      });
    setEventSubmit(false);
  };
  useEffect(() => {
    setScores();

    // getRecord(homeTeam.teamID, awayTeam.teamID);
    // getSeasonSeries(homeTeam.teamID, awayTeam.teamID);
  }, [homeTeam, awayTeam, gameEvents, eventSubmit]);

  useEffect(() => {
    updateScore();
  }, [eventSubmit, gameScore]);

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

  useEffect(() => {
    // if(gameStatsSubmit) {
    //   getGameSummary()
    // }
    // console.log(gameStatsSubmit);
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
  };

  const [seriesRecord, setSeriesRecord] = useState({
    team: "",
    record: "",
  });

  const [goalieStats, setGoalieStats] = useState([]);

  const getGameSummary = async (homeID, awayID, date) => {
    formatGameDate(date);
    let endPoints = [
      // "http://localhost:9200/game/" + currentGameID,

      "http://localhost:9200/gamesByTeam/" + homeID + "/" + awayID,
      "http://localhost:9200/eventByGame/" + currentGameID,
      "http://localhost:9200/team/" + homeID,
      "http://localhost:9200/team/" + awayID,
      "http://localhost:9200/goalieStatByGame/" + currentGameID,
    ];
    let teamList = [];

    await Promise.all(endPoints.map((endPoint) => axios.get(endPoint)))
      .then(
        axios.spread(
          (
            { data: series },
            { data: events },
            { data: homeTeam },
            { data: awayTeam },
            { data: goalieStat }
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
            setGoalieStats(goalieStat);
            // console.log({ series, events, homeTeam, awayTeam });
            getGameStats();
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

  // useEffect(() => {
  //   // getSeriesRecord(
  //   //   homeTeam.teamID,
  //   //   awayTeam.teamID,
  //   //   games,
  //   //   homeTeam,
  //   //   awayTeam
  //   // );

  // getRecord(homeTeam.teamID, awayTeam.teamID);
  // }, [games]);

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
      <GoalieStatsModal
        currentGameID={currentGameID}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        homeSavePct={homeSavePct}
        awaySavePct={awaySavePct}
        homeShots={gameStats.homeShots}
        awayShots={gameStats.awayShots}
        homeSaves={homeSaves}
        awaySaves={awaySaves}
        gameScore={gameScore}
        open={openGoalieModal}
        setOpenGoalieModal={setOpenGoalieModal}
        setGoalieSubmit={setGoalieSubmit}
        goalieSubmit={goalieSubmit}
        selectedHomeGoalieOne={selectedHomeGoalieOne}
        setSelectedHomeGoalieOne={setSelectedHomeGoalieOne}
        selectedAwayGoalieOne={selectedAwayGoalieOne}
        setSelectedAwayGoalieOne={setSelectedAwayGoalieOne}
        awayGoalieStats={awayGoalieStats}
        setAwayGoalieStats={setAwayGoalieStats}
        homeGoalieStats={homeGoalieStats}
        setHomeGoalieStats={setHomeGoalieStats}
        goalieType={goalieType}
        getGoalsAgainst={getGoalsAgainst}
        homeOneGoals={homeOneGoals}
        homeTwoGoals={homeTwoGoals}
        awayOneGoals={awayOneGoals}
        awayTwoGoals={awayTwoGoals}
        goalieStats={goalieStats}
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
                    homeSavePct={homeSavePct}
                    awaySavePct={awaySavePct}
                    homeSaves={homeSaves}
                    awaySaves={awaySaves}
                    setHomeSavePct={setHomeSavePct}
                    setAwaySavePct={setAwaySavePct}
                    setHomeSaves={setHomeSaves}
                    setAwaySaves={setAwaySaves}
                    handleGoalieOpen={handleGoalieOpen}
                    selectedHomeGoalieOne={selectedHomeGoalieOne}
                    selectedAwayGoalieOne={selectedAwayGoalieOne}
                    awayGoalieStats={awayGoalieStats}
                    homeGoalieStats={homeGoalieStats}
                    goalieStats={goalieStats}
                    goalieSubmit={goalieSubmit}
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
