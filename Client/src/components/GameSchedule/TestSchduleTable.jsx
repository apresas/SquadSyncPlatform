import { useEffect, useState } from "react";
import TestGameItem from "./TestGameItem";
import { DateTime } from "luxon";
import axios from "axios";

function TestSchduleTable({
  date,
  teamData,
  index,
  selectedTeam,
  gameSubmit,
  setCurrentGame,
  setIsLoading,
}) {
  const newDate = DateTime.fromISO(date).toFormat("DD");
  const week = DateTime.fromISO(date).toFormat("EEE");
  const title = week + ", " + newDate;

  const [filterSchedule, setFilterSchedule] = useState([]);

  const getGames = async (date, teamID) => {
    if (selectedTeam === undefined) {
      await axios
        .get("http://localhost:9200/gamesByDate/" + date)
        .then((res) => {
          setFilterSchedule(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .get("http://localhost:9200/gamesByDate/" + date + "/" + teamID)
        .then((res) => {
          setFilterSchedule(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getGames(date, selectedTeam);
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
            <span />
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
