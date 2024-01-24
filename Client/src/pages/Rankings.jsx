import React from "react";
import NavBar from "../components/NavBar";
import SponcerBar from "../components/Sponcer/SponcerBar";
import Footer from "../components/Footer";
import Ranking from "../components/Ranking/Ranking";

function Rankings() {
  return (
    <>
      <SponcerBar />
      <NavBar />
      <Ranking />
      <Footer />
    </>
  );
}

export default Rankings;
