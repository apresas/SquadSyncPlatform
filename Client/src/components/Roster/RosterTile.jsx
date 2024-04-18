import { useEffect, useState } from "react";
import "./rosterTile.css";
import { LuCircleSlash } from "react-icons/lu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function RosterTile({ id, player, team, isActive }) {
  // <LuCircleSlash style={{color: "lightgrey", opacity: 0.7}}/>
  // const {attributes, listeners, setNodeRef, transform} = useDraggable({
  //   id: 'draggable',
  // });
  // const style = transform ? {
  //   transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  // } : undefined;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      className="roster_tile_container"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {!isActive ? <div className="tile_overlay"></div> : null}
      <h2 className="roster_tile_name">
        {player.firstName} {player.lastName}
      </h2>
      <h1 className="roster_tile_number">{player.jerseyNumber}</h1>
      <div className="roster_tile_info">
        <img src={team.logo} alt="logo" />
        <span>|</span>
        <span>{player.position}</span>
        {/* <span>|</span>
            <span>{player.class}</span> */}
      </div>
    </div>
  );
}

export default RosterTile;
