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
  currentGameID,
  homeRoster,
  awayRoster,
  gameScore,
  setEventSubmit, 
  eventSubmit, 
  teams,
  gameEvents
}) {
  const [newEventID, setNewEventID] = useState();

  const homePlayers = Array.from(homeRoster)
  const awayPlayers = Array.from(awayRoster)
  const allPlayers = homePlayers.concat(awayPlayers)

  const [newEvent, setNewEvent] = useState({
    eventID: newEventID,
    gameID: currentGameID,
    scoringTeam: "",
    goalID: "",
    primaryAssistID: "",
    secondaryAssistID: "",
    homeScore: 0,
    awayScore: 0,
    gameTime: 0,
    period: "",
    type: "",
  });

  const periods = ["1st", "2nd", "3rd", "OT"];
  const [eventPlayers, setEventPlayers] = useState(allPlayers);
  const [eventPeriod, setEventPeriod] = useState();

  const [minutes, setMinutes] = useState()
  const [seconds, setSeconds] = useState()
  const [time, setTime] = useState()

  // const [currentGameID, setCurrentGameID] = useState()

  const generateID = () => {
    const newID = Math.floor(100000 + Math.random() * 900000);
    setNewEventID(newID);
  };

  useEffect(() => {
    const newTime = parseFloat(minutes + '.' + seconds);
    setTime(newTime)
  }, [minutes, seconds])

  useEffect(() => {
    generateID();
  }, [eventSubmit])

  // useEffect(() => {
  //   setCurrentGameID(currentGame.gameID)
  // }, [currentGame.gameID]);


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
      homeScore: gameScore.homeScore,
      awayScore: gameScore.awayScore
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
      .get("http://localhost:9200/playerByTeam/" + teamID)
      .then((res) => {
        const players = res.data.filter((player) => player.position === "Forward" || player.position === "Defense")
        setEventPlayers(players);
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
    homeScore: gameScore.homeScore,
    awayScore: gameScore.awayScore,
  })

  useEffect(() => {
    if(scoringID === homeTeam.teamID){
      setType("HOME")
    } else if(scoringID === awayTeam.teamID){
      setType("AWAY")
    }

    if(type === "HOME"){
      setNewScore({
        homeScore: gameScore.homeScore + 1,
        awayScore: gameScore.awayScore
      })
    } else if(type === "AWAY"){
      setNewScore({
        homeScore: gameScore.homeScore,
        awayScore: gameScore.awayScore + 1
      })
    }
    // console.log(type)
    // console.log(`EventID: ${newEventID}, GameID: ${currentGameID}, ScoringTeam: ${scoringID}, GoalID: ${goalID}, PrimaryID: ${primaryID}, SecondaryID: ${secondaryID} HomeScore: ${newScore.home} AwayScore: ${newScore.away}, Period: ${eventPeriod}, GameTime: ${time} Type: ${type} `)
    setNewEvent({
      eventID: newEventID,
      gameID: currentGameID,
      scoringTeam: scoringID,
      goalID: goalID,
      primaryAssistID: primaryID,
      secondaryAssistID: secondaryID,
      homeScore: newScore.homeScore,
      awayScore: newScore.awayScore,
      gameTime: time,
      period: eventPeriod,
      type: type,
    })
  }, [newEventID, currentGameID, scoringID, goalID, primaryID, secondaryID, eventPeriod, time, type, gameScore, homeTeam.teamID, awayTeam.teamID, newScore.homeScore, newScore.awayScore])

  useEffect(() => {
  //   if(eventSubmit){
  //   updateScore()
  // }

  // updateScore()
  }, [gameEvents])

  const getCurrentGame = async() => {
    let score = {
      homeScore: 0,
      awayScore: 0
    }
    await axios
    .get("http://localhost:9200/game/" + currentGameID)
    .then((res) => {
      score.homeScore = res.data.homeScore,
      score.awayScore = res.data.awayScore
      updateScore(score)
    })
  }

  const submitEvent = async (e) => {
    e.preventDefault();
    // console.log(newEvent)
    // console.log(newScore)
    try {
      await axios.post("http://localhost:9200/event", newEvent);
      console.log("Event Added");
      setEventSubmit(true)
    } catch (err) {
      console.log(err);
    }

    // try {
    //   await axios 
    //   .put("http://localhost:9200/schedule/" + currentGameID, newScore)
    //   console.log("score updated")
    // } catch (err) {
    //   console.log(err);
    // }


    setEventSubmit(!eventSubmit);
    clearFields();
    setOpenModal(false);
  };

  // const updateScore = async() => {
  //   await axios
  //   .patch("http://localhost:9200/game/" + currentGameID, gameScore)
  //   .catch(err => {console.log(err)})
  //   setEventSubmit(false)
  // }

  // console.log(eventSubmit)

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
                      :
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
              <button className="submit_btn btn" onClick={submitEvent}>Submit</button>
              <button className="cancel_btn btn" onClick={handleClose}>Cancel</button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default addGameEventModal;
