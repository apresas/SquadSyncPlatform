// import React from 'react'

function StandingsTable() {
  return (
    <div>StandingsTable</div>
    // <table className="standings_table blue">
    //             <thead>
    //               <tr>
    //                 <th></th>
    //                 <th></th>
    //                 <th>GP</th>
    //                 <th>W</th>
    //                 <th>L</th>
    //                 <th>T</th>
    //                 <th>OTL</th>
    //                 <th className="points">P</th>
    //                 <th>W%</th>
    //                 <th>GF</th>
    //                 <th>GA</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {standings
    //                 .map((stats) => {
    //                   return stats;
    //                 })
    //                 .filter((stats) => stats.divison === "White")
    //                 .sort((a, b) =>
    //                   parseInt(a.points) > parseInt(b.points) ? -1 : 1
    //                 )
    //                 .map((stats, index) => {
    //                   const winPerRaw =
    //                     parseInt(stats.wins) / parseInt(stats.gamesPlayed);
    //                   const winPer = winPerRaw.toFixed(2);
    //                   const statIndex = (index += 1);
    //                   return (
    //                     <tr className="stats_row" key={stats.id}>
    //                       <td className="position_data">{statIndex}.</td>
    //                       <td className="title_data">
    //                         <img
    //                           className="standings_logo"
    //                           src={stats.logo}
    //                           alt="logo"
    //                         />
    //                         {stats.teamName}
    //                       </td>
    //                       <td className="stats_data">{stats.gamesPlayed}</td>
    //                       <td className="stats_data">{stats.wins}</td>
    //                       <td className="stats_data">{stats.losses}</td>
    //                       <td className="stats_data">{stats.tie}</td>
    //                       <td className="stats_data">{stats.otLoses}</td>
    //                       <td className="stats_data points">{stats.points}</td>
    //                       <td className="stats_data">{winPer}</td>
    //                       <td className="stats_data">{stats.goalsFor}</td>
    //                       <td className="stats_data">{stats.goalsAgainst}</td>
    //                     </tr>
    //                   );
    //                 })}
    //             </tbody>
    //           </table> 
  )
}

export default StandingsTable