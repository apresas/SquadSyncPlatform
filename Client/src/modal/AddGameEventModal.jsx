/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import PlayerDropdown from "../components/PlayerForm/playerDropdown";
import "./addGameEventModal.css";
import axios from "axios";

function addGameEventModal({
  homeTeam,
  awayTeam,
  open,
  setOpenModal,
  setScoringID,
  setGoalID,
  setPrimaryID,
  setSecondaryID,
  getFilterTeam,
  scoringID,
  goalID,
  primaryID,
  secondaryID,
  currentGame,
  homeRoster,
  awayRoster,
  gameScore,
  setEventSubmit, 
  eventSubmit, 
  teams
}) {
  const [newEventID, setNewEventID] = useState();

  const homePlayers = Array.from(homeRoster)
  const awayPlayers = Array.from(awayRoster)
  const allPlayers = homePlayers.concat(awayPlayers)

  const [newEvent, setNewEvent] = useState({
    eventID: newEventID,
    gameID: currentGame.gameID,
    scoreTeam: "",
    scorerID: "",
    primaryAssistID: "",
    secondaryAssistID: "",
    homeScore: 0,
    awayScore: 0,
    gameTime: "",
    period: "",
    type: "",
  });

  const periods = ["1st", "2nd", "3rd"];
  const [eventPlayers, setEventPlayers] = useState(allPlayers);
  const [eventPeriod, setEventPeriod] = useState();

  const [minutes, setMinutes] = useState()
  const [seconds, setSeconds] = useState()
  const [time, setTime] = useState()

  const [currentGameID, setCurrentGameID] = useState()

  const generateID = () => {
    const newID = Math.floor(100000 + Math.random() * 900000);
    setNewEventID(newID);
  };

  useEffect(() => {
    setTime(minutes + ":" + seconds)
  }, [minutes, seconds])

  useEffect(() => {
    generateID();
  }, [eventSubmit])

  useEffect(() => {
    setCurrentGameID(currentGame.gameID)
  }, [currentGame.gameID]);


  const handleClose = () => {
    setOpenModal(false);
    clearFields()
  };

  const clearFields = () => {
    getFilterTeam(undefined);
    setScoringID(undefined)
    setGoalID(undefined);
    setPrimaryID(undefined);
    setSecondaryID(undefined);
    setEventPeriod(undefined);
    setType(undefined);
    setNewScore({
      home: gameScore.homeScore,
      away: gameScore.awayScore
    })
  }

  // const getEventPlayers = async (homeID, awayID) => {
  //   let playerList = [];
  //   setHomeLoading(true);
  //   await axios
  //     .get("http://localhost:9200/players/" + homeID)
  //     .then((res) => {
  //       // setEventPlayers(res.data);
  //       playerList.push(...res.data);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setHomeLoading(false));
  //   setAwayLoading(true);
  //   await axios
  //     .get("http://localhost:9200/players/" + awayID)
  //     .then((res) => {
  //       playerList.push(...res.data);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setAwayLoading(false));

  //   setEventPlayers(playerList);
  // };

  const getFilteredEventPlayers = async (teamID) => {
    await axios
      .get("http://localhost:9200/players/" + teamID)
      .then((res) => {
        setEventPlayers(res.data);
      })
      .catch((err) => console.log(err));
  };

  // const getTestScore = (lastEvent) => {
  //   setLastScore({
  //     home: lastEvent.homeScore,
  //     away: lastEvent.awayScore,
  //   });
  // };

  useEffect(() => {
    if(scoringID === homeTeam.teamID) {
      // console.log("home team selected")
      getFilteredEventPlayers(scoringID)
    } else if(scoringID === awayTeam.teamID) {
      // console.log("away team selected")
      getFilteredEventPlayers(scoringID)
    } else {
      // console.log("no team selected")
      // getEventPlayers(homeTeam.teamID, awayTeam.teamID)
    }
  }, [awayTeam.teamID, homeTeam.teamID, scoringID])

  // console.log(`${lastScore.home} - ${lastScore.away}`)

  const [type, setType] = useState()
  const [newScore, setNewScore] = useState({
    home: gameScore.homeScore,
    away: gameScore.awayScore,
  })

  useEffect(() => {
    if(scoringID === homeTeam.teamID){
      setType("HOME")
    } else if(scoringID === awayTeam.teamID){
      setType("AWAY")
    }

    if(type === "HOME"){
      setNewScore({
        home: gameScore.homeScore + 1,
        away: gameScore.awayScore
      })
    } else if(type === "AWAY"){
      setNewScore({
        home: gameScore.homeScore,
        away: gameScore.awayScore + 1
      })
    }
    // console.log(`EventID: ${newEventID}, GameID: ${currentGameID}, ScoringTeam: ${scoringID}, GoalID: ${goalID}, PrimaryID: ${primaryID}, SecondaryID: ${secondaryID} HomeScore: ${newScore.home} AwayScore: ${newScore.away}, Period: ${eventPeriod}, GameTime: ${time} Type: ${type} `)
    setNewEvent({
      eventID: newEventID,
      gameID: currentGameID,
      scoreTeam: scoringID,
      scorerID: goalID,
      primaryAssistID: primaryID,
      secondaryAssistID: secondaryID,
      homeScore: newScore.home,
      awayScore: newScore.away,
      gameTime: time,
      period: eventPeriod,
      type: type,
    })
  }, [newEventID, currentGameID, scoringID, goalID, primaryID, secondaryID, eventPeriod, time, type, gameScore, homeTeam.teamID, awayTeam.teamID, newScore.home, newScore.away])


  const submitEvent = async (e) => {
    e.preventDefault();
    console.log(newEvent)
    try {
      await axios.post("http://localhost:9200/events", newEvent);
      console.log("Event Added");
    } catch (err) {
      console.log(err);
    }

    try {
      await axios 
      .put("http://localhost:9200/schedule/" + currentGame.gameID, newScore)
      console.log("score updated")
    } catch (err) {
      console.log(err);
    }


    setEventSubmit(!eventSubmit);
    clearFields();
    setOpenModal(false);
  };

  if (!open) {
    return null;
  }
  return (
    <>
      <div className="event_overlay">
        <div className="event_container">
          <div className="event_content">
            <form className="event_form_container">
              <h2>Add Event</h2>
              <div className="event_field">
                <div className="event_dropdown">
                  <h3>Scoring Team</h3>
                  <PlayerDropdown
                    data={teams}
                    type="Scoring Team"
                    setScoringID={setScoringID}
                  />
                </div>
                <div className="event_dropdown">
                  <h3>Goal Scorer</h3>
                  <PlayerDropdown
                    data={eventPlayers}
                    type="Goal Scorer"
                    setGoalID={setGoalID}
                  />
                </div>
              </div>
              <div className="event_field">
                <div className="event_dropdown">
                  <h3>Primary Assist</h3>
                  <PlayerDropdown
                    data={eventPlayers}
                    type="Primary Assist"
                    setPrimaryID={setPrimaryID}
                  />
                </div>
                <div className="event_dropdown">
                  <h3>Secondary Assist</h3>
                  <PlayerDropdown
                    data={eventPlayers}
                    type="Secondary Assist"
                    setSecondaryID={setSecondaryID}
                  />
                </div>
              </div>
              <div className="event_field">
                <div className="event_dropdown">
                  <h3>Period</h3>
                  <PlayerDropdown
                    data={periods}
                    type="Periods"
                    setEventPeriod={setEventPeriod}
                  />
                </div>
                <div className="event_dropdown">
                  <h3>Time</h3>
                  <div id="time-input">
                    <input type="text" id="hours" max="2" dir="rtl" onChange={(e) => setMinutes(e.target.value)} />
                    <div id="colon">
                      <span> : </span>
                    </div>
                    <input type="text" id="minutes" max="2" onChange={(e) => setSeconds(e.target.value)} />
                  </div>
                  {/* <input
                    className="event_time"
                    name="time"
                    type="time"
                    min="00:00"
                    max="15:00"
                    pattern="[0-9]{2}:[0-9]{2}"
                    //   onChange={(e) => setTime(e.target.value)}
                  /> */}
                </div>
              </div>
            </form>
            <section className="event_controls">
              <button onClick={submitEvent}>Submit</button>
              <button onClick={handleClose}>Cancel</button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default addGameEventModal;
