import React from "react";
import NavBar from "../components/NavBar";
import SponcerBar from "../components/Sponcer/SponcerBar";
import Footer from "../components/Footer";
import Info from "../components/Info/Info";

function LeagueInfo() {
  return (
    <>
      <SponcerBar />
      <NavBar />
      <Info />
      <Footer />
    </>
  );
}

export default LeagueInfo;
