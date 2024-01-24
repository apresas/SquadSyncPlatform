/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { DateTime } from "luxon";
import TableItem from "./TableItem";
import TableHeader from "./TableHeader";
import NoGamesHeader from "./NoGamesHeader";
import "./scheduleTable.css";

function ScheduleTable({
  gameData,
  date,
  filterTeam,
  filteredItem,
  setFilteredItem,
  defaultTeam,
  setDefaultTeam,
}) {
  const newDate = DateTime.fromISO(date).toFormat("DD");
  const week = DateTime.fromISO(date).toFormat("EEE");
  const title = week + ", " + newDate;

  const filterByTeam = (team) => {
    if (team.homeTeam === filterTeam || team.awayTeam === filterTeam) {
      setFilteredItem(team);
      return team;
    } else if (filterTeam === "All Teams") {
      setFilteredItem(team);
      return team;
    } else if (filterTeam === undefined) {
      setFilteredItem(team);
      return team;
    }
  };

  return (
    <>
      <div className="schedule_table_container">
        <h2>{title}</h2>
        {gameData.length !== 0 ? <TableHeader /> : <NoGamesHeader />}
        {gameData
          .map((mItem) => mItem)
          .filter(filterByTeam)
          .map((data, i) => (
            <TableItem id={data.gameID} key={i} gameData={data} />
          ))}
        {/* {gameData.map((data, i) => (
          <TableItem id={i} key={i} gameData={data} />
        ))} */}
      </div>
    </>
  );
}

export default ScheduleTable;
