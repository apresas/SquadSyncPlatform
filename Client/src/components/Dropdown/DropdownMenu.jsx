import React from "react";
import DropdownItem from "./DropdownItem";
import teamData from "../../data/teams.json";
import "./dropdown.css";
function DropdownMenu({ setDropdownTitle, setLogo, setCurrentTeamTitle, currentTeamTitle }) {
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
        />
      </li>
      {teamData.map((data) => (
        <li key={data.id}>
          <DropdownItem
            name={data.schoolName}
            logo={data.logo}
            setDropdownTitle={setDropdownTitle}
            setCurrentTeamTitle={setCurrentTeamTitle}
            currentTeamTitle={currentTeamTitle}
            setLogo={setLogo}
          />
        </li>
      ))}
    </ul>
  );
}

export default DropdownMenu;
