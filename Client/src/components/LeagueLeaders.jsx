import { useState, useEffect } from "react";
import "./leagueLeaders.css";
import { FiChevronRight } from "react-icons/fi";
import Teams from "../data/teams.json";
import LeaderStats from "../data/playerStats.json";
import TestData from "../data/testData.json";
import GoalieLeadersStats from "../data/goalieStats.json";
import { FiChevronsDown } from "react-icons/fi";
import LeaderStatsItem from "./LeaderStatsItem";
import LeadersStatTile from "./LeadersStatTile";
import { Link } from "react-router-dom"

function LeagueLeaders() {
  return (
    <div className="leagueLeaders_container">
      <div className="leagueLeaders_content_container">
        <h2 className="leagueLeaders_title">
          <a className="leagueLeaders_link" href="">
            2023-24 League Leaders
            <div className="icon_container">
              <FiChevronRight />
            </div>
          </a>
        </h2>
        <h3 className="leagueLeaders_division_title">Red Division</h3>
        <div className="stats_tile">
          <LeadersStatTile stats={LeaderStats} division="RED" type="POINTS" />
          <LeadersStatTile stats={LeaderStats} division="RED" type="GOALS" />
          <LeadersStatTile
            stats={GoalieLeadersStats}
            division="RED"
            type="GAA"
          />
          <LeadersStatTile
            stats={GoalieLeadersStats}
            division="RED"
            type="SV"
          />
        </div>
        <Link
          to="/stats"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <div className="stats_btn_container">
            <div
              className="stats_btn"
              onClick={() => {
                console.log("clicked");
              }}
            >
              <FiChevronsDown style={{ fontSize: "1.5rem" }} />
            </div>
          </div>
        </Link>
        <h3 className="leagueLeaders_division_title">White Division</h3>
        <div className="stats_tile">
          <LeadersStatTile stats={LeaderStats} division="WHITE" type="POINTS" />
          <LeadersStatTile stats={LeaderStats} division="WHITE" type="GOALS" />
          <LeadersStatTile
            stats={GoalieLeadersStats}
            division="WHITE"
            type="GAA"
          />
          <LeadersStatTile
            stats={GoalieLeadersStats}
            division="WHITE"
            type="SV"
          />
        </div>
        <Link
          to="/stats"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <div className="stats_btn_container">
            <div
              className="stats_btn"
              onClick={() => {
                console.log("clicked");
              }}
            >
              <FiChevronsDown style={{ fontSize: "1.5rem" }} />
            </div>
          </div>
        </Link>
        <h3 className="leagueLeaders_division_title">Blue Division</h3>
        <div className="stats_tile">
          <LeadersStatTile stats={LeaderStats} division="BLUE" type="POINTS" />
          <LeadersStatTile stats={LeaderStats} division="BLUE" type="GOALS" />
          <LeadersStatTile
            stats={GoalieLeadersStats}
            division="BLUE"
            type="GAA"
          />
          <LeadersStatTile
            stats={GoalieLeadersStats}
            division="BLUE"
            type="SV"
          />
        </div>
        <Link
          to="/stats"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <div className="stats_btn_container">
            <div
              className="stats_btn"
              onClick={() => {
                console.log("clicked");
              }}
            >
              <FiChevronsDown style={{ fontSize: "1.5rem" }} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default LeagueLeaders;
