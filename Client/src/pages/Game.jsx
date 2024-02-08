import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import GameSummary from "../components/Game/GameSummary";
import SponcerBar from "../components/Sponcer/SponcerBar";

function Game() {
  return (
    <>
      <SponcerBar />
      <NavBar />
      <GameSummary />
      <Footer />
    </>
  );
}

export default Game;
