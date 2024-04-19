import { useState, useEffect } from "react";
import "./roster.css";
import RosterTile from "./RosterTile";
import axios from "axios";
import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  rectSwappingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import RosterSection from "./RosterSection";
import TestRoster from "./Test/TestRoster";

function Roster({filterTeamID, setFilterTeamID}) {
  const [players, setPlayers] = useState([]);
  const [lists, setLists] = useState({
    forwards: [],
    defense: [],
    scratches: [],
  });

  const [playerItems, setPlayerItems] = useState({
    root: [],
    container1: [],
    container2: [],
    // container3: []
  });

  // const filterTeamID = 9

  const [activeID, setActiveID] = useState();
  // const [test, setTest] = useState(["Test 1", "Test 2", "Test 3", "Test 4"]);

  // const { isOver, setNodeRef } = useDroppable({
  //   id: "droppable",
  // });
  // const style = {
  //   color: isOver ? "green" : undefined,
  // };

  const [roster, setRoster] = useState([]);
  const [team, setTeam] = useState({});
  useEffect(() => {
    getRoster();
    getTeam();
  }, [filterTeamID]);

  useEffect(() => {
    const forwards = players.filter((player) => player.position === "Forward");
    const defense = players.filter((player) => player.position === "Defense");
    getLists(forwards, defense);
  }, [players]);

  const getRoster = async () => {
    await axios
      .get("http://localhost:9200/playerByTeam/" + filterTeamID)
      .then((res) => {
        setRoster(res.data);
        setPlayers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // setLists({
    //   forwards: forwards,
    //   defense: defense,
    //   scratches: [],
    // });
  };
  const getTeam = async () => {
    await axios
      .get("http://localhost:9200/team/" + filterTeamID)
      .then((res) => {
        setTeam(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLists = (forwards, defense) => {
    // setLists({
    //   forwards: forwards,
    //   defense: defense,
    //   scratches: [],
    // });

    setPlayerItems({
      root: forwards,
      container1: defense,
      container2: []
    })
  };

  const handleRosterSubmit = () => {
    // {
    //   players.map((player) => {
    //     console.log(
    //       `ID: ${player.playerID} Name: ${player.firstName} ${player.lastName}`
    //     );
    //   });
    // }
    {
      playerItems.root.map((player) => {
        console.log(
          `ID: ${player.playerID} Name: ${player.firstName} ${player.lastName} Position: ${player.position}`
        );
      });
    }

    {playerItems.container1.map((player) => {
      console.log(
        `ID: ${player.playerID} Name: ${player.firstName} ${player.lastName} Position: ${player.position}`
      );
    })}

    {playerItems.container2.map((player) => {
      console.log(
        `ID: ${player.playerID} Name: ${player.firstName} ${player.lastName} Position: Inactive`
      );
    })}
  };

  const handleRosterReset = () => {
    getRoster();
    const forwards = players.filter((player) => player.position === "Forward")
    const defense = players.filter((player) => player.position === "Defense")
    getLists(forwards, defense);
  };

  // console.log(lists);

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

  // const { setNodeRef } = useDroppable({
  //   id
  // });

  const findContainer = (id) => {
    if (id in lists) {
      return id;
    }
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;

    setActiveID(id);
  };
  const handleDragOver = (event) => {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setLists((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

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
          lists[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  };

  const handleDragEnd = (event) => {
    // console.log("Drag End Called");
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = lists[activeContainer].indexOf(active.id);
    const overIndex = lists[overContainer].indexOf(over.id);

    if (activeIndex !== overIndex) {
      setLists((list) => ({
        ...list,
        [overContainer]: arrayMove(
          lists[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveID(null);
  };

  return (
    <div className="roster_container">
      <div className="roster_content">
        <div className="roster_content_container">
          {/* <div className="active_grid">
            <div className="roster_grid">
              <h2 className="roster_title">Forwards</h2>
              <div className="roster_forward_grid">
                {roster
                  .filter((player) => player.position === "Forward")
                  .map((player, i) => (
                    <RosterTile
                      key={i}
                      player={player}
                      team={team}
                      isActive={true}
                    />
                  ))}
              </div>
            </div>
            <div className="roster_grid">
              <h2 className="roster_title">Defense</h2>
              <div className="roster_defense_grid">
                {roster
                  .filter((player) => player.position === "Defense")
                  .map((player, i) => (
                    <RosterTile
                      key={i}
                      player={player}
                      team={team}
                      isActive={true}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="scratch_section">
            <div className="roster_grid">
              <div className="roster_title">Inactive</div>
              <div className="scratch_grid">
                {roster
                  .filter(
                    (player) =>
                      player.position === "Forward" ||
                      player.position === "Defense"
                  )
                  .map((player, i) => (
                    <RosterTile
                      key={i}
                      player={player}
                      team={team}
                      isActive={false}
                    />
                  ))}
              </div>
            </div>
          </div> */}

          {/* <SortableContext
            items={roster}
            stratagy={rectSwappingStrategy}
            >
              {roster.map((player, i) => (<RosterTile key={i} player={player} team={team} isActive={true}/>))}
            </SortableContext> */}
          {/* <RosterSection players={players} lists={lists} team={team} setPlayers={setPlayers} setLists={setLists} setActiveID={setActiveID}/> */}
          {/* <DndContext
            collisionDetection={closestCorners}
            announcements={defaultAnnouncements}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
          >
            <RosterSection
              players={players}
              id="forwards"
              lists={lists.forwards}
              team={team}
              setPlayers={setPlayers}
              setLists={setLists}
              setActiveID={setActiveID}
            />
            <RosterSection
              players={players}
              id="defense"
              lists={lists.defense}
              team={team}
              setPlayers={setPlayers}
              setLists={setLists}
              setActiveID={setActiveID}
            />
            <RosterSection
              players={players}
              id="scratches"
              lists={lists.scratches}
              team={team}
              setPlayers={setPlayers}
              setLists={setLists}
              setActiveID={setActiveID}
            />
            <DragOverlay>
              {activeID ? <RosterTile id={activeID} /> : null}
            </DragOverlay>
          </DndContext> */}
          <TestRoster
            playerItems={playerItems}
            setPlayerItems={setPlayerItems}
            filterTeamID={filterTeamID}
            setFilterTeamID={setFilterTeamID}
          />
          <div className="roster_controls">
            <button className="submit_btn btn" onClick={handleRosterSubmit}>
              Submit
            </button>
            <button className="cancel_btn btn" onClick={handleRosterReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roster;
