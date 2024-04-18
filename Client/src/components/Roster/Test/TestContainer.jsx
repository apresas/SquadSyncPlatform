import React, { useState, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./TestSortable_item";

const containerStyle = {
  background: "#dadada",
  padding: 10,
  margin: 10,
  flex: 1,
  // display: "grid",
  // gridTemplateColumns: "1fr 1fr 1fr"
};

export default function Container({ id, items, players, isActive}) {
  const [containerStyle, setContainerStyle] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (id === "root") {
      setContainerStyle("root");
      setTitle("Forwards");
    } else if (id === "container1") {
      setContainerStyle("container1");
      setTitle("Defense");
    } else if (id === "container2") {
      setContainerStyle("container2");
      setTitle("Inactive");
    }
  }, []);

  // console.log(items)
  // console.log(players)
  // console.log(id)
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext id={id} items={players} strategy={rectSwappingStrategy}>
      <div className="test_column">
        <div className="test_title">
          <h2>{title}</h2>
        </div>
        <div ref={setNodeRef} className={containerStyle}>
          {/* {items.map((id, i) => (
          <SortableItem key={i} id={id} item={items}/>
        ))} */}
          {players.map((player, i) => (
            <SortableItem key={i} id={player} player={player} isActive={isActive} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
}
