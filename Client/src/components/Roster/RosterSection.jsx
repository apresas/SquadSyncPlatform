import "./rosterSection.css";
import RosterTile from "./RosterTile";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  rectSwappingStrategy,
  arraySwap,
} from "@dnd-kit/sortable";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";

function RosterSection({
  players,
  team,
  lists,
  setPlayers,
  setLists,
  setActiveID,
  id,
}) {
  // const handleDragEnd = (e) => {
  //   // console.log("Drag End Called");
  //   const { active, over } = e;
  //   // console.log("ACTIVE: " + active.id);
  //   // console.log("OVER: " + over.id);

  //   if (active.id !== over.id) {
  //     setPlayers((items) => {
  //       const activeIndex = items.indexOf(active.id);
  //       const overIndex = items.indexOf(over.id);
  //       // console.log(arrayMove(items, activeIndex, overIndex))
  //       return arrayMove(items, activeIndex, overIndex);
  //     });
  //   }
  // };

  // const handleDragEnd = (e) => {
  //   // console.log("Drag End Called");
  //   const { active, over } = e;
  //   if (active.id === over.id) {
  //     return;
  //   }
  //   // console.log("ACTIVE: " + active.id);
  //   // console.log("OVER: " + over.id);

  //   if (active.id !== over.id) {
  //     setPlayers((items) => {
  //       const activeIndex = items.indexOf(active.id);
  //       const overIndex = items.indexOf(over.id);

  //       if (items[activeIndex].playerID !== items[overIndex].playerID) {
  //         const nIndex = items[overIndex].playerID;
  //         items[overIndex].playerID = items[activeIndex].playerID;
  //         items[activeIndex].playerID = nIndex;
  //       }

  //       const swap = arraySwap(items, activeIndex, overIndex);
  //       // console.log(arrayMove(items, activeIndex, overIndex))
  //       return swap;
  //     });
  //   }
  // };

  // const defaultAnnouncements = {
  //   onDragStart(id) {
  //     console.log(`Picked up draggable item ${id}.`);
  //   },
  //   onDragOver(id, overID) {
  //     if (overID) {
  //       console.log(
  //         `Draggable item ${id} was moved over droppable area ${overID}.`
  //       );
  //       return;
  //     }
  
  //     console.log(`Draggable item ${id} is no longer over a droppable area.`);
  //   },
  //   onDragEnd(id, overID) {
  //     if (overID) {
  //       console.log(
  //         `Draggable item ${id} was dropped over droppable area ${overID}`
  //       );
  //       return;
  //     }
  
  //     console.log(`Draggable item ${id} was dropped.`);
  //   },
  //   onDragCancel(id) {
  //     console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  //   }
  // };

  const { setNodeRef } = useDroppable({
    id
  });

  // const findContainer = (id) => {
  //   if (id in lists) {
  //     return id;
  //   }
  // };

  // const handleDragStart = (event) => {
  //   const { active } = event;
  //   const { id } = active;

  //   setActiveID(id);
  // };
  // const handleDragOver = (event) => {
  //   const { active, over, draggingRect } = event;
  //   const { id } = active;
  //   const { id: overID } = over;

  //   // Find the containers
  //   const activeContainer = findContainer(id);
  //   const overContainer = findContainer(overID);

  //   if (
  //     !activeContainer ||
  //     !overContainer ||
  //     activeContainer === overContainer
  //   ) {
  //     return;
  //   }

  //   setLists((prev) => {
  //     const activeItems = prev[activeContainer];
  //     const overItems = prev[overContainer];

  //     // Find the indexes for the items
  //     const activeIndex = activeItems.indexOf(id);
  //     const overIndex = overItems.indexOf(overID);

  //     let newIndex;
  //     if (overID in prev) {
  //       // We're at the root droppable of a container
  //       newIndex = overItems.length + 1;
  //     } else {
  //       const isBelowLastItem =
  //         over &&
  //         overIndex === overItems.length - 1 &&
  //         draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

  //       const modifier = isBelowLastItem ? 1 : 0;

  //       newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
  //     }

  //     return {
  //       ...prev,
  //       [activeContainer]: [
  //         ...prev[activeContainer].filter((item) => item !== active.id),
  //       ],
  //       [overContainer]: [
  //         ...prev[overContainer].slice(0, newIndex),
  //         lists[activeContainer][activeIndex],
  //         ...prev[overContainer].slice(newIndex, prev[overContainer].length),
  //       ],
  //     };
  //   });
  // };

  // const handleDragEnd = (e) => {
  //   // console.log("Drag End Called");
  //   const { active, over } = e;
  //   const { id } = active;
  //   const { id: overID } = over;

  //   const activeContainer = findContainer(id);
  //   const overContainer = findContainer(overID);

  //   if (
  //     !activeContainer ||
  //     !overContainer ||
  //     activeContainer !== overContainer
  //   ) {
  //     return;
  //   }

  //   const activeIndex = lists[activeContainer].indexOf(active.id);
  //   const overIndex = lists[overContainer].indexOf(over.id);

  //   if (activeIndex !== overIndex) {
  //     setLists((list) => ({
  //       ...list,
  //       [overContainer]: arrayMove(
  //         lists[overContainer],
  //         activeIndex,
  //         overIndex
  //       ),
  //     }));
  //   }

  //   setActiveID(null);
  // };
  return (
    <section className="roster_section">
      {/* <DndContext
        collisionDetection={closestCorners}
        announcements={defaultAnnouncements}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
      > */}
        <SortableContext id={id} items={lists} strategy={rectSwappingStrategy}>
          {/* <div className="roster_test_grid">
            {players
              .filter((player) => player.position === "Forward")
              .slice(0,6)
              .map((player, i) => (
                <RosterTile
                  key={i}
                  id={player}
                  player={player}
                  team={team}
                  isActive={true}
                />
              ))}
          </div>
          <div className="roster_test_grid">
            {players
              .filter((player) => player.position === "Forward")
              .slice(6, players.length - 1)
              .map((player, i) => (
                <RosterTile
                  key={i}
                  id={player}
                  player={player}
                  team={team}
                  isActive={true}
                />
              ))}
          </div> */}
          {/* <h2 className="roster_title">Forwards</h2>
          <div className="roster_test_grid">
            {lists.forwards.map((player, i) => (
              <RosterTile
                key={i}
                id={player}
                player={player}
                team={team}
                isActive={true}
              />
            ))}
          </div>
          <h2 className="roster_title">Defense</h2>
          <div className="roster_test_grid">
            {lists.defense.map((player, i) => (
              <RosterTile
                key={i}
                id={player}
                player={player}
                team={team}
                isActive={true}
              />
            ))}
          </div>
          <h2 className="roster_title">Inactive</h2>
          <div className="roster_test_grid">
            {lists.scratches.map((player, i) => (
              <RosterTile
                key={i}
                id={player}
                player={player}
                team={team}
                isActive={true}
              />
            ))}
          </div> */}
          <h2 className="roster_title">{id}</h2>
          <div className="roster_test_grid" ref={setNodeRef}>
            {lists.map((player, i) => (
              <RosterTile
                key={i}
                id={player}
                player={player}
                team={team}
                isActive={true}
              />
            ))}
          </div>
        </SortableContext>
      {/* </DndContext> */}
    </section>
  );
}

export default RosterSection;
