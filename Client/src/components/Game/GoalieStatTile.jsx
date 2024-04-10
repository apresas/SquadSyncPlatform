import { useState, useEffect } from 'react'

function GoalieStatTile({goalie, stat}) {
    const [currentGoalie, setCurrentGoalie] = useState({})
    const [TOI, setTOI] = useState("")
    const [savePct, setSavePct] = useState("")
    useEffect(() => {
        {goalie.filter((goalie) => goalie.playerID === stat.playerID).map((goalie) => {
            // console.log(goalie)
            setCurrentGoalie(goalie)
        })}
        formatTOI(stat.toi)
        formatSavePct(stat.shotsAgainst, stat.saves)
    }, [stat])
    
  const formatTOI = (toi) => {
      let toiString = String(toi);
      if (toiString.length <= 2) {
        setTOI(toiString + ":00");
      }
  };

  const formatSavePct = (shots, saves) => {
    let SavePct = (saves / shots).toFixed(3);
    setSavePct(SavePct);
  };

  return (
    <section className="goalie_stat_grid">
    <div className="goalie_stat_player">
      <h4>
        {currentGoalie.jerseyNumber}
      </h4>
      <span />
      <h4>
        {currentGoalie.firstName} {currentGoalie.lastName}
      </h4>
    </div>
    <div className="goalie_stat_header">
      <h4>SH/SV</h4>
      <h4>SV%</h4>
      <h4>TOI</h4>
    </div>
    <div className="goalie_stat_body">
      {stat.gameStatsID !== 0 ? (
        <div className="goalie_stat">
          {stat.shotsAgainst}/{stat.saves}
        </div>
      ) : (
        <div className="goalie_stat">NA</div>
      )}
      {stat.gameStatsID !== 0 ? (
        <div className="goalie_stat">{savePct}</div>
      ) : (
        <div className="goalie_stat">NA</div>
      )}
      <div className="goalie_stat">{TOI}</div>
    </div>
  </section>
  )
}

export default GoalieStatTile