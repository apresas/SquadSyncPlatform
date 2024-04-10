import React from "react";
import NavBar from "../components/NavBar";
import SponcerBar from "../components/Sponcer/SponcerBar";
import Footer from "../components/Footer";
import Allstar from "../components/AllStar/Allstar";

function AllstarGame({getDates}) {
  return (
    <>
      <SponcerBar />
      <NavBar />
      <Allstar getDates={getDates}/>
      <Footer />
    </>
  );
}

export default AllstarGame;
