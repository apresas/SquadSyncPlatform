import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PlayerForm from "../components/PlayerForm/PlayerForm";
import SponcerBar from "../components/Sponcer/SponcerBar";
import "./archieve.css";

function Archieve({teamData}) {
  return (
    <>
    <SponcerBar />
    <NavBar />
    <div className="archieve_container">
      <div className="archieve_content_container">
        <div>Archieve</div>
        <PlayerForm teamData={teamData}/>
      </div>
      <Footer />
    </div>
    </>
  );
}

export default Archieve;
