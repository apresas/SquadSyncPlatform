import React from "react";
import NavBar from "../components/NavBar";
import SponcerBar from "../components/Sponcer/SponcerBar";
import Footer from "../components/Footer";
import Allstar from "../components/AllStar/Allstar";

function AllstarGame() {
  return (
    <>
      <SponcerBar />
      <NavBar />
      <Allstar />
      <Footer />
    </>
  );
}

export default AllstarGame;
