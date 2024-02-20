import { useState, useEffect } from "react";
import PlayerDropdown from "../components/PlayerForm/playerDropdown";
import "./addGameEventModal.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function addGameEventModal({
  homeTeam,
  awayTeam,
  teamData,
  open,
  setOpenModal,
  setScoringID,
  getFilterTeam,
  filteredPlayers,
  setScoringPlayerID,
  scoringID,
  currentEvents
}) {

    const [newEvent, setNewEvent] = useState({
        eventID: '',
        gameID: '',
        scoreTeam: '',
        scorerID: '',
        primaryAssist: '',
        secondaryAssist: '',

    })
  const [eventTeams, setEventTeams] = useState([]);
  const periods = ["1st", "2nd", "3rd"];
  const [eventPlayers, setEventPlayers] = useState([]);
  const [eventPeriod, setEventPeriod] = useState();

  const [homeLoading, setHomeLoading] = useState(false);
  const [awayLoading, setAwayLoading] = useState(false);

  const [lastScore, setLastScore] = useState({
    home: 0,
    away: 0
  })

  useEffect(() => {
    let teamsList = [];
    teamsList.push(homeTeam);
    teamsList.push(awayTeam);
    setEventTeams(teamsList);
    getEventPlayers(homeTeam.teamID, awayTeam.teamID);
    // getFilterTeam(homeTeam.teamID);
  }, []);

  useEffect(() => {
    // getFilterTeam(scoringID);
    // console.log(scoringID)
    getFilteredEventPlayers(scoringID);
  }, [scoringID]);

  const [lastEvent, setLastEvent]  = useState({})


  useEffect(() => {
    setLastEvent(currentEvents[currentEvents.length - 1])
  }, [open])


  const handleClose = () => {
    getFilterTeam(undefined);
    setOpenModal(false);
  };

  const getEventPlayers = async (homeID, awayID) => {
    let playerList = [];
    setHomeLoading(true)
    await axios
      .get("http://localhost:9200/players/" + homeID)
      .then((res) => {
        // setEventPlayers(res.data);
        playerList.push(...res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setHomeLoading(false))
      setAwayLoading(true)
    await axios
      .get("http://localhost:9200/players/" + awayID)
      .then((res) => {
        playerList.push(...res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setAwayLoading(false));

    setEventPlayers(playerList);
  };

  const getFilteredEventPlayers = async (teamID) => {
    await axios
      .get("http://localhost:9200/players/" + teamID)
      .then((res) => {
        setEventPlayers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getTestScore = (lastEvent) => {
    setLastScore({
      home: lastEvent.homeScore,
      away: lastEvent.awayScore
    })
  }

  // console.log(`${lastScore.home} - ${lastScore.away}`)

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
                    data={eventTeams}
                    type="Scoring Team"
                    setScoringID={setScoringID}
                    //   setAwayID={setAwayID}
                  />
                </div>
                <div className="event_dropdown">
                  <h3>Goal Scorer</h3>
                  <PlayerDropdown
                    data={eventPlayers}
                    type="Filtered Players"
                    setScoringPlayerID={setScoringPlayerID}
                    //   setAwayID={setAwayID}
                  />
                </div>
              </div>
              <div className="event_field">
                <div className="event_dropdown">
                  <h3>Primary Assist</h3>
                  <PlayerDropdown
                    data={eventPlayers}
                    type="Filtered Players"
                    setScoringPlayerID={setScoringPlayerID}
                  />
                </div>
                <div className="event_dropdown">
                  <h3>Secondary Assist</h3>
                  <PlayerDropdown
                    data={eventPlayers}
                    type="Filtered Players"
                    setScoringPlayerID={setScoringPlayerID}
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
                    <input type="text" id="hours" max="2" dir="rtl" />
                    <div id="colon">
                      <span>:</span>
                    </div>
                    <input type="text" id="minutes" max="2" />
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
              <button onClick={() => getTestScore(lastEvent)}>Submit</button>
              <button onClick={handleClose}>Cancel</button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default addGameEventModal;
