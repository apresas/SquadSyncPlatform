/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import "./dayTile.css";
import { DateTime } from "luxon";
import axios from "axios";

function DayTile({ href, date, selectedTeam }) {
  const month = DateTime.fromISO(date).toFormat("M");
  const day = DateTime.fromISO(date).toFormat("d");
  const dayOfWeek = DateTime.fromISO(date).toFormat("EEE");
  const dateTitle = month + "/" + day;
  const [gameCount, setGameCount] = useState(0);
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
  }, [date, selectedTeam]);

  useEffect(() => {
    setGameCount(filterSchedule.length);
  }, [filterSchedule.length]);

  return (
    <a className="day_container" href={href}>
      <div className="date_header">
        <div className="date">{dateTitle}</div>
        <div className="day">{dayOfWeek}</div>
      </div>
      <div className="game_container">
        <div className="number_of_games">{gameCount} Games</div>
        <FaRegCalendar />
      </div>
    </a>
  );
}

export default DayTile;
