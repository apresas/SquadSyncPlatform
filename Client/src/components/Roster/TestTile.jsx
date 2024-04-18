import React from "react";
import "./testTile.css"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TestTile({ id, test }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="test_tile">
      {test}
    </div>
  );
}

export default TestTile;
