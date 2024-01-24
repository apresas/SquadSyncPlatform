import React, { useRef } from 'react'
import "./leaderStatsItem.css"

function LeaderStatsItem({
    stats,
    index,
    type,
    selected
}) {
    const listIndex = index += 1;
    let stat = 0
    if(type === "GOALS"){
        stat = stats.goals
    } else if(type === "POINTS") {
        stat = stats.points
    } else if(type === "GAA") {
        stat = Number.parseFloat(stats.GAA).toFixed(2)
    } else if(type === "SV") {
        stat = Number.parseFloat(stats.SV).toFixed(3)
    }
  return (
    <div className='leader_stats_item'>
        <div className={selected}></div>
        <div className="position_number">{listIndex}.</div>
        <div className="leader_name">{stats.firstName} {stats.lastName}</div>
        <div className="leader_stat">{`${stat}`}</div>
    </div>
  )
}

export default LeaderStatsItem