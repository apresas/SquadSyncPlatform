import React from "react";
import NavBar from "../components/NavBar";
import SponcerBar from "../components/Sponcer/SponcerBar";
import Footer from "../components/Footer";
import Awards from "../components/Awards/Awards";

function PlayerAwards({getDates}) {
  return (
    <>
      <SponcerBar />
      <NavBar />
      <Awards getDates={getDates}/>
      <Footer />
    </>
  );
}

export default PlayerAwards;
