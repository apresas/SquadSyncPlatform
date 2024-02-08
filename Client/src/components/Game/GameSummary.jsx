import React from "react";
import TitleBar from "../TitleBar";
import GameHeader from "./GameHeader";
import BoxScore from "./BoxScore";
import LineScore from "./LineScore";
import GameStats from "./GameStats";
import SeasonSeries from "./SeasonSeries";
import "./gameSummary.css";

function GameSummary() {
  return (
    <div className="gameSummary_container">
      <div className="gameSummary_content_container">
        <TitleBar title="Game Summary" subtitle="2023-2024" />
        <div className="gameSummary_app_container">
        <h2>Date</h2>
          <GameHeader />
          <div className="gameSummary_grid">
            <section className="gameSummary_main_content">
              <BoxScore />
            </section>
            <section className="gameSummary_side_content">
              <LineScore />
              <GameStats />
              <SeasonSeries />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameSummary;
