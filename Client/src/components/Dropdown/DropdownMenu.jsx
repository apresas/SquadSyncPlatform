import React from "react";
import DropdownItem from "./DropdownItem";
// import teamData from "../../data/teams.json";
import "./dropdown.css";
function DropdownMenu({ setDropdownTitle, setLogo, setCurrentTeamTitle, currentTeamTitle, setSelectedTeam, teamData}) {
  return (
    <ul className="dropdown_menu">
      <li>
        <DropdownItem
          name="All Teams"
          logo={null}
          setDropdownTitle={setDropdownTitle}
          setCurrentTeamTitle={setCurrentTeamTitle}
          currentTeamTitle={currentTeamTitle}
          setLogo={setLogo}
          setSelectedTeam={setSelectedTeam}
        />
      </li>
      {teamData.map((data, i) => (
        <li key={i}>
          <DropdownItem
            name={data.schoolName}
            logo={data.logo}
            teamID={data.teamID}
            setDropdownTitle={setDropdownTitle}
            setCurrentTeamTitle={setCurrentTeamTitle}
            currentTeamTitle={currentTeamTitle}
            setLogo={setLogo}
            setSelectedTeam={setSelectedTeam}
          />
        </li>
      ))}
    </ul>
  );
}

export default DropdownMenu;
