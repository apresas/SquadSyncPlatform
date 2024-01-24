// import React from 'react'
import "./varsityNav.css";
import { Link } from "react-router-dom"

function VarsityNav() {
  return (
    <div className="varsity_nav_container">
      {/* Varsity */}
      <Link to="/schedule" className="navLinks">
        Schedule
      </Link>
      <Link to="/info" className="navLinks">
        League Info
      </Link>
      <Link to="/rankings" className="navLinks">
        Rankings
      </Link>
      <Link to="/postseason" className="navLinks">
        Post Season
      </Link>
      <Link to="/awards" className="navLinks">
        Player Awards
      </Link>
      <Link to="/allstar" className="navLinks">
        All-Star Games
      </Link>
      {/* <a href="" className="navLinks">
        Schdule
      </a>
      <a href="" className="navLinks">
        League Info
      </a>
      <a href="" className="navLinks">
        Post Season
      </a>
      <a href="" className="navLinks">
        Rankings
      </a>
      <a href="" className="navLinks">
        League Leaders
      </a>
      <a href="" className="navLinks">
        Player Awards
      </a>
      <a href="" className="navLinks">
        All-Star Games
      </a>
      <a href="" className="navLinks">
        Team Columbus
      </a>
      <a href="" className="navLinks">
        League History
      </a>
      <a href="" className="navLinks">
        Archives
      </a>
      <a href="" className="navLinks">
        Links
      </a> */}
    </div>
  );
}

export default VarsityNav;
