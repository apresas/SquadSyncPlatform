import { useContext, createContext, useState, useEffect } from "react";
import { format, addDays, subDays, eachDayOfInterval } from "date-fns";
import axios from "axios";

const SiteContext = createContext();

export function useSite() {
  return useContext(SiteContext);
}

export const SiteProvider = ({ children }) => {
  const [currentTeam, setCurrentTeam] = useState({});
  const [rosterTeam, setRosterTeam] = useState();
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [dateList, setDateList] = useState([]);
  const [currentTeamTitle, setCurrentTeamTitle] = useState();
  const [currentGame, setCurrentGame] = useState({});

  const [selected, setSelected] = useState();
  const [filteredItem, setFilteredItem] = useState([]);
  const [defaultTeam, setDefaultTeam] = useState();

  const [filterTeam, setFilterTeam] = useState({});

  const [gameScore, setGameScore] = useState({
    homeScores: 0,
    awayScores: 0
  })

  const getDates = (startDate) => {
    const start = new Date(startDate);
    const end = new Date(addDays(start, 6));
    const range = eachDayOfInterval({ start: start, end: end, steps: 1 });
    const dateRange = range.map((date) => format(date, "yyyy-MM-dd"));
    setDateList(dateRange);
  };

  const nextClick = () => {
    const nextDay = addDays(selected, 7);
    setSelected(nextDay);
    getDates(nextDay);
  };

  const prevClick = () => {
    const prevDay = subDays(selected, 7);
    setSelected(prevDay);
    getDates(prevDay);
  };

  const [teamData, setTeamData] = useState([]);

  const getTeamData = async () => {
    const res = await axios.get("http://localhost:9200/team");
    setTeamData(res.data);
  };
  
  const [teamLoading, setTeamLoading] = useState(false);
  const getCurrentTeam = async (teamID) => {
    setTeamLoading(true)
    await axios.get("http://localhost:9200/team/" + teamID)
    .then((res) => {
      setFilterTeam(res.data)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setTimeout(() => {
        setTeamLoading(false)
      }, 550)
    })
    // setFilterTeam(...res.data);
  }

  const [testPlayers, setTestPlayers] = useState([]);

  const getTestPlayers = async () => {
    const res = await axios.get("http://localhost:9200/players");
    setTestPlayers(res.data);
  };

  const [filteredPlayers, setFilteredPlayers] = useState([]);

  const getFilterTeam = async (teamID) => {
    try {
      const res = await axios.get("http://localhost:9200/playerByTeam/" + teamID);
      setFilteredPlayers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [currentFilterPlayer, setCurrentFilterPlayer] = useState({})
  const getFilteredPlayer = async(playerID) => {
    try {
      const res = await axios.get("http://localhost:9200/players/" + playerID);
      setCurrentFilterPlayer(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const [schedule, setSchedule] = useState([])
  const getSchedule = async () => {
    const res = await axios.get("http://localhost:9200/game")
    setSchedule(res.data);
  }

  const [record, setRecord] = useState({
    home: "0-0-0",
    away: "0-0-0"
  })
  const getRecord = (homeID, awayID) => {
    let homeWins = 0
    let homeLoses = 0
    let homeTies = 0
    let awayWins = 0
    let awayLoses = 0
    let awayTies = 0
    schedule.filter((schedule) => schedule.homeID === homeID || schedule.awayID === homeID).map((schedule) => {
      if (schedule.homeID === homeID) {
        if(schedule.homeScore > schedule.awayScore) {
          homeWins += 1
        } else if(schedule.homeScore === schedule.awayScore && schedule.homeScore !== null && schedule.awayScore !== null) {
          homeTies += 1
        } else if (schedule.homeScore < schedule.awayScore) {
          homeLoses += 1
        }
      }
      if (schedule.awayID === homeID) {
        if(schedule.awayScore > schedule.homeScore) {
          homeWins += 1
        } else if (schedule.awayScore === schedule.homeScore && schedule.homeScore !== null && schedule.awayScore !== null) {
          homeTies += 1
        } else if (schedule.awayScore < schedule.homeScore) {
          homeLoses +=1
        }
      }
    })

    schedule.filter((schedule) => schedule.homeID === awayID || schedule.awayID === awayID).map((schedule) => {
      if (schedule.homeID === awayID) {
        if(schedule.homeScore > schedule.awayScore) {
          awayWins += 1
        } else if(schedule.homeScore === schedule.awayScore && schedule.homeScore !== null && schedule.awayScore !== null) {
          awayTies += 1
        } else if (schedule.homeScore < schedule.awayScore) {
          awayLoses += 1
        }
      }
      if (schedule.awayID === awayID) {
        if(schedule.awayScore > schedule.homeScore) {
          awayWins += 1
        } else if (schedule.awayScore === schedule.homeScore && schedule.homeScore !== null && schedule.awayScore !== null) {
          awayTies += 1
        } else if (schedule.awayScore < schedule.homeScore) {
          awayLoses +=1
        }
      }
    })

    const homeRecord = homeWins + "-" + homeLoses + "-" + homeTies
    const awayRecord = awayWins + "-" + awayLoses + "-" + awayTies
    setRecord({
      home: homeRecord,
      away: awayRecord
    })
  }
  
  const [filterGame, setFilterGame] = useState({})
  const getFilterGame = async (gameID) => {
    const res = await axios.get("http://localhost:9200/schedule/" + gameID)
    setFilterGame(res.data)
  }

  const [gameSubmit, setGameSubmit] = useState(false);
  const [eventSubmit, setEventSubmit] = useState(false);

  const setTest = async() => {
    const test = {
      title: 'test'
    }
    try {
      await axios.post("http://localhost:9200/test", test);
      console.log("Event Added");
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    // axios({
    //   method: "GET",
    //   url: "http://localhost:9200/teams",
    // }).then((res) => {
    //   // console.log(res.data);
    //   setTeamData(res.data)
    // });
    // setTest();
    getTeamData();
    getTestPlayers();
    getSchedule()
  }, []);


  // console.log(defaultTeam)

  // console.log(dateList);
  // console.log(currentTeamTitle)

  return (
    <SiteContext.Provider
      value={{
        currentTeam,
        setCurrentTeam,
        rosterTeam,
        setRosterTeam,
        currentPlayer,
        setCurrentPlayer,
        dateList,
        setDateList,
        getDates,
        currentTeamTitle,
        setCurrentTeamTitle,
        selected,
        setSelected,
        prevClick,
        nextClick,
        setFilteredItem,
        filteredItem,
        defaultTeam,
        setDefaultTeam,
        teamData,
        getTeamData,
        testPlayers,
        getTestPlayers,
        getFilterTeam,
        filteredPlayers,
        getFilteredPlayer,
        currentFilterPlayer,
        schedule,
        gameSubmit,
        setGameSubmit,
        currentGame,
        setCurrentGame,
        eventSubmit, 
        setEventSubmit,
        gameScore, 
        setGameScore,
        getCurrentTeam,
        filterTeam,
        getFilterGame,
        filterGame,
        teamLoading,
        getRecord,
        record
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
