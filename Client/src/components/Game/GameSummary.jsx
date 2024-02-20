import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import TitleBar from "../TitleBar";
import GameHeader from "./GameHeader";
import BoxScore from "./BoxScore";
import LineScore from "./LineScore";
import GameStats from "./GameStats";
import SeasonSeries from "./SeasonSeries";
import GameEvent from "./GameEvent";
import "./gameSummary.css";
import AddGameEventModal from "../../modal/AddGameEventModal";
import { DateTime } from "luxon";

function GameSummary({
  currentGame,
  teamData,
  getFilterTeam,
  filteredPlayers,
  eventSubmit,
  setEventSubmit,
  gameScore,
  setGameScore,
}) {
  const [homeTeam, setHomeTeam] = useState({});
  const [awayTeam, setAwayTeam] = useState({});
  const [homeResult, setHomeResult] = useState();
  const [awayResult, setAwayResult] = useState();
  const [scoringID, setScoringID] = useState();
  const [goalID, setGoalID] = useState();
  const [primaryID, setPrimaryID] = useState();
  const [secondaryID, setSecondaryID] = useState();
  const [scoringPlayerID, setScoringPlayerID] = useState();

  const [homeRoster, setHomeRoster] = useState([]);
  const [awayRoster, setAwayRoster] = useState([]);
  const [teams, setTeams] = useState([]);

  const home = useRef();
  const away = useRef();

  const [dateTitle, setDateTitle] = useState();

  const [homeLoading, setHomeLoading] = useState(false);
  const [awayLoading, setAwayLoading] = useState(false);

  const [gameEvents, setGameEvents] = useState([]);

  const [currentEvents, setCurrentEvents] = useState([]);

  // const [gameScore, setGameScore] = useState({
  //   homeScores: 0,
  //   awayScores: 0
  // })

  const setResult = (homeScore, awayScore) => {
    if (homeScore > awayScore) {
      setHomeResult("WIN");
      setAwayResult("LOSE");
    } else if (homeScore === awayScore) {
      setHomeResult("TIE");
      setAwayResult("TIE");
    } else {
      setHomeResult("LOSE");
      setAwayResult("WIN");
    }
  };

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
    // teamData.map((data) => {
    //   if(data.teamID === currentGame.homeID) {
    //     home.current = data;
    //     setHomeTeam(data)
    //   }
    //   if(data.teamID === currentGame.awayID) {
    //     away.current = data;
    //     setAwayTeam(data)
    //   }
    // })

    {
      teamData
        .map((data) => data)
        .filter((data) => data.teamID === currentGame.homeID)
        .map((data) => {
          home.current = data;
          setHomeTeam(data);
        });
    }
    {
      teamData
        .map((data) => data)
        .filter((data) => data.teamID === currentGame.awayID)
        .map((data) => {
          away.current = data;
          setAwayTeam(data);
        });
    }

    setResult(currentGame.homeScore, currentGame.awayScore);
    getGameEvents(currentGame.gameID);
    formatGameDate(currentGame.date);
  }, []);

  useEffect(() => {
    let teamList = [];
    getHomeRoster(homeTeam.teamID);
    getAwayRoster(awayTeam.teamID);
    teamList.push(homeTeam);
    teamList.push(awayTeam);
    setTeams(teamList);
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
  }, [homeTeam, awayTeam, currentEvents, eventSubmit]);

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
  }, [lineScore]);

  const setScores = () => {
    let homeFirst = 0;
    let homeSecond = 0;
    let homeThird = 0;
    let awayFirst = 0;
    let awaySecond = 0;
    let awayThird = 0;

    {
      currentEvents.map((event) => {
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

  useEffect(() => {
    let eventList = [];
    {
      gameEvents
        .filter((event) => event.gameID === currentGame.gameID)
        .forEach((event) => {
          eventList.push(event);
        });
    }
    setCurrentEvents(eventList);
  }, [gameEvents]);

  const getGameEvents = async (gameID) => {
    await axios
      .get("http://localhost:9200/events/" + gameID)
      .then((res) => {
        setGameEvents(res.data);
      })
      .catch((err) => console.log(err));
  };

  console.log(teams);

  const formatGameDate = (date) => {
    const newDate = DateTime.fromISO(date).toFormat("DD");
    const week = DateTime.fromISO(date).toFormat("EEE");
    const title = week + ", " + newDate;
    setDateTitle(title);
  };

  // console.log(gameScore)
  // console.log(lineScore)

  return (
    <>
      <AddGameEventModal
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        open={openModal}
        setOpenModal={setOpenModal}
        teamData={teamData}
        setScoringID={setScoringID}
        setGoalID={setGoalID}
        setPrimaryID={setPrimaryID}
        setSecondaryID={setSecondaryID}
        getFilterTeam={getFilterTeam}
        filteredPlayers={filteredPlayers}
        setScoringPlayerID={setScoringPlayerID}
        scoringID={scoringID}
        goalID={goalID}
        primaryID={primaryID}
        secondaryID={secondaryID}
        currentEvents={currentEvents}
        currentGame={currentGame}
        homeRoster={homeRoster}
        awayRoster={awayRoster}
        gameScore={gameScore}
        setGameScore={setGameScore}
        setEventSubmit={setEventSubmit}
        eventSubmit={eventSubmit}
        teams={teams}
      />
      <div className="gameSummary_container">
        <div className="gameSummary_content_container">
          <TitleBar title="Game Summary" subtitle="2023-2024" />
          <div className="gameSummary_app_container">
            <h2>{dateTitle}</h2>
            <GameHeader
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              gameScore={gameScore}
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
                  currentEvents={currentEvents}
                  setCurrentEvents={setCurrentEvents}
                  gameScore={gameScore}
                  eventSubmit={eventSubmit}
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
                  currentGame={currentGame}
                  homeTeam={homeTeam}
                  awayTeam={awayTeam}
                />
                <SeasonSeries
                  currentGame={currentGame}
                  homeTeam={homeTeam}
                  awayTeam={awayTeam}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameSummary;
