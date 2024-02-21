import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function TestGameItem({ data, teamData, setCurrentGame }) {
  const [homeLogo, setHomeLogo] = useState();
  const [awayLogo, setAwayLogo] = useState();
  const [homeName, setHomeName] = useState();
  const [awayName, setAwayName] = useState();
  const [time, setTime] = useState();

  const { id } = useParams();

  useEffect(() => {
    {
      teamData.map((team) => {
        if (team.teamID === data.homeID) {
          setHomeLogo(team.logo);
          setHomeName(team.schoolName);
        } else if (team.teamID === data.awayID) {
          setAwayLogo(team.logo);
          setAwayName(team.schoolName);
        }
      });
    }
    const timeString12hr = new Date(
      "1970-01-01T" + data.time + "Z"
    ).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    setTime(timeString12hr);
  }, [data]);

  const link = "/game/" + data.gameID;

  const handleGameClick = () => {
    setCurrentGame(data)
  }

  

  return (
    <div className="game_item_container" onClick={handleGameClick}>
    <Link
    to={link}
    style={{ color: "inherit", textDecoration: "inherit", backgroundColor: "inherit" }}
    >
    <div className="test_game_item">
      <div className="test_hometeam">
        <h3>{homeName}</h3>
        <img src={homeLogo} alt="logo" />
      </div>
      <span>vs</span>
      <div className="test_awayteam">
        <img src={awayLogo} alt="logo" />
        <h3>{awayName}</h3>
      </div>
      <p className="test_date">{data.arena}</p>
      <p className="test_time">{time}</p>
      <p className="test_score">
        {data.homeScore} - {data.awayScore}
      </p>
    </div>
    </Link>
    </div>
  );
}

export default TestGameItem;
