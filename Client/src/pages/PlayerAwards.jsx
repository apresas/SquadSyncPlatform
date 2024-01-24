import React from "react";
import NavBar from "../components/NavBar";
import SponcerBar from "../components/Sponcer/SponcerBar";
import Footer from "../components/Footer";
import Awards from "../components/Awards/Awards";

function PlayerAwards() {
  return (
    <>
      <SponcerBar />
      <NavBar />
      <Awards />
      <Footer />
    </>
  );
}

export default PlayerAwards;
