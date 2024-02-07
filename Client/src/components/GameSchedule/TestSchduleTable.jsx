import React, { useEffect, useState } from "react";
import TestGameItem from "./TestGameItem";
import { DateTime } from "luxon";
import axios from "axios";

function TestSchduleTable({ date, teamData, index }) {
  const newDate = DateTime.fromISO(date).toFormat("DD");
  const week = DateTime.fromISO(date).toFormat("EEE");
  const title = week + ", " + newDate;

  const [filterSchedule, setFilterSchedule] = useState([]);
  const getFilterSchedule = async (date) => {
    const res = await axios.get("http://localhost:9200/schedule/" + date);
    setFilterSchedule(res.data);
  };

  useEffect(() => {
    getFilterSchedule(date);
  }, [date]);

  return (
    <section className="schedule_section" id={`s${index}`}>
      <div className="test_table">
        <section className="test_table_header">
          <h2 className="test_table_date_title">{title}</h2>
        </section>
        <section className="test_table_field_header">
          <h3>Matchup</h3>
          <h3>Arena</h3>
          <h3>Time</h3>
          <h3>Score</h3>
        </section>
        {filterSchedule.length > 0 ? (
          filterSchedule.map((data, i) => (
            <TestGameItem
              key={i}
              data={data}
              teamData={teamData}
              noGame={false}
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
