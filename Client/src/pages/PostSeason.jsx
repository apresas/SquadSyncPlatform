import React from "react";
import NavBar from "../components/NavBar";
import SponcerBar from "../components/Sponcer/SponcerBar";
import Footer from "../components/Footer";
import PlayoffBracket from "../components/Playoff/PlayoffBracket";
function PostSeason({ getDates }) {
  return (
    <>
      <SponcerBar />
      <NavBar />
      <PlayoffBracket getDates={getDates}/>
      <Footer />
    </>
  );
}

export default PostSeason;
