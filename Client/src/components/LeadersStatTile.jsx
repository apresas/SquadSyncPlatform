import React, { useState, useEffect, useRef } from "react";
import LeaderStatsItem from "./LeaderStatsItem";
import { FiChevronsDown } from "react-icons/fi";

function LeadersStatTile({ stats, type, division }) {
  const [currentStats, setCurrentStats] = useState({});
  const [testData, setTestData] = useState([{}]);
  const [typeTitle, setTypeTitle] = useState("");
  const [typeAttribute, setTypeAttribute] = useState("");
  const [total, setTotal] = useState();
  const selectedStat = useRef();
  const [statsArray, setStatsArray] = useState([])
  const [selectedClass, setSelectedClass] = useState('select_item')
  // console.log(total);

  // console.log(statsArray)

  const setSV = (stat) => {
    setTotal(Number.parseFloat(stat).toFixed(3))
  }

  const setGAA = (stat) => {
    setTotal(Number.parseFloat(stat).toFixed(2))
  }

  const onStatsHover = (stats, type) => {
    // setSelectedClass("select_item_active")
    if (type === "POINTS") {
      setTotal(stats.points);
    }
    if (type === "GOALS") {
      setTotal(stats.goals);
    }
    if (type === "GAA") {
      setGAA(stats.GAA)
    }
    if (type === "SV") {
      setSV(stats.SV)
    }
    setCurrentStats(stats);
  };

  useEffect(() => {
    if (type === "POINTS") {
      setTypeTitle("Points");
      setTypeAttribute("points");
    } else if (type === "GOALS") {
      setTypeTitle("Goals");
      setTypeAttribute("goals");
    } else if (type === "GAA") {
      setTypeTitle(type);
      setTypeAttribute("GAA");
    } else if (type === "SV") {
      setTypeTitle("SV%");
      setTypeAttribute("SV");
    }
  }, [type]);

  useEffect(() => {
    let filterData = [];
    if (division === "WHITE") {
      {
        stats
          .filter((stats) => stats.division === "White")
          .map((stat) => {
            filterData.push(stat);
          });
        setTestData(filterData);
      }
    }
    if (division === "RED") {
      {
        stats
          .filter((stats) => stats.division === "Red")
          .map((stat) => {
            filterData.push(stat);
          });
        setTestData(filterData);
      }
    }
    if (division === "BLUE") {
      {
        stats
          .filter((stats) => stats.division === "Blue")
          .map((stat) => {
            filterData.push(stat);
          });
        setTestData(filterData);
      }
    }
  }, [division]);

  useEffect(() => {
    if (type === "POINTS") {
      {
        testData
          .sort((a, b) => (a.points > b.points ? -1 : 1))
          .filter((stat, index) => index === 0)
          .map((stat) => {
            setTotal(stat.points);
            setCurrentStats(stat);
          });
      }
    }
    if (type === "GOALS") {
      {
        testData
          .sort((a, b) => (a.goals > b.goals ? -1 : 1))
          .filter((stat, index) => index === 0)
          .map((stat) => {
            setTotal(stat.goals);
            setCurrentStats(stat);
          });
      }
    }
    if (type === "GAA") {
      {
        testData
          .sort((a, b) => (Number.parseFloat(a.GAA).toFixed(2) > Number.parseFloat(b.GAA).toFixed(2) ? 1 : -1))
          .filter((stat, index) => index === 0)
          .map((stat) => {
            setGAA(stat.GAA);
            setCurrentStats(stat);
          });
      }
    }
    if (type === "SV") {
      {
        testData
          .sort((a, b) => (a.SV > b.SV ? -1 : 1))
          .filter((stat, index) => index === 0)
          .map((stat) => {
            setSV(stat.SV);
            setCurrentStats(stat);
          });
      }
    }
  }, [testData, type]);

  return (
    <div className="points_column">
      <div className="points_header">
        <img className="stats_logo" src={currentStats.logo} alt="team logo" />
        <div className="leader_player_info">
          <h4 className="stats_points_title">{typeTitle}</h4>
          <div className="stats_name_title">
            {currentStats.firstName}
          </div>
          <div className="stats_name_title">
            {currentStats.lastName}
          </div>
          {/* <small>Class: {currentStats.class}</small> */}
        </div>
        <div className="columns_total">
          <h2 className="stats_point_total">{total}</h2>
          <small>{type}</small>
        </div>
      </div>
      <div className="leader_stats_points">
        {testData
          .sort((a, b) => (a.typeAttribute > b.typeAttribute ? -1 : 1))
          .map((stats, i) => {
            // statsArray.push(stats)
            return(
            <div
              ref={selectedStat}
              key={i}
              onMouseEnter={() => {
                onStatsHover(stats, type);
              }}
            >
              <LeaderStatsItem
              selected={selectedClass}
                key={i}
                stats={stats}
                index={i}
                type={type}
              />
            </div>
          )}).splice(0,5)}
      </div>
      {/* <div className="stats_button_container">
        <FiChevronsDown />
      </div> */}
    </div>
  );
}

export default LeadersStatTile;
