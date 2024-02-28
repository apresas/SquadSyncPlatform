/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PlayerForm from "../components/PlayerForm/PlayerForm";
import SponcerBar from "../components/Sponcer/SponcerBar";
import "./archieve.css";
import playerPortrait from "../assets/Player_Icon.svg";
import { TbUserEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import UpdatePlayerModal from "../modal/UpdatePlayerModal";
import PlayerStatsModal from "../modal/PlayerStatsModal";
import PlayerDropdown from "../components/PlayerForm/PlayerDropdown";
import { Link, useParams } from "react-router-dom";

function Archieve({
  teamData,
  testPlayers,
  getTestPlayers,
  getFilterTeam,
  filteredPlayers,
  setCurrentPlayer,
  currentPlayer,
}) {
  const [openModal, setOpenModal] = useState(false);
  // const [currentPlayer, setCurrentPlayer] = useState({});
  const [filterTeamID, setFilterTeamID] = useState();
  const [openStats, setOpenStats] = useState(false);

  const [filterDropdown, setFilterDropdown] = useState([]);

  const handleDelete = async (playerID) => {
    try {
      await axios.delete("http://localhost:9200/players/" + playerID);
      getFilterTeam(filterTeamID);
    } catch (err) {
      console.log(err);
    }
  };

  const handleModalOpen = async (e, playerData) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenModal(true);
    setCurrentPlayer(playerData);
  };

  const handleStatsOpen = async (e, playerData) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenStats(true);
    setCurrentPlayer(playerData);
  };
  console.log(currentPlayer);
  useEffect(() => {
    getFilterTeam(filterTeamID);
  }, [filterTeamID]);

  useEffect(() => {
    let teamDropdownItem = [];
    const all = {
      teamID: "",
      schoolName: "All Teams",
      mascotName: "",
      city: "",
      division: "",
    };
    teamDropdownItem.push(all);
    teamData.map((team) => teamDropdownItem.push(team));
    setFilterDropdown(teamDropdownItem);
  }, [teamData]);

  console.log(filteredPlayers);

  return (
    <>
      <UpdatePlayerModal
        open={openModal}
        currentPlayer={currentPlayer}
        teamData={teamData}
        setOpenModal={setOpenModal}
        getTestPlayers={getTestPlayers}
        getFilterTeam={getFilterTeam}
        filterTeamID={filterTeamID}
      />
      <PlayerStatsModal
        open={openStats}
        currentPlayer={currentPlayer}
        teamData={teamData}
        setOpenStats={setOpenStats}
        getTestPlayers={getTestPlayers}
        getFilterTeam={getFilterTeam}
        filterTeamID={filterTeamID}
      />
      <SponcerBar />
      <NavBar />
      <div className="archieve_container">
        <div className="archieve_content_container">
          <div>Archieve</div>
          <PlayerForm
            teamData={teamData}
            getTestPlayers={getTestPlayers}
            getFilterTeam={getFilterTeam}
            filterTeamID={filterTeamID}
          />
          <div className="player_manager_controls">
            <h2 className="player_manager_title">Player Manager</h2>
            <PlayerDropdown
              type="Team"
              data={filterDropdown}
              setSelectedTeamID={setFilterTeamID}
            />
          </div>
          <div className="test_player_grid">
            {filteredPlayers
              .map((player) => (
                <div
                  className="test_player_container"
                  key={player.playerID}
                >
                  <button
                    className="test_delete_btn"
                    onClick={() => handleDelete(player.playerID)}
                  >
                    <RiDeleteBin5Line />
                  </button>
                  <button
                    className="test_update_btn"
                    onClick={(e) => handleModalOpen(e, player)}
                  >
                    <TbUserEdit />
                  </button>
                  <div className="test_portrait_container">
                    <img
                      src={playerPortrait}
                      alt=""
                      className="test_player_image"
                    />
                    <span />
                  </div>
                  <div className="test_player_info">
                    <h2>
                      {player.firstName} {player.lastName}
                    </h2>
                    <h1>{player.jerseyNumber}</h1>
                  </div>
                  <div className="test_player_sub">
                    {teamData
                      .filter((data) => data.teamID === player.teamID)
                      .map((data) => (
                        <img
                          className="test_player_logo_sm"
                          key={player.playerID}
                          src={data.logo}
                          alt="teamLogo"
                        />
                      ))}
                    <span />
                    <small>{player.position}</small>
                    <span />
                    <small>{player.class}</small>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Archieve;
