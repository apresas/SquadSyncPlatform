import React, { useContext, createContext, useState, useEffect } from "react";
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

  const [selected, setSelected] = useState();
  const [filteredItem, setFilteredItem] = useState([]);
  const [defaultTeam, setDefaultTeam] = useState();

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
    const res = await axios.get("http://localhost:9200/teams");
    setTeamData(res.data);
  };

  const [testPlayers, setTestPlayers] = useState([]);

  const getTestPlayers = async () => {
    const res = await axios.get("http://localhost:9200/players");
    setTestPlayers(res.data);
  };

  const [filteredPlayers, setFilteredPlayers] = useState([]);

  const getFilterTeam = async (teamID) => {
    try {
      const res = await axios.get("http://localhost:9200/players/" + teamID);
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

  useEffect(() => {
    // axios({
    //   method: "GET",
    //   url: "http://localhost:9200/teams",
    // }).then((res) => {
    //   // console.log(res.data);
    //   setTeamData(res.data)
    // });
    getTeamData();
    getTestPlayers();
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
        currentFilterPlayer
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
