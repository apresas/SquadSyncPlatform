import { useState, useEffect, useRef } from "react";
import "./goalieStatsModal.css";
import axios from "axios";
import PlayerDropdown from "../components/PlayerForm/playerDropdown";
import { FaPlus, FaMinus } from "react-icons/fa6";

function GoalieStatsModal({
  currentGameID,
  homeTeam,
  awayTeam,
  open,
  homeSavePct,
  awaySavePct,
  homeSaves,
  awaySaves,
  homeShots,
  awayShots,
  gameScore,
  setOpenGoalieModal,
  setGoalieSubmit,
  goalieSubmit,
  selectedHomeGoalieOne,
  setSelectedHomeGoalieOne,
  selectedAwayGoalieOne,
  setSelectedAwayGoalieOne,
  setAwayGoalieStats,
  setHomeGoalieStats,
  goalieType,
  getGoalsAgainst,
  homeOneGoals,
  homeTwoGoals,
  awayOneGoals,
  awayTwoGoals,
  goalieStats,
}) {
  const [homeTwoDefTOI, setHomeTwoDefTOI] = useState({
    minutes: 0,
    seconds: 0,
  });

  const [homeTwoDefShots, setHomeTwoDefShots] = useState(0);
  const addHomeGoalie = useRef();
  const [addHomeToggle, setAddHomeToggle] = useState(false);
  const [addAwayToggle, setAddAwayToggle] = useState(false);
  const [selected, setSelected] = useState(false);
  const [twoHomeGoalies, setTwoHomeGoalies] = useState(false);
  const [twoAwayGoalies, setTwoAwayGoalies] = useState(false);
  // const [homeTOIOne, setHomeTOIOne] = useState(45);
  // const [homeTOITwo, setHomeTOITwo] = useState(0);
  // const [awayTOIOne, setAwayTOIOne] = useState(0);
  // const [awayTOITwo, setAwayTOITwo] = useState(0);
  const [homeGoalies, setHomeGoalies] = useState([]);
  const [awayGoalies, setAwayGoalies] = useState([]);
  // const [selectedHomeGoalieOne, setSelectedHomeGoalieOne] = useState({});
  const [selectedHomeGoalieTwo, setSelectedHomeGoalieTwo] = useState({});
  // const [selectedAwayGoalieOne, setSelectedAwayGoalieOne] = useState({});
  const [selectedAwayGoalieTwo, setSelectedAwayGoalieTwo] = useState({});

  const [homeOneShotsAgainst, setHomeOneShotsAgainst] = useState(
    // parseInt(awayShots)
    awayShots
  );
  const [awayOneShotsAgainst, setAwayOneShotsAgainst] = useState(
    // parseInt(homeShots)
    homeShots
  );
  const [homeTwoShotsAgainst, setHomeTwoShotsAgainst] = useState(0);
  const [awayTwoShotsAgainst, setAwayTwoShotsAgainst] = useState(0);

  const [homeOneSv, setHomeOneSv] = useState(0);
  const [homeTwoSv, setHomeTwoSv] = useState(0);
  const [awayOneSv, setAwayOneSv] = useState(0);
  const [awayTwoSv, setAwayTwoSv] = useState(0);

  const [homeOneSvPct, setHomeOneSvPct] = useState(0);
  const [homeTwoSvPct, setHomeTwoSvPct] = useState(0);
  const [awayOneSvPct, setAwayOneSvPct] = useState(0);
  const [awayTwoSvPct, setAwayTwoSvPct] = useState(0);

  const [homeOneGA, setHomeOneGA] = useState(0);
  const [homeTwoGA, setHomeTwoGA] = useState(0);
  const [awayOneGA, setAwayOneGA] = useState(0);
  const [awayTwoGA, setAwayTwoGA] = useState(0);

  const [homeOneMinutes, setHomeOneMinutes] = useState(45);
  const [homeOneSeconds, setHomeOneSeconds] = useState(0);
  const [homeTwoMinutes, setHomeTwoMinutes] = useState(0);
  const [homeTwoSeconds, setHomeTwoSeconds] = useState(0);
  const [awayOneMinutes, setAwayOneMinutes] = useState(45);
  const [awayOneSeconds, setAwayOneSeconds] = useState(0);
  const [awayTwoMinutes, setAwayTwoMinutes] = useState(0);
  const [awayTwoSeconds, setAwayTwoSeconds] = useState(0);
  const [homeGoalieOneStats, setHomeGoalieOneStats] = useState({
    goalieStatsID: 0,
    playerID: null,
    gameID: currentGameID,
    saves: 0,
    shotsAgainst: 0,
    goalsAgainst: 0,
    savePct: 0,
    TOI: null,
  });
  const [awayGoalieOneStats, setAwayGoalieOneStats] = useState({
    goalieStatsID: 0,
    playerID: null,
    gameID: null,
    saves: null,
    shotsAgainst: 0,
    goalsAgainst: 0,
    savePct: null,
    TOI: null,
  });
  const [homeGoalieTwoStats, setHomeGoalieTwoStats] = useState({
    goalieStatsID: 0,
    playerID: null,
    gameID: currentGameID,
    saves: homeSaves,
    shotsAgainst: 0,
    goalsAgainst: 0,
    savePct: 0,
    TOI: null,
  });
  const [awayGoalieTwoStats, setAwayGoalieTwoStats] = useState({
    goalieStatsID: 0,
    playerID: null,
    gameID: null,
    saves: null,
    shotsAgainst: 0,
    goalsAgainst: 0,
    savePct: null,
    TOI: null,
  });

  const [newGoalieStatID, setNewGoalieStatID] = useState();

  const [homeOneStatID, setHomeOneStatID] = useState();
  const [awayOneStatID, setAwayOneStatID] = useState();
  const [homeTwoStatID, setHomeTwoStatID] = useState();
  const [awayTwoStatID, setAwayTwoStatID] = useState();

  const generateID = (type) => {
    if (type === "HOME") {
      const newID = Math.floor(100000 + Math.random() * 900000);
      setHomeOneStatID(newID);
    }
    if (type === "AWAY") {
      const newID = Math.floor(100000 + Math.random() * 900000);
      setAwayOneStatID(newID);
    }
    if (type === "HOME2") {
      const newID = Math.floor(100000 + Math.random() * 900000);
      setHomeTwoStatID(newID);
    }
    if (type === "AWAY2") {
      const newID = Math.floor(100000 + Math.random() * 900000);
      setAwayTwoStatID(newID);
    }
  };

  useEffect(() => {
    let homeGoalie = [];
    let homeStat = [];
    let awayGoalie = [];
    let awayStat = [];
    if (goalieType === "UPDATE") {
      {
        goalieStats.map((stat) => {
          if (stat.teamID === homeTeam.teamID) {
            homeStat.push(stat);
            {
              homeGoalies
                .filter((goalie) => goalie.playerID === stat.playerID)
                .map((goalie) => {
                  homeGoalie.push(goalie);
                });
            }
          } else if (stat.teamID === awayTeam.teamID) {
            awayStat.push(stat);
            {
              awayGoalies
                .filter((goalie) => goalie.playerID === stat.playerID)
                .map((goalie) => {
                  awayGoalie.push(goalie);
                });
            }
          }
        });
      }

      if (homeStat.length === 2) {
        let oneSVPct = Math.round((homeStat[0].saves / homeStat[0].shotsAgainst)* 1000) / 1000
        let twoSVPct = Math.round((homeStat[1].saves/ homeStat[1].shotsAgainst) * 1000) / 1000
        if(oneSVPct === isNaN) {
          oneSVPct = 0
        }
        if(twoSVPct === isNaN) {
          twoSVPct = 0
        }
        setHomeGoalieOneStats({
          goalieStatsID: homeStat[0].goalieStatsID,
          playerID: homeStat[0].playerID,
          gameID: homeStat[0].gameID,
          saves: homeStat[0].saves,
          savePct: oneSVPct,
          shotsAgainst: homeStat[0].shotsAgainst,
          goalsAgainst: homeStat[0].goalsAgainst,
          TOI: homeStat[0].toi,
        });
        setHomeGoalieTwoStats({
          goalieStatsID: homeStat[1].goalieStatsID,
          playerID: homeStat[1].playerID,
          gameID: homeStat[1].gameID,
          saves: homeStat[1].saves,
          savePct: twoSVPct,
          shotsAgainst: homeStat[1].shotsAgainst,
          goalsAgainst: homeStat[1].goalsAgainst,
          TOI: homeStat[1].toi,
        });

        {
          homeGoalie
            .filter((goalie) => goalie.playerID === homeStat[0].playerID)
            .map((goalie) => {
              console.log(goalie);
              setSelectedHomeGoalieOne(goalie);
            });
        }
        {
          homeGoalie
            .filter((goalie) => goalie.playerID === homeStat[1].playerID)
            .map((goalie) => {
              setSelectedHomeGoalieTwo(goalie);
              // setHomeOneShotsAgainst(homeStat[1].shotsAgainst);
            });
        }

        {
          homeStat
            .filter((stat) => stat.playerID === homeGoalie[0].playerID)
            .map((stat) => {
              if (String(stat.toi).length <= 2) {
                setHomeOneMinutes(stat.toi);
                setHomeOneSeconds("00");
              }
              setHomeOneShotsAgainst(stat.shotsAgainst);
            });
        }

        setAwayOneMinutes();
        setAwayOneSeconds();
      } else if (homeStat.length === 1) {
        let oneSVPct = Math.round((homeStat[0].saves / homeStat[0].shotsAgainst)* 1000) / 1000
        setHomeGoalieOneStats({
          goalieStatsID: homeStat[0].goalieStatsID,
          playerID: homeStat[0].playerID,
          gameID: homeStat[0].gameID,
          saves: homeStat[0].saves,
          savePct: oneSVPct,
          shotsAgainst: homeStat[0].shotsAgainst,
          goalsAgainst: homeStat[0].goalsAgainst,
          TOI: homeStat[0].toi,
        });
        setHomeGoalieTwoStats({
          goalieStatsID: undefined,
          playerID: undefined,
          gameID: homeStat[0].gameID,
          saves: 0,
          savePct: 0,
          shotsAgainst: 0,
          goalsAgainst: 0,
          TOI: 0,
        });
        setHomeOneShotsAgainst(homeStat[0].shotsAgainst);
        {
          homeGoalie
            .filter((goalie) => goalie.playerID === homeStat[0].playerID)
            .map((goalie) => {
              setSelectedHomeGoalieOne(goalie);
            });
        }
      }
      if (awayStat.length === 2) {
        let oneSVPct = Math.round((homeStat[0].saves / homeStat[0].shotsAgainst)* 1000) / 1000
        let twoSVPct = Math.round((homeStat[1].saves/ homeStat[1].shotsAgainst) * 1000) / 1000
        setAwayGoalieOneStats({
          goalieStatsID: awayStat[0].goalieStatsID,
          playerID: awayStat[0].playerID,
          gameID: awayStat[0].gameID,
          saves: awayStat[0].saves,
          savePct: oneSVPct,
          shotsAgainst: awayStat[0].shotsAgainst,
          goalsAgainst: awayStat[0].goalsAgainst,
          TOI: awayStat[0].toi,
        });
        setAwayGoalieTwoStats({
          goalieStatsID: awayStat[1].goalieStatsID,
          playerID: awayStat[1].playerID,
          gameID: awayStat[1].gameID,
          saves: awayStat[1].saves,
          savePct: twoSVPct,
          shotsAgainst: awayStat[1].shotsAgainst,
          goalsAgainst: awayStat[1].goalsAgainst,
          TOI: awayStat[1].toi,
        });
        {
          awayGoalie
            .filter((goalie) => goalie.playerID === awayStat[0].playerID)
            .map((goalie) => {
              console.log(goalie);
              setSelectedHomeGoalieOne(goalie);
            });
        }
        {
          awayGoalie
            .filter((goalie) => goalie.playerID === awayStat[1].playerID)
            .map((goalie) => {
              setSelectedHomeGoalieTwo(goalie);
              // setHomeOneShotsAgainst(awayStat[1].shotsAgainst);
            });
        }

        {
          awayStat
            .filter((stat) => stat.playerID === awayGoalie[0].playerID)
            .map((stat) => {
              if (String(stat.toi).length <= 2) {
                setHomeOneMinutes(stat.toi);
                setHomeOneSeconds("00");
              }
              setHomeOneShotsAgainst(stat.shotsAgainst);
            });
        }

        // setAwayOneMinutes();
        // setAwayOneSeconds();
        // setAwayOneShotsAgainst(awayStat[0].shotsAgainst);
        // setAwayOneShotsAgainst(awayStat[1].shotsAgainst);
        // setSelectedAwayGoalieOne(awayGoalie[0]);
        // setSelectedAwayGoalieTwo(awayGoalie[1]);
      } else if (awayStat.length === 1) {
        setAwayGoalieOneStats({
          goalieStatsID: awayStat[0].goalieStatsID,
          playerID: awayStat[0].playerID,
          gameID: awayStat[0].gameID,
          saves: awayStat[0].saves,
          savePct: Math.round((awayStat[0].saves / awayStat[0].shotsAgainst)* 1000) / 1000,
          shotsAgainst: awayStat[0].shotsAgainst,
          goalsAgainst: awayStat[0].goalsAgainst,
          TOI: awayStat[0].toi,
        });
        setAwayGoalieTwoStats({
          goalieStatsID: undefined,
          playerID: undefined,
          gameID: awayStat[0].gameID,
          saves: 0,
          savePct: 0,
          shotsAgainst: 0,
          goalsAgainst: 0,
          TOI: 0,
        });
        setAwayOneShotsAgainst(awayStat[0].shotsAgainst);
        setSelectedAwayGoalieOne(awayGoalie[0]);
        setAwayOneMinutes(45)
        setAwayOneSeconds("00")
      }
    } else if (goalieType === "ADD") {
      setHomeOneShotsAgainst(awayShots);
      setAwayOneShotsAgainst(homeShots);
      setHomeOneSvPct(homeSavePct);
      setAwayOneSvPct(awaySavePct);
      setHomeTwoDefTOI({ minutes: 0, seconds: 0 });
      setTwoHomeGoalies(false);
      setTwoAwayGoalies(false);
      setAddHomeToggle(false);
      setAddAwayToggle(false);
    }
  }, [
    open,
    goalieStats,
    goalieType,
    homeTeam.teamID,
    awayTeam.teamID,
    homeGoalies,
    awayGoalies,
    setSelectedHomeGoalieOne,
    setSelectedAwayGoalieOne,
    awayShots,
    homeShots,
    homeSavePct,
    awaySavePct,
  ]);

  useEffect(() => {
    generateID("HOME");
    generateID("AWAY");
    generateID("HOME2");
    generateID("AWAY2");
  }, [goalieSubmit]);

  useEffect(() => {
    generateID("HOME");
    generateID("AWAY");
    generateID("HOME2");
    generateID("AWAY2");
    setSelected(false);
  }, []);

  useEffect(() => {
    getGoalies(homeTeam.teamID, awayTeam.teamID);
  }, [homeTeam, awayTeam]);

  useEffect(() => {
    getGoalsAgainst(
      homeGoalieOneStats.TOI,
      homeGoalieTwoStats.TOI,
      awayGoalieOneStats.TOI,
      awayGoalieTwoStats.TOI
    );
  }, [
    homeGoalieOneStats,
    homeGoalieTwoStats,
    awayGoalieOneStats,
    awayGoalieTwoStats,
  ]);

  useEffect(() => {
    getSavePct(
      homeOneShotsAgainst,
      homeTwoShotsAgainst,
      awayOneShotsAgainst,
      awayTwoShotsAgainst,
      homeOneGoals,
      homeTwoGoals,
      awayOneGoals,
      awayTwoGoals
    );
  }, [
    homeOneGoals,
    homeTwoGoals,
    awayOneGoals,
    awayTwoGoals,
    homeOneShotsAgainst,
    awayOneShotsAgainst,
    homeTwoShotsAgainst,
    awayTwoShotsAgainst,
  ]);

  const getSavePct = (
    homeOneSA,
    homeTwoSA,
    awayOneSA,
    awayTwoSA,
    homeOneGA,
    homeTwoGA,
    awayOneGA,
    awayTwoGA
  ) => {
    const homeOneSv = homeOneSA - homeOneGA;
    const homeTwoSv = homeTwoSA - homeTwoGA;
    const awayOneSv = awayOneSA - awayOneGA;
    const awayTwoSv = awayTwoSA - awayTwoGA;

    const homeOneSvPct = Math.round((homeOneSv / homeOneSA) * 1000) / 1000;
    const homeTwoSvPct = Math.round((homeTwoSv / homeTwoSA) * 1000) / 1000;
    const awayOneSvPct = Math.round((awayOneSv / awayOneSA) * 1000) / 1000;
    const awayTwoSvPct = Math.round((awayTwoSv / awayTwoSA) * 1000) / 1000;

    setHomeOneGA(homeOneGA);
    setHomeTwoGA(homeTwoGA);
    setAwayOneGA(awayOneGA);
    setAwayTwoGA(awayTwoGA);

    setHomeOneSvPct(homeOneSvPct);
    setHomeTwoSvPct(homeTwoSvPct);
    setAwayOneSvPct(awayOneSvPct);
    setAwayTwoSvPct(awayTwoSvPct);

    setHomeOneSv(homeOneSv);
    setHomeTwoSv(homeTwoSv);
    setAwayOneSv(awayOneSv);
    setAwayTwoSv(awayTwoSv);

    setHomeOneShotsAgainst(homeOneSA);
    setHomeTwoShotsAgainst(homeTwoSA);
    setAwayOneShotsAgainst(awayOneSA);
    setAwayTwoShotsAgainst(awayTwoSA);

    // console.log(homeOneSvPct, homeTwoSvPct, awayOneSvPct, awayTwoSvPct);
    // console.log(
    //   `Home1 SV%: ${homeOneSvPct}, Home2 SV%:${homeTwoSvPct}, Away1 SV%:${awayOneSvPct}, Away2 SV%: ${awayTwoSvPct}`
    // );
    // console.log(
    //   `Home1 SV/SH: ${homeOneSv}/${homeOneSA}, Home2 SV: ${homeTwoSv}/${homeTwoSA}, Away1 SV: ${awayOneSv}/${awayOneSA}, Away2 SV: ${awayTwoSv}/${awayTwoSA}`
    // );
  };

  useEffect(() => {
    // if (goalieType === "ADD") {
      setHomeGoalieOneStats({
        goalieStatsID: homeOneStatID,
        playerID: selectedHomeGoalieOne.playerID,
        gameID: currentGameID,
        teamID: homeTeam.teamID,
        saves: homeOneShotsAgainst - homeOneGA,
        savePct: Math.round(((homeOneShotsAgainst - homeOneGA) / homeOneShotsAgainst) * 1000) / 1000,
        shotsAgainst: parseInt(homeOneShotsAgainst),
        goalsAgainst: homeOneGA,
        TOI: parseFloat(homeOneMinutes + "." + homeOneSeconds),
      });
      setAwayGoalieOneStats({
        goalieStatsID: awayOneStatID,
        playerID: selectedAwayGoalieOne.playerID,
        gameID: currentGameID,
        teamID: awayTeam.teamID,
        saves: awayOneShotsAgainst - awayOneGA,
        savePct: Math.round(((awayOneShotsAgainst - awayOneGA) / awayOneShotsAgainst) * 1000) / 1000,
        shotsAgainst: parseInt(awayOneShotsAgainst),
        goalsAgainst: awayOneGA,
        TOI: parseFloat(awayOneMinutes + "." + awayOneSeconds),
      });

      setHomeGoalieTwoStats({
        goalieStatsID: homeTwoStatID,
        playerID: selectedHomeGoalieTwo.playerID,
        gameID: currentGameID,
        teamID: homeTeam.teamID,
        saves: homeTwoShotsAgainst - homeTwoGA,
        savePct: Math.round(((homeTwoShotsAgainst - homeTwoGA) / homeTwoShotsAgainst) * 1000) / 1000,
        shotsAgainst: parseInt(homeTwoShotsAgainst),
        goalsAgainst: homeTwoGA,
        TOI: parseFloat(homeTwoMinutes + "." + homeTwoSeconds),
      });
      setAwayGoalieTwoStats({
        goalieStatsID: awayTwoStatID,
        playerID: selectedAwayGoalieTwo.playerID,
        gameID: currentGameID,
        teamID: awayTeam.teamID,
        saves: awayTwoShotsAgainst - awayTwoGA,
        savePct: Math.round(((awayTwoShotsAgainst - awayTwoGA) / awayTwoShotsAgainst) * 1000) / 1000,
        shotsAgainst: parseInt(awayTwoShotsAgainst),
        goalsAgainst: awayTwoGA,
        TOI: parseFloat(awayTwoMinutes + "." + awayTwoSeconds),
      });
  }, [
    newGoalieStatID,
    selectedHomeGoalieOne,
    selectedHomeGoalieTwo,
    selectedAwayGoalieOne,
    selectedAwayGoalieTwo,
    currentGameID,
    homeSaves,
    homeSavePct,
    awaySaves,
    awaySavePct,
    homeOneMinutes,
    homeOneSeconds,
    awayOneMinutes,
    awayOneSeconds,
    homeTwoMinutes,
    homeTwoSeconds,
    awayTwoMinutes,
    awayTwoSeconds,
    gameScore,
    homeOneShotsAgainst,
    homeTwoShotsAgainst,
    awayOneShotsAgainst,
    awayTwoShotsAgainst,
    awayShots,
    homeShots,
    goalieType
  ]);

  // useEffect(() => {

  // }, [homeGoalieOneStats, homeGoalieTwoStats, awayGoalieOneStats, awayGoalieTwoStats])

  const getGoalies = async (homeID, awayID) => {
    let endPoints = [
      "http://localhost:9200/playerByTeam/" + homeID + "/" + "Goalie",
      "http://localhost:9200/playerByTeam/" + awayID + "/" + "Goalie",
    ];
    await Promise.all(endPoints.map((endPoint) => axios.get(endPoint)))
      .then(
        axios.spread(({ data: homeGoalies }, { data: awayGoalies }) => {
          setHomeGoalies(homeGoalies);
          setAwayGoalies(awayGoalies);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const goalieStatSubmit = async (e) => {
    e.preventDefault();
    if (
      homeGoalieTwoStats.playerID === undefined &&
      awayGoalieTwoStats.playerID === undefined &&
      homeGoalieTwoStats.TOI === 0 &&
      awayGoalieTwoStats.TOI === 0
    ) {
      console.log("NO GOALIE TWO");
      console.log(
        `Home One: ${homeGoalieOneStats.TOI}, Away One: ${awayGoalieOneStats.TOI}`
      );
      await axios
        .all([
          axios.post("http://localhost:9200/goalieStat", homeGoalieOneStats),
          axios.post("http://localhost:9200/goalieStat", awayGoalieOneStats),
        ])
        .then(() => {
          setGoalieSubmit(true);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setGoalieSubmit(false);
        });
    } else if (
      homeGoalieTwoStats.playerID !== undefined &&
      awayGoalieTwoStats.playerID === undefined
    ) {
      console.log("HOME GOALIE TWO");
      console.log(
        `Home One: ${homeGoalieOneStats.TOI}, Away One: ${awayGoalieOneStats.TOI}, Home Two: ${homeGoalieTwoStats.TOI}`
      );
      await axios
        .all([
          axios.post("http://localhost:9200/goalieStat", homeGoalieOneStats),
          axios.post("http://localhost:9200/goalieStat", awayGoalieOneStats),
          axios.post("http://localhost:9200/goalieStat", homeGoalieTwoStats),
        ])
        .then(() => {
          setGoalieSubmit(true);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setGoalieSubmit(false);
        });
    } else if (
      awayGoalieTwoStats.playerID !== undefined &&
      homeGoalieTwoStats.playerID === undefined
    ) {
      console.log("AWAY GOALIE TWO");
      console.log(
        `Home One: ${homeGoalieOneStats.TOI}, Away One: ${awayGoalieOneStats.TOI}, Away Two: ${awayGoalieTwoStats.TOI}`
      );
      await axios
        .all([
          axios.post("http://localhost:9200/goalieStat", homeGoalieOneStats),
          axios.post("http://localhost:9200/goalieStat", awayGoalieOneStats),
          axios.post("http://localhost:9200/goalieStat", awayGoalieTwoStats),
        ])
        .then(() => {
          setGoalieSubmit(true);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setGoalieSubmit(false);
        });
    } else {
      console.log("ALL GOALIES");
      console.log(
        `Home One: ${homeGoalieOneStats.TOI}, Home Two: ${homeGoalieTwoStats.TOI}, Away One: ${awayGoalieOneStats.TOI}, Away Two: ${awayGoalieTwoStats.TOI}`
      );
      await axios
        .all([
          axios.post("http://localhost:9200/goalieStat", homeGoalieOneStats),
          axios.post("http://localhost:9200/goalieStat", awayGoalieOneStats),
          axios.post("http://localhost:9200/goalieStat", homeGoalieTwoStats),
          axios.post("http://localhost:9200/goalieStat", homeGoalieTwoStats),
        ])
        .then(() => {
          setGoalieSubmit(true);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setGoalieSubmit(false);
        });
    }

    // await axios
    //   .all([
    //     axios.post("http://localhost:9200/goalieStat", homeGoalieOneStats),
    //     axios.post("http://localhost:9200/goalieStat", awayGoalieOneStats),
    //   ])
    //   .then(() => {
    //     setGoalieSubmit(true);
    //   })
    //   .catch((err) => console.log(err));

    // setGoalieSubmit(false);
    handleClose();
  };

  const updateStatSubmit = async (e) => {
    e.preventDefault();
    if (
      homeGoalieTwoStats.playerID === undefined &&
      awayGoalieTwoStats.playerID === undefined &&
      homeGoalieTwoStats.TOI === 0 &&
      awayGoalieTwoStats.TOI === 0
    ) {
      console.log("NO GOALIE TWO");
      console.log(
        `Home One: ${homeGoalieOneStats.TOI}, Away One: ${awayGoalieOneStats.TOI}`
      );
      await axios
        .all([
          axios.post("http://localhost:9200/goalieStat", homeGoalieOneStats),
          axios.post("http://localhost:9200/goalieStat", awayGoalieOneStats),
        ])
        .then(() => {
          setGoalieSubmit(true);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setGoalieSubmit(false);
        });
    } else if (
      homeGoalieTwoStats.playerID !== undefined &&
      awayGoalieTwoStats.playerID === undefined
    ) {
      console.log("HOME GOALIE TWO");
      console.log(
        `Home One: ${homeGoalieOneStats.TOI}, Away One: ${awayGoalieOneStats.TOI}, Home Two: ${homeGoalieTwoStats.TOI}`
      );
      await axios
        .all([
          axios.post("http://localhost:9200/goalieStat", homeGoalieOneStats),
          axios.post("http://localhost:9200/goalieStat", awayGoalieOneStats),
          axios.post("http://localhost:9200/goalieStat", homeGoalieTwoStats),
        ])
        .then(() => {
          setGoalieSubmit(true);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setGoalieSubmit(false);
        });
    } else if (
      awayGoalieTwoStats.playerID !== undefined &&
      homeGoalieTwoStats.playerID === undefined
    ) {
      console.log("AWAY GOALIE TWO");
      console.log(
        `Home One: ${homeGoalieOneStats.TOI}, Away One: ${awayGoalieOneStats.TOI}, Away Two: ${awayGoalieTwoStats.TOI}`
      );
      await axios
        .all([
          axios.post("http://localhost:9200/goalieStat", homeGoalieOneStats),
          axios.post("http://localhost:9200/goalieStat", awayGoalieOneStats),
          axios.post("http://localhost:9200/goalieStat", awayGoalieTwoStats),
        ])
        .then(() => {
          setGoalieSubmit(true);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setGoalieSubmit(false);
        });
    } else {
      console.log("ALL GOALIES");
      console.log(
        `Home One: ${homeGoalieOneStats.TOI}, Home Two: ${homeGoalieTwoStats.TOI}, Away One: ${awayGoalieOneStats.TOI}, Away Two: ${awayGoalieTwoStats.TOI}`
      );
      await axios
        .all([
          axios.post("http://localhost:9200/goalieStat", homeGoalieOneStats),
          axios.post("http://localhost:9200/goalieStat", awayGoalieOneStats),
          axios.post("http://localhost:9200/goalieStat", homeGoalieTwoStats),
          axios.post("http://localhost:9200/goalieStat", homeGoalieTwoStats),
        ])
        .then(() => {
          setGoalieSubmit(true);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setGoalieSubmit(false);
        });
    }

    // await axios
    //   .all([
    //     axios.post("http://localhost:9200/goalieStat", homeGoalieOneStats),
    //     axios.post("http://localhost:9200/goalieStat", awayGoalieOneStats),
    //   ])
    //   .then(() => {
    //     setGoalieSubmit(true);
    //   })
    //   .catch((err) => console.log(err));

    // setGoalieSubmit(false);
    handleClose();
  };

  const handleClose = () => {
    setOpenGoalieModal(false);
    setGoalieSubmit(false);
    setHomeOneMinutes(45);
    setHomeOneSeconds("00");
    setHomeTwoMinutes(0);
    setHomeTwoSeconds("00");
    setAwayOneMinutes(45);
    setAwayOneSeconds("00");
    setAwayTwoMinutes(0);
    setAwayTwoSeconds("00");
    setSelectedHomeGoalieOne({ playerID: undefined });
    setSelectedHomeGoalieTwo({ playerID: undefined });
    setSelectedAwayGoalieOne({ playerID: undefined });
    setSelectedAwayGoalieTwo({ playerID: undefined });
    setHomeGoalieOneStats({
      goalieStatsID: homeOneStatID,
      playerID: selectedHomeGoalieOne.playerID,
      gameID: currentGameID,
      saves: 0,
      savePct: 0,
      shotsAgainst: 0,
      goalsAgainst: homeOneGoals,
      TOI: 0,
    });
    setAwayGoalieOneStats({
      goalieStatsID: awayOneStatID,
      playerID: selectedAwayGoalieOne.playerID,
      gameID: currentGameID,
      saves: 0,
      savePct: 0,
      shotsAgainst: 0,
      goalsAgainst: 0,
      TOI: 0,
    });
    setHomeGoalieTwoStats({
      goalieStatsID: homeTwoStatID,
      playerID: undefined,
      gameID: currentGameID,
      saves: 0,
      savePct: 0,
      shotsAgainst: 0,
      goalsAgainst: 0,
      TOI: 0,
    });
    setAwayGoalieTwoStats({
      goalieStatsID: awayTwoStatID,
      playerID: undefined,
      gameID: currentGameID,
      saves: 0,
      savePct: 0,
      shotsAgainst: 0,
      goalsAgainst: 0,
      TOI: 0,
    });
  };

  const handleAddHomeGoalie = (e) => {
    e.preventDefault();
    console.log(addHomeGoalie.current);
    setAddHomeToggle(true);
    setTwoHomeGoalies(true);
  };
  const handleMinusHomeGoalie = (e) => {
    e.preventDefault();
    console.log(addHomeGoalie.current);
    setAddHomeToggle(false);
    setTwoHomeGoalies(false);
    // setHomeTOITwo(0);
  };

  const handleAddAwayGoalie = (e) => {
    e.preventDefault();
    console.log(addHomeGoalie.current);
    setAddAwayToggle(true);
    setTwoAwayGoalies(true);
  };
  const handleMinusAwayGoalie = (e) => {
    e.preventDefault();
    console.log(addHomeGoalie.current);
    setAddAwayToggle(false);
    setTwoAwayGoalies(false);
  };

  useEffect(() => {
    console.log(homeGoalieOneStats);
    console.log(awayGoalieOneStats);
    console.log(homeGoalieTwoStats);
    console.log(awayGoalieTwoStats);

    let homeGoalieStats = [];
    let awayGoaliesStats = [];
    homeGoalieStats.push(homeGoalieOneStats);
    homeGoalieStats.push(homeGoalieTwoStats);
    awayGoaliesStats.push(awayGoalieOneStats);
    awayGoaliesStats.push(awayGoalieTwoStats);
    setHomeGoalieStats(homeGoalieStats);
    setAwayGoalieStats(awayGoaliesStats);
  }, [
    homeGoalieOneStats,
    awayGoalieOneStats,
    homeGoalieTwoStats,
    awayGoalieTwoStats,
  ]);

  useEffect(() => {
    if (goalieType === "ADD") {
      setSelectedHomeGoalieTwo({ playerID: undefined });
      setSelectedAwayGoalieTwo({ playerID: undefined });
      setHomeOneMinutes(45);
      setHomeOneSeconds(0);
      setHomeTwoMinutes(0);
      setHomeTwoSeconds(0);
      setHomeOneShotsAgainst(awayShots);
    }
  }, [twoHomeGoalies, addHomeToggle]);

  useEffect(() => {
    setSelectedAwayGoalieTwo({ playerID: undefined });
    setAwayOneMinutes(45);
    setAwayOneSeconds(0);
    setAwayTwoMinutes(0);
    setAwayTwoSeconds(0);
    setAwayOneShotsAgainst(homeShots);
  }, [twoAwayGoalies, addAwayToggle]);

  useEffect(() => {
    // console.log(selectedHomeGoalieOne);
    // console.log(selectedAwayGoalieOne);
    // console.log(selectedHomeGoalieTwo);
    // console.log(selectedAwayGoalieTwo);
  }, [
    selectedHomeGoalieOne,
    selectedAwayGoalieOne,
    selectedHomeGoalieTwo,
    selectedAwayGoalieTwo,
  ]);

  useEffect(() => {
    setGoalieTwoTOI(parseInt(homeOneMinutes), parseInt(homeOneSeconds), "HOME");
    setGoalieTwoTOI(parseInt(awayOneMinutes), parseInt(awayOneSeconds), "AWAY");
  }, [homeOneMinutes, homeOneSeconds, awayOneMinutes, awayOneSeconds]);

  useEffect(() => {
    setGoalieTwoSA(awayShots, homeOneShotsAgainst, "HOME");
    setGoalieTwoSA(homeShots, awayOneShotsAgainst, "AWAY");
  }, [homeOneShotsAgainst, awayOneShotsAgainst]);

  const setGoalieTwoTOI = (minutes, seconds, type) => {
    let totalSeconds = minutes * 60 + seconds;
    const gameTimeSec = 45 * 60;
    const remanderTime = gameTimeSec - totalSeconds;
    let newMinutes = Math.floor(remanderTime / 60);
    let extraSeconds = remanderTime % 60;
    newMinutes = newMinutes < 10 ? "0" + newMinutes : newMinutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
    // let newTime = newMinutes + ":" + extraSeconds;

    // console.log(newTime);

    if (type === "HOME") {
      // setHomeTwoDefTOI({minutes: newMinutes, seconds:extraSeconds})
      setHomeTwoMinutes(newMinutes);
      setHomeTwoSeconds(extraSeconds);
    } else if (type === "AWAY") {
      // setAwayTwoDefTOI({minutes: newMinutes, seconds:extraSeconds})
      setAwayTwoMinutes(newMinutes);
      setAwayTwoSeconds(extraSeconds);
    }
  };

  const setGoalieTwoSA = (total, oneSA, type) => {
    let twoSA = total - oneSA;
    if (type === "HOME") {
      setHomeTwoDefShots(twoSA);
      setHomeTwoShotsAgainst(twoSA);
    } else if (type === "AWAY") {
      setAwayTwoShotsAgainst(twoSA);
    }
  };

  // const handleGoalieSubmit = async () => {
  //   handleAddHomeGoalie()
  //   handleAddAwayGoalie()
  //   setGoalieSubmit(false);
  //   handleClose();
  // }

  // const handleHomeGoalieSubmit = async () => {
  //   await axios.post("http://localhost:9200/goalieStats", homeGoalieOneStats);
  //   console.log("Event Added");
  //   setGoalieSubmit(true).catch((err) => console.log(err));
  // };
  // const handleAwayGoalieSubmit = async () => {
  //   await axios.post("http://localhost:9200/goalieStats", awayGoalieOneStats);
  //   console.log("Event Added");
  //   setGoalieSubmit(true).catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   if(selectedHomeGoalieTwo.playerID === undefined) {
  //     setTwoGoalies(false)
  //   } else if(selectedHomeGoalieTwo.playerID !== undefined) {
  //     setTwoGoalies(true)
  //   }
  // }, [selected])

  if (!open) {
    return null;
  }

  return (
    <>
      {goalieType === "UPDATE" ? (
        <div className="goalie_overlay">
          <div className="goalie_container">
            <div className="goalie_content">
              <div className="goalie_modal_title">
                <h2 className="modal_title">Update Goalie Stats</h2>
              </div>
              <div className="goalie_form_container">
                <form action="" className="home_goalie_form">
                  <div className="goalie_title">
                    <h2 className="modal_title">{homeTeam.schoolName}</h2>
                    <div className="modal_logo_container">
                      <img className="title_logo" src={homeTeam.logo} alt="" />
                      {/* <small>{homeTeam.schoolName}</small> */}
                    </div>
                  </div>
                  <section className="goalie_section">
                    <h4>Goalie 1</h4>
                    <div className="goalie_field">
                      {/* <label htmlFor="home_shots">Shots</label> */}
                      <PlayerDropdown
                        data={homeGoalies}
                        currentPlayer={selectedHomeGoalieOne}
                        type="Update Home Goalies One"
                        setSelectedHomeGoalie={setSelectedHomeGoalieOne}
                      />
                    </div>

                    {twoHomeGoalies ? (
                      <>
                        <div className="goalie_field">
                          <label htmlFor="home_TOI">TOI</label>
                          {/* <input
                          id="home_TOI"
                          type="number"
                          max={45}
                          min={0}
                          onChange={(e) => setHomeTOIOne(e.target.value)}
                        /> */}
                          <div id="time-input">
                            <input
                              type="text"
                              id="hours"
                              max="2"
                              dir="rtl"
                              value={homeOneMinutes}
                              onChange={(e) =>
                                setHomeOneMinutes(e.target.value)
                              }
                            />
                            <div id="colon">:</div>
                            <input
                              type="text"
                              id="minutes"
                              max="2"
                              value={homeOneSeconds}
                              onChange={(e) =>
                                setHomeOneSeconds(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="goalie_field">
                          <label htmlFor="home_shotsAgainst">
                            Shots Against
                          </label>
                          <input
                            id="home_shotsAgainst"
                            type="number"
                            value={homeOneShotsAgainst}
                            max={awayShots}
                            min={0}
                            onChange={(e) =>
                              setHomeOneShotsAgainst(e.target.value)
                            }
                          />
                        </div>
                      </>
                    ) : null}
                    <div className="goalie_item_controls">
                      {!addHomeToggle ? (
                        <button
                          ref={addHomeGoalie}
                          className="add_goalie_two_btn"
                          onClick={handleAddHomeGoalie}
                        >
                          <FaPlus />
                        </button>
                      ) : (
                        <button
                          ref={addHomeGoalie}
                          className="add_goalie_two_btn"
                          onClick={handleMinusHomeGoalie}
                        >
                          <FaMinus />
                        </button>
                      )}
                    </div>
                  </section>
                  {twoHomeGoalies ? (
                    <section className="goalie_section">
                      <h4>Goalie 2</h4>
                      <div className="goalie_field">
                        {/* <label htmlFor="home_shots">Shots</label> */}
                        <PlayerDropdown
                          data={homeGoalies}
                          currentPlayer={selectedHomeGoalieTwo}
                          type="Update Home Goalies Two"
                          setSelectedHomeGoalie={setSelectedHomeGoalieTwo}
                          setSelected={setSelected}
                          selected={selected}
                        />
                      </div>
                      <div className="goalie_field">
                        <label htmlFor="home_TOI">TOI</label>
                        <div id="time-input">
                          <input
                            type="text"
                            id="hours"
                            max="2"
                            dir="rtl"
                            value={homeTwoMinutes}
                            onChange={(e) => setHomeTwoMinutes(e.target.value)}
                          />
                          <div id="colon">:</div>
                          <input
                            type="text"
                            id="minutes"
                            max="2"
                            value={homeTwoSeconds}
                            onChange={(e) => setHomeTwoSeconds(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="goalie_field">
                        <label htmlFor="home_shotsAgainst">Shots Against</label>
                        <input
                          id="home_shotsAgainst"
                          type="number"
                          value={homeTwoShotsAgainst}
                          onChange={(e) =>
                            setHomeTwoShotsAgainst(e.target.value)
                          }
                        />
                      </div>
                    </section>
                  ) : null}
                </form>
                <form action="" className="away_goalie_form">
                  <div className="goalie_title">
                    <h2 className="modal_title">{awayTeam.schoolName}</h2>
                    <div className="modal_logo_container">
                      <img className="title_logo" src={awayTeam.logo} alt="" />
                      {/* <small>{awayTeam.schoolName}</small> */}
                    </div>
                  </div>
                  <section className="goalie_section">
                    <h4>Goalie 1</h4>
                    <div className="goalie_field">
                      {/* <label htmlFor="away_shots">Shots</label> */}
                      <PlayerDropdown
                        data={awayGoalies}
                        currentPlayer={selectedAwayGoalieOne}
                        type="Update Away Goalies One"
                        setSelectedAwayGoalie={setSelectedAwayGoalieOne}
                      />
                    </div>
                    {twoAwayGoalies ? (
                      <>
                        <div className="goalie_field">
                          <label htmlFor="away_TOI">TOI</label>
                          <div id="time-input">
                            <input
                              type="text"
                              id="hours"
                              max="2"
                              dir="rtl"
                              value={awayOneMinutes}
                              onChange={(e) =>
                                setAwayOneMinutes(e.target.value)
                              }
                            />
                            <div id="colon">:</div>
                            <input
                              type="text"
                              id="minutes"
                              max="2"
                              value={awayOneSeconds}
                              onChange={(e) =>
                                setAwayOneSeconds(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="goalie_field">
                          <label htmlFor="home_shotsAgainst">
                            Shots Against
                          </label>
                          <input
                            id="home_shotsAgainst"
                            type="number"
                            max={homeShots}
                            min={0}
                            value={awayOneShotsAgainst}
                            onChange={(e) =>
                              setAwayOneShotsAgainst(e.target.value)
                            }
                          />
                        </div>
                      </>
                    ) : null}
                    <div className="goalie_item_controls">
                      {!addAwayToggle ? (
                        <button
                          ref={addHomeGoalie}
                          className="add_goalie_two_btn"
                          onClick={handleAddAwayGoalie}
                        >
                          <FaPlus />
                        </button>
                      ) : (
                        <button
                          ref={addHomeGoalie}
                          className="add_goalie_two_btn"
                          onClick={handleMinusAwayGoalie}
                        >
                          <FaMinus />
                        </button>
                      )}
                    </div>
                  </section>
                  {twoAwayGoalies ? (
                    <section className="goalie_section">
                      <h4>Goalie 2</h4>
                      <div className="goalie_field">
                        {/* <label htmlFor="away_shots">Shots</label> */}
                        <PlayerDropdown
                          data={awayGoalies}
                          currentPlayer={selectedAwayGoalieTwo}
                          type="Update Away Goalies Two"
                          setSelectedAwayGoalie={setSelectedAwayGoalieTwo}
                        />
                      </div>
                      {twoAwayGoalies ? (
                        <>
                          <div className="goalie_field">
                            <label htmlFor="away_TOI">TOI</label>
                            <div id="time-input">
                              <input
                                type="text"
                                id="hours"
                                max="2"
                                dir="rtl"
                                value={awayTwoMinutes}
                                onChange={(e) =>
                                  setAwayTwoMinutes(e.target.value)
                                }
                              />
                              <div id="colon">:</div>
                              <input
                                type="text"
                                id="minutes"
                                max="2"
                                value={awayTwoSeconds}
                                onChange={(e) =>
                                  setAwayTwoSeconds(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="goalie_field">
                            <label htmlFor="away_shotsAgainst">
                              Shots Against
                            </label>
                            <input
                              id="away_shotsAgainst"
                              type="number"
                              value={awayTwoShotsAgainst}
                              onChange={(e) =>
                                setAwayTwoShotsAgainst(e.target.value)
                              }
                            />
                          </div>
                        </>
                      ) : null}
                    </section>
                  ) : null}
                </form>
              </div>
              <div className="goalie_controls">
                <button className="submit_btn btn" onClick={updateStatSubmit}>
                  Submit
                </button>
                <button className="cancel_btn btn" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="goalie_overlay">
          <div className="goalie_container">
            <div className="goalie_content">
              <div className="goalie_modal_title">
                <h2 className="modal_title">Add Goalie Stats</h2>
              </div>
              <div className="goalie_form_container">
                <form action="" className="home_goalie_form">
                  <div className="goalie_title">
                    <h2 className="modal_title">{homeTeam.schoolName}</h2>
                    <div className="modal_logo_container">
                      <img className="title_logo" src={homeTeam.logo} alt="" />
                      {/* <small>{homeTeam.schoolName}</small> */}
                    </div>
                  </div>
                  <section className="goalie_section">
                    <h4>Goalie 1</h4>
                    <div className="goalie_field">
                      {/* <label htmlFor="home_shots">Shots</label> */}
                      <PlayerDropdown
                        data={homeGoalies}
                        type="Home Goalies"
                        setSelectedHomeGoalie={setSelectedHomeGoalieOne}
                      />
                    </div>

                    {twoHomeGoalies ? (
                      <>
                        <div className="goalie_field">
                          <label htmlFor="home_TOI">TOI</label>
                          {/* <input
                      id="home_TOI"
                      type="number"
                      max={45}
                      min={0}
                      onChange={(e) => setHomeTOIOne(e.target.value)}
                    /> */}
                          <div id="time-input">
                            <input
                              type="text"
                              id="hours"
                              max="2"
                              dir="rtl"
                              value={homeOneMinutes}
                              onChange={(e) =>
                                setHomeOneMinutes(e.target.value)
                              }
                            />
                            <div id="colon">:</div>
                            <input
                              type="text"
                              id="minutes"
                              max="2"
                              value={homeOneSeconds}
                              onChange={(e) =>
                                setHomeOneSeconds(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="goalie_field">
                          <label htmlFor="home_shotsAgainst">
                            Shots Against
                          </label>
                          <input
                            id="home_shotsAgainst"
                            type="number"
                            max={awayShots}
                            min={0}
                            value={homeOneShotsAgainst}
                            onChange={(e) =>
                              setHomeOneShotsAgainst(e.target.value)
                            }
                          />
                        </div>
                      </>
                    ) : null}
                    <div className="goalie_item_controls">
                      {!addHomeToggle ? (
                        <button
                          ref={addHomeGoalie}
                          className="add_goalie_two_btn"
                          onClick={handleAddHomeGoalie}
                        >
                          <FaPlus />
                        </button>
                      ) : (
                        <button
                          ref={addHomeGoalie}
                          className="add_goalie_two_btn"
                          onClick={handleMinusHomeGoalie}
                        >
                          <FaMinus />
                        </button>
                      )}
                    </div>
                  </section>
                  {twoHomeGoalies ? (
                    <section className="goalie_section">
                      <h4>Goalie 2</h4>
                      <div className="goalie_field">
                        {/* <label htmlFor="home_shots">Shots</label> */}
                        <PlayerDropdown
                          data={homeGoalies}
                          type="Home Goalies"
                          setSelectedHomeGoalie={setSelectedHomeGoalieTwo}
                          setSelected={setSelected}
                          selected={selected}
                        />
                      </div>
                      <div className="goalie_field">
                        <label htmlFor="home_TOI">TOI</label>
                        <div id="time-input">
                          <input
                            type="text"
                            id="hours"
                            max="2"
                            dir="rtl"
                            value={homeTwoMinutes}
                            onChange={(e) => setHomeTwoMinutes(e.target.value)}
                          />
                          <div id="colon">:</div>
                          <input
                            type="text"
                            id="minutes"
                            max="2"
                            value={homeTwoSeconds}
                            onChange={(e) => setHomeTwoSeconds(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="goalie_field">
                        <label htmlFor="home_shotsAgainst">Shots Against</label>
                        <input
                          id="home_shotsAgainst"
                          type="number"
                          value={homeTwoShotsAgainst}
                          onChange={(e) =>
                            setHomeTwoShotsAgainst(e.target.value)
                          }
                        />
                      </div>
                    </section>
                  ) : null}
                </form>
                <form action="" className="away_goalie_form">
                  <div className="goalie_title">
                    <h2 className="modal_title">{awayTeam.schoolName}</h2>
                    <div className="modal_logo_container">
                      <img className="title_logo" src={awayTeam.logo} alt="" />
                      {/* <small>{awayTeam.schoolName}</small> */}
                    </div>
                  </div>
                  <section className="goalie_section">
                    <h4>Goalie 1</h4>
                    <div className="goalie_field">
                      {/* <label htmlFor="away_shots">Shots</label> */}
                      <PlayerDropdown
                        data={awayGoalies}
                        type="Away Goalies"
                        setSelectedAwayGoalie={setSelectedAwayGoalieOne}
                      />
                    </div>
                    {twoAwayGoalies ? (
                      <>
                        <div className="goalie_field">
                          <label htmlFor="away_TOI">TOI</label>
                          <div id="time-input">
                            <input
                              type="text"
                              id="hours"
                              max="2"
                              dir="rtl"
                              value={awayOneMinutes}
                              onChange={(e) =>
                                setAwayOneMinutes(e.target.value)
                              }
                            />
                            <div id="colon">:</div>
                            <input
                              type="text"
                              id="minutes"
                              max="2"
                              value={awayTwoSeconds}
                              onChange={(e) =>
                                setAwayOneSeconds(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="goalie_field">
                          <label htmlFor="home_shotsAgainst">
                            Shots Against
                          </label>
                          <input
                            id="home_shotsAgainst"
                            type="number"
                            max={homeShots}
                            min={0}
                            value={awayOneShotsAgainst}
                            onChange={(e) =>
                              setAwayOneShotsAgainst(e.target.value)
                            }
                          />
                        </div>
                      </>
                    ) : null}
                    <div className="goalie_item_controls">
                      {!addAwayToggle ? (
                        <button
                          ref={addHomeGoalie}
                          className="add_goalie_two_btn"
                          onClick={handleAddAwayGoalie}
                        >
                          <FaPlus />
                        </button>
                      ) : (
                        <button
                          ref={addHomeGoalie}
                          className="add_goalie_two_btn"
                          onClick={handleMinusAwayGoalie}
                        >
                          <FaMinus />
                        </button>
                      )}
                    </div>
                  </section>
                  {twoAwayGoalies ? (
                    <section className="goalie_section">
                      <h4>Goalie 2</h4>
                      <div className="goalie_field">
                        {/* <label htmlFor="away_shots">Shots</label> */}
                        <PlayerDropdown
                          data={awayGoalies}
                          type="Away Goalies"
                          setSelectedAwayGoalie={setSelectedAwayGoalieTwo}
                        />
                      </div>
                      {twoAwayGoalies ? (
                        <>
                          <div className="goalie_field">
                            <label htmlFor="away_TOI">TOI</label>
                            <div id="time-input">
                              <input
                                type="text"
                                id="hours"
                                max="2"
                                dir="rtl"
                                value={awayTwoMinutes}
                                onChange={(e) =>
                                  setAwayTwoMinutes(e.target.value)
                                }
                              />
                              <div id="colon">:</div>
                              <input
                                type="text"
                                id="minutes"
                                max="2"
                                value={awayTwoSeconds}
                                onChange={(e) =>
                                  setAwayTwoSeconds(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="goalie_field">
                            <label htmlFor="away_shotsAgainst">
                              Shots Against
                            </label>
                            <input
                              id="away_shotsAgainst"
                              type="number"
                              value={awayTwoShotsAgainst}
                              onChange={(e) =>
                                setAwayTwoShotsAgainst(e.target.value)
                              }
                            />
                          </div>
                        </>
                      ) : null}
                    </section>
                  ) : null}
                </form>
              </div>
              <div className="goalie_controls">
                <button className="submit_btn btn" onClick={goalieStatSubmit}>
                  Submit
                </button>
                <button className="cancel_btn btn" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GoalieStatsModal;
