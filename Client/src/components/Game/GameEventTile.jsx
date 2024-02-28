import { useEffect, useState } from "react";
import "./gameEvent.css";
import { LuSiren } from "react-icons/lu";

function GameEventTile({
  homeTeam,
  awayTeam,
  homeRoster,
  awayRoster,
  data,
  homeLoading,
  awayLoading,
}) {
  const [bannerColor, setBannerColor] = useState();
  const [homeLogoOpacity, setHomeLogoOpacity] = useState(0);
  const [awayLogoOpacity, setAwayLogoOpacity] = useState(0);
  const [homeOpacity, setHomeOpacity] = useState(1);
  const [awayOpacity, setAwayOpacity] = useState(1);
  const [eventLogo, setEventLogo] = useState();

  const [goalScorer, setGoalScorer] = useState({
    playerID: "",
    firstName: "",
    lastName: "",
    jerseyNumber: "",
  });
  const [primaryAssistPlayer, setPrimaryAssistPlayer] = useState({
    playerID: "",
    firstName: "",
    lastName: "",
    jerseyNumber: "",
  });
  const [secondaryAssistPlayer, setSecondaryAssistPlayer] = useState({
    playerID: "",
    firstName: "",
    lastName: "",
    jerseyNumber: "",
  });

  useEffect(() => {
    if (data.scoreTeam === homeTeam.teamID) {
      setBannerColor(homeTeam.primaryColor);
      setHomeLogoOpacity(0.5);
      setAwayOpacity(0.5);
      setEventLogo(homeTeam.logo);
    } else if (data.scoreTeam === awayTeam.teamID) {
      setBannerColor(awayTeam.primaryColor);
      setAwayLogoOpacity(0.5);
      setHomeOpacity(0.5);
      setEventLogo(awayTeam.logo);
    }
  }, [
    awayTeam.logo,
    awayTeam.primaryColor,
    awayTeam.teamID,
    data.scoreTeam,
    homeTeam.logo,
    homeTeam.primaryColor,
    homeTeam.teamID,
  ]);

  useEffect(() => {
    if (homeLoading === false) {
      {
        homeRoster.map((player) => {
          if (player.playerID === data.scorerID) {
            setGoalScorer({
              teamID: player.teamID,
              playerID: player.playerID,
              firstName: player.firstName,
              lastName: player.lastName,
              jerseyNumber: player.jerseyNumber,
            });
          }
          if (player.playerID === data.primaryAssistID) {
            setPrimaryAssistPlayer({
              playerID: player.playerID,
              firstName: player.firstName,
              lastName: player.lastName,
              jerseyNumber: player.jerseyNumber,
            });
          }
          if (player.playerID === data.secondaryAssistID) {
            setSecondaryAssistPlayer({
              playerID: player.playerID,
              firstName: player.firstName,
              lastName: player.lastName,
              jerseyNumber: player.jerseyNumber,
            });
          }
        });
      }
    }

    if (awayLoading === false) {
      {
        awayRoster.map((player) => {
          if (player.playerID === data.scorerID) {
            setGoalScorer({
              teamID: player.teamID,
              playerID: player.playerID,
              firstName: player.firstName,
              lastName: player.lastName,
              jerseyNumber: player.jerseyNumber,
            });
          }
          if (player.playerID === data.primaryAssistID) {
            setPrimaryAssistPlayer({
              playerID: player.playerID,
              firstName: player.firstName,
              lastName: player.lastName,
              jerseyNumber: player.jerseyNumber,
            });
          }
          if (player.playerID === data.secondaryAssistID) {
            setSecondaryAssistPlayer({
              playerID: player.playerID,
              firstName: player.firstName,
              lastName: player.lastName,
              jerseyNumber: player.jerseyNumber,
            });
          }
        });
      }
    } else {
      setGoalScorer({ firstName: "Loading..." });
    }
  }, [
    homeLoading,
    awayLoading,
    homeRoster,
    data.scorerID,
    data.primaryAssistID,
    data.secondaryAssistID,
    awayRoster,
  ]);

  return (
    <div className="gameEvent_tile_container">
      <section
        className="gameEvent_banner"
        style={{ backgroundColor: `${bannerColor}` }}
      >
        <img
          src={homeTeam.logo}
          alt=""
          className="home_banner_logo"
          style={{ opacity: `${homeLogoOpacity}` }}
        />
        <img
          src={awayTeam.logo}
          alt=""
          className="away_banner_logo"
          style={{ opacity: `${awayLogoOpacity}` }}
        />
        <div
          className="gameEvent_homeTeam"
          style={{ opacity: `${homeOpacity}` }}
        >
          <img src={homeTeam.logo} alt="" />
          <h2>{data.homeScore}</h2>
        </div>
        <div className="gameEvent_icon">
          <div className="gameEvent_icon_container">
            <LuSiren />
          </div>
          <p>Goal</p>
        </div>
        <div
          className="gameEvent_awayTeam"
          style={{ opacity: `${awayOpacity}` }}
        >
          <h2>{data.awayScore}</h2>
          <img src={awayTeam.logo} alt="" />
        </div>
      </section>
      <section className="gameEvent_tile_content">
        <div className="gameEvent_time_container">
          <p>{data.gameTime}</p>
          <small>{data.period}</small>
        </div>
        <div className="gameEvent_event_container">
          <img src={eventLogo} alt="Logo" />
          <div className="gameEvent_event">
            <h3>
              {goalScorer.firstName} {goalScorer.lastName} #
              {goalScorer.jerseyNumber}
            </h3>
            <div className="assist_container">
              {primaryAssistPlayer.playerID === "" ? (
                <p>Unassisted</p>
              ) : (
                <p>
                  Assists: {primaryAssistPlayer.firstName}{" "}
                  {primaryAssistPlayer.lastName} #
                  {primaryAssistPlayer.jerseyNumber}
                </p>
              )}
              {secondaryAssistPlayer.playerID === "" ? null : (
                <p>
                  , {secondaryAssistPlayer.firstName}{" "}
                  {secondaryAssistPlayer.lastName} #
                  {secondaryAssistPlayer.jerseyNumber}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GameEventTile;
