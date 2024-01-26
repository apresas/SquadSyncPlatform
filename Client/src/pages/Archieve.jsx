import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PlayerForm from "../components/PlayerForm/PlayerForm";
import "./archieve.css";

function Archieve() {
  return (
    <div className="archieve_container">
      <NavBar />
      <div className="archieve_content_container">
        <div>Archieve</div>
        <PlayerForm />
      </div>
      <Footer />
    </div>
  );
}

export default Archieve;
