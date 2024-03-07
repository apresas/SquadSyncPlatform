import React from "react";
import NavBar from "../components/NavBar";
import SponcerBar from "../components/Sponcer/SponcerBar";
import Footer from "../components/Footer";
import Info from "../components/Info/Info";

function LeagueInfo({ getDates }) {
  return (
    <>
      <SponcerBar />
      <NavBar />
      <Info getDates={getDates} />
      <Footer />
    </>
  );
}

export default LeagueInfo;
