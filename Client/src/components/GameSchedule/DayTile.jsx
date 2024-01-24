/* eslint-disable react/prop-types */
import { useEffect, useState} from "react";
import { FaRegCalendar } from "react-icons/fa";
import "./dayTile.css";
import { DateTime } from "luxon";

function DayTile({ href, date, scheduleData }) {
  const month = DateTime.fromISO(date).toFormat("M");
  const day = DateTime.fromISO(date).toFormat("d");
  const dayOfWeek = DateTime.fromISO(date).toFormat("EEE");
  const dateTitle = month + "/" + day;

  const [gameCount, setGameCount] = useState(0);

  useEffect(() => {
    scheduleData.filter((sdate) => sdate.date === date).map((sdate) => {
      // console.log(sdate)
      setGameCount(sdate.games.length)
      if (sdate === undefined) {
        setGameCount(0)
      }
    })
  })

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
