import { useEffect, useState } from "react";
import TestGameItem from "./TestGameItem";
import { DateTime } from "luxon";
import axios from "axios";

function TestSchduleTable({ date, teamData, index, selectedTeam, gameSubmit, setCurrentGame, setIsLoading }) {
  const newDate = DateTime.fromISO(date).toFormat("DD");
  const week = DateTime.fromISO(date).toFormat("EEE");
  const title = week + ", " + newDate;

  const [filterSchedule, setFilterSchedule] = useState([]);

  const [schedule, setSchedule] = useState([])


  const getFilterDate = async (date) => {
    // setIsLoading(true)
    await axios
    .get("http://localhost:9200/schedule/" + date)
    .then((res) => {
      setFilterSchedule(res.data);
    })
    .catch((err) => console.log(err))
    // .finally(() => {
    //   setTimeout(() => {
    //     setIsLoading(false)
    //   }, 1000)

    // })
  };

  const getFilterSchedule = async (date, teamID) => {
    const res = await axios.get(
      "http://localhost:9200/schedule/" + date + "/" + teamID
    );
    setFilterSchedule(res.data);
  };

  const getSchedule = async () => {
    await axios.get("http://localhost:9200/schedule")
    .then((res) => {
      setSchedule(res.data)
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    getSchedule()
  }, [])

  useEffect(() => {
    getRecord(9)
  }, [schedule])

  const getRecord = (teamID) => {
    let wins = 0
    let loses = 0
    let ties = 0
    schedule.filter((schedule) => schedule.homeID === teamID || schedule.awayID === teamID).map((schedule) => {
      if (schedule.homeID === teamID) {
        if(schedule.homeScore > schedule.awayScore) {
          wins += 1
        } else if(schedule.homeScore === schedule.awayScore && schedule.homeScore !== null && schedule.awayScore !== null) {
          ties += 1
        } else if (schedule.homeScore < schedule.awayScore) {
          loses += 1
        }
      }
      if (schedule.awayID === teamID) {
        if(schedule.awayScore > schedule.homeScore) {
          wins += 1
        } else if (schedule.awayScore === schedule.homeScore && schedule.homeScore !== null && schedule.awayScore !== null) {
          ties += 1
        } else if (schedule.awayScore < schedule.homeScore) {
          loses +=1
        }
      }
    })

    const record = wins + "-" + loses + "-" + ties
    console.log(record)
    // console.log(`wins: ${wins}`)
    // console.log(`loses: ${loses}`)
    // console.log(`ties: ${ties}`)
  }

  useEffect(() => {
    if (selectedTeam === undefined) {
      getFilterDate(date);
    } else {
      getFilterSchedule(date, selectedTeam);
    }
  }, [date, selectedTeam, gameSubmit]);


  return (
    <section className="schedule_section" id={`s${index}`}>
      <div className="test_table">
        <section className="test_table_header">
          <h2 className="test_table_date_title">{title}</h2>
        </section>
        {filterSchedule.length > 0 ? (
          <section className="test_table_field_header">
            <h3>Home</h3>
            <span/>
            <h3>Away</h3>
            <h3>Arena</h3>
            <h3>Time</h3>
            <h3>Score</h3>
          </section>
        ) : null}
        {filterSchedule.length > 0 ? (
          filterSchedule.map((data, i) => (
            <TestGameItem
              key={i}
              data={data}
              teamData={teamData}
              noGame={false}
              setCurrentGame={setCurrentGame}
            />
          ))
        ) : (
          <div className="no_games_container">
            <h2 className="no_games_title">NO GAMES</h2>
          </div>
        )}
      </div>
    </section>
  );
}

export default TestSchduleTable;
