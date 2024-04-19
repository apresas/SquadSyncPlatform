import React, { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";

export function Item({ id, isActive, filterTeamID, logo }) {
  const [currentID, setCurrentID] = useState();
  useEffect(() => {
    getTeam(filterTeamID);
  }, [filterTeamID]);
  // console.log(filterTeamID);
  const [team, setTeam] = useState({});
  const getTeam = async (filterTeamID) => {
    await axios
      .get("http://localhost:9200/team/" + filterTeamID)
      .then((res) => {
        setTeam(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="test_roster_tile">
      <img className="tile_bg_logo" src={logo} />
      {!isActive ? <div className="test_tile_overlay"></div> : null}
      <h3 className="test_player_name">
        {id.firstName} {id.lastName}
      </h3>
      <h1 className="test_player_number">{id.jerseyNumber}</h1>
      <div className="test_player_position">
        {/* <img src={team.logo} alt="logo" /> | */}
        <span>{id.position}</span>
      </div>
    </div>
  );
}

export default function SortableItem({ id, isActive, filterTeamID, logo }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // console.log(filterTeamID)

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item
        id={id}
        isActive={isActive}
        filterTeamID={filterTeamID}
        logo={logo}
      />
    </div>
  );
}
