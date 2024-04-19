import React, { useState, useEffect } from "react";
import axios from "axios";
import "../roster.css";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Container from "./TestContainer";
import { Item } from "./TestSortable_item";

const wrapperStyle = {
  display: "flex",
  flexDirection: "row",
};

const defaultAnnouncements = {
  onDragStart(id) {
    console.log(`Picked up draggable item ${id}.`);
  },
  onDragOver(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was moved over droppable area ${overId}.`
      );
      return;
    }

    console.log(`Draggable item ${id} is no longer over a droppable area.`);
  },
  onDragEnd(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was dropped over droppable area ${overId}`
      );
      return;
    }

    console.log(`Draggable item ${id} was dropped.`);
  },
  onDragCancel(id) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  },
};

export default function TestRoster({ playerItems, setPlayerItems, filterTeamID, setFilterTeamID }) {
  const [items, setItems] = useState({
    root: ["1", "2", "3"],
    container1: ["4", "5", "6"],
    container2: ["7", "8", "9"],
    container3: [],
  });

  const [activeId, setActiveId] = useState();

  const [players, setPlayers] = useState([]);
  const [logo, setLogo] = useState();


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    getRoster();
  }, [filterTeamID]);

  useEffect(() => {
    const forwards = players.filter((player) => player.position === "Forward");
    const defense = players.filter((player) => player.position === "Defense");
    // console.log(forwards)
    setPlayerItems({
      root: forwards,
      container1: defense,
      container2: [],
      // container3: []
    });
  }, [players]);

  const getRoster = async () => {
    await axios
      .get("http://localhost:9200/playerByTeam/" + filterTeamID)
      .then((res) => {
        // setRoster(res.data);
        setPlayers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      await axios
      .get("http://localhost:9200/team/" + filterTeamID)
      .then((res) => {
        // setRoster(res.data);
        setLogo(res.data.logo);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <div className="test_grid_container">
      <DndContext
        announcements={defaultAnnouncements}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="test_active_grid">
          <Container
            id="root"
            items={items.root}
            players={playerItems.root}
            filterTeamID={filterTeamID}
            isActive={true}
            logo={logo}
          />
          <Container
            id="container1"
            items={items.container1}
            players={playerItems.container1}
            filterTeamID={filterTeamID}
            isActive={true}
            logo={logo}
          />
        </div>
        <div className="test_inactive_grid">
          <Container
            className="test_container"
            id="container2"
            items={items.container2}
            players={playerItems.container2}
            filterTeamID={filterTeamID}
            isActive={false}
            logo={logo}
          />
        </div>
        {/* <Container id="container3" items={items.container3} players={playerItems.container3}/> */}
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </DndContext>
    </div>
  );

  function findContainer(id) {
    if (id in playerItems) {
      return id;
    }
    // console.log(id);
    return Object.keys(playerItems).find((key) =>
      playerItems[key].includes(id)
    );
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    // console.log(overId.position);
    // console.log(active.id)

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    // console.log(overContainer)

    if(
      (overContainer === "container1" && active.id.position !== "Defense") || (overContainer === "root" && active.id.position !== "Forward")
    ){
      return;
    }


    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setPlayerItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // console.log(overItems);

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem = over && overIndex === overItems.length - 1;
        // &&
        // draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          playerItems[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    // console.log(id);

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = playerItems[activeContainer].indexOf(active.id);
    const overIndex = playerItems[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      // setItems((items) => ({
      //   ...items,
      //   [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
      // }));
      setPlayerItems((playerItems) => ({
        ...playerItems,
        [overContainer]: arrayMove(
          playerItems[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveId(null);
  }
}
