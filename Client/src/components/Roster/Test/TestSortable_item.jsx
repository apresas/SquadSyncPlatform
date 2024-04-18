import React, { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";

export function Item({ id, isActive }) {
  useEffect(() => {
    getTeam();
  }, []);
  const [team, setTeam] = useState({});
  const getTeam = async () => {
    await axios
      .get("http://localhost:9200/team/" + 9)
      .then((res) => {
        setTeam(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="test_roster_tile">
      {!isActive ? <div className="test_tile_overlay"></div> : null}
      <h3 className="test_player_name">
        {id.firstName} {id.lastName}
      </h3>
      <h1 className="test_player_number">{id.jerseyNumber}</h1>
      <div className="test_player_position">
        <img src={team.logo} alt="logo" /> |<span>{id.position}</span>
      </div>
    </div>
  );
}

export default function SortableItem({ id, isActive }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={id}  isActive={isActive}/>
    </div>
  );
}
