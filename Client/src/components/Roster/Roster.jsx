import { useState, useEffect } from "react";
import "./roster.css";
import RosterTile from "./RosterTile";
import axios from "axios";

function Roster() {
  const [roster, setRoster] = useState([]);
  const [team, setTeam] = useState({});
  useEffect(() => {
    getRoster();
    getTeam();
  }, []);

  const getRoster = async () => {
    await axios
      .get("http://localhost:9200/playerByTeam/" + 7)
      .then((res) => {
        setRoster(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTeam = async () => {
    await axios
      .get("http://localhost:9200/team/" + 7)
      .then((res) => {
        setTeam(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="roster_container">
      <div className="roster_content">
        <div className="roster_content_container">
          <div className="active_grid">
            <div className="roster_grid">
              <h2 className="roster_title">Forwards</h2>
              <div className="roster_forward_grid">
                {roster
                  .filter((player) => player.position === "Forward")
                  .map((player, i) => (
                    <RosterTile key={i} player={player} team={team} isActive={true}/>
                  ))}
              </div>
            </div>
            <div className="roster_grid">
              <h2 className="roster_title">Defense</h2>
              <div className="roster_defense_grid">
                {roster
                  .filter((player) => player.position === "Defense")
                  .map((player, i) => (
                    <RosterTile key={i} player={player} team={team} isActive={true}/>
                  ))}
              </div>
            </div>
          </div>
          <div className="scratch_section">
            <div className="roster_grid">
              <div className="roster_title">Inactive</div>
              <div className="scratch_grid">
              {roster
                  .filter((player) => player.position === "Forward" || player.position === "Defense")
                  .map((player, i) => (
                    <RosterTile key={i} player={player} team={team} isActive={false}/>
                  ))}
              </div>
            </div>
          </div>
          <div className="roster_controls">
            <button className="submit_btn btn">Submit</button>
            <button className="cancel_btn btn">Reset</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Roster;
