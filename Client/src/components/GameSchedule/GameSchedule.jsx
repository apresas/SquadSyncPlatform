/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import DayTile from "./DayTile";
import ScheduleFilterControls from "./ScheduleFilterControls";
import TitleBar from "../TitleBar";
import scheduleData from "../../data/schedule.json";
import "./gameSchedule.css";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import TestSchduleTable from "./TestSchduleTable";
import AddScheduleModal from "../../modal/AddScheduleModal";
import LoadingOverlay from "../Loading/LoadingOverlay";
function GameSchedule({
  currentTeamTitle,
  setCurrentTeamTitle,
  dateList,
  getDates,
  selected,
  setSelected,
  nextClick,
  prevClick,
  filteredItem,
  teamData,
  gameSubmit,
  setGameSubmit,
  setCurrentGame
}) {
  const [selectedTeam, setSelectedTeam] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // let isLoading = false;

  // const isLoading = useRef(false);

  const handleModalOpen = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenModal(true);
  };

  useEffect(() => {
    // setDateList()
    setGameSubmit(false)
    getDates(new Date())
  }, [])


  // console.log(isLoading)

  return (
    <>
      <AddScheduleModal
        teamData={teamData}
        selected={selected}
        open={openModal}
        setOpenModal={setOpenModal}
        gameSubmit={gameSubmit}
        setGameSubmit={setGameSubmit}
      />
      <div className="schedule_container">
        <div className="schedule_content_container">
          <TitleBar title="League Schedule" subtitle="2023-2024" />
          <ScheduleFilterControls
            setCurrentTeamTitle={setCurrentTeamTitle}
            currentTeamTitle={currentTeamTitle}
            getDates={getDates}
            setSelected={setSelected}
            selected={selected}
            nextClick={nextClick}
            prevClick={prevClick}
            setSelectedTeam={setSelectedTeam}
            teamData={teamData}
            handleModalOpen={handleModalOpen}
            isLoading={isLoading}
          />
          <div className="day_tile_container">
            <DayTile
              href={"#s0"}
              date={dateList[0]}
              scheduleData={scheduleData}
              filteredItem={filteredItem}
              selectedTeam={selectedTeam}
            />
            <DayTile
              href={"#s1"}
              date={dateList[1]}
              scheduleData={scheduleData}
              filteredItem={filteredItem}
              selectedTeam={selectedTeam}
            />
            <DayTile
              href={"#s2"}
              date={dateList[2]}
              scheduleData={scheduleData}
              filteredItem={filteredItem}
              selectedTeam={selectedTeam}
            />
            <DayTile
              href={"#s3"}
              date={dateList[3]}
              scheduleData={scheduleData}
              filteredItem={filteredItem}
              selectedTeam={selectedTeam}
            />
            <DayTile
              href={"#s4"}
              date={dateList[4]}
              scheduleData={scheduleData}
              filteredItem={filteredItem}
              selectedTeam={selectedTeam}
            />
            <DayTile
              href={"#s5"}
              date={dateList[5]}
              scheduleData={scheduleData}
              filteredItem={filteredItem}
              selectedTeam={selectedTeam}
            />
            <DayTile
              href={"#s6"}
              date={dateList[6]}
              scheduleData={scheduleData}
              filteredItem={filteredItem}
              selectedTeam={selectedTeam}
            />
          </div>
          {isLoading ? <LoadingOverlay /> :
          <div className="schedule_table">
            {dateList.map((dateData, i) => {
              return (
                <TestSchduleTable
                  key={i}
                  date={dateData}
                  teamData={teamData}
                  index={i}
                  selectedTeam={selectedTeam}
                  gameSubmit={gameSubmit}
                  setCurrentGame={setCurrentGame}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              );
            })}
            {/* <section className="schedule_section" id="s1">
              {scheduleData
                .filter((data) => data.date === dateList[0])
                .map((data) => data.games)
                .map((data, i) => (
                  <SchduleTable
                    key={i}
                    gameData={data}
                    date={dateList[0]}
                    filterTeam={currentTeamTitle}
                    setFilteredItem={setFilteredItem}
                    filteredItem={filteredItem}
                    setDefaultTeam={setDefaultTeam}
                  />
                ))}
            </section>
            <section className="schedule_section" id="s2">
              {scheduleData
                .filter((data) => data.date === dateList[1])
                .map((data) => data.games)
                .map((data, i) => (
                  <SchduleTable
                    key={i}
                    gameData={data}
                    date={dateList[1]}
                    filterTeam={currentTeamTitle}
                    setFilteredItem={setFilteredItem}
                    filteredItem={filteredItem}
                    setDefaultTeam={setDefaultTeam}
                  />
                ))}
            </section>
            <section className="schedule_section" id="s3">
              {scheduleData
                .filter((data) => data.date === dateList[2])
                .map((data) => data.games)
                .map((data, i) => (
                  <SchduleTable
                    key={i}
                    gameData={data}
                    date={dateList[2]}
                    filterTeam={currentTeamTitle}
                    setFilteredItem={setFilteredItem}
                    filteredItem={filteredItem}
                    setDefaultTeam={setDefaultTeam}
                  />
                ))}
            </section>
            <section className="schedule_section" id="s4">
              {scheduleData
                .filter((data) => data.date === dateList[3])
                .map((data) => data.games)
                .map((data, i) => (
                  <SchduleTable
                    key={i}
                    gameData={data}
                    date={dateList[3]}
                    filterTeam={currentTeamTitle}
                    setFilteredItem={setFilteredItem}
                    filteredItem={filteredItem}
                    setDefaultTeam={setDefaultTeam}
                  />
                ))}
            </section>
            <section className="schedule_section" id="s5">
              {scheduleData
                .filter((data) => data.date === dateList[4])
                .map((data) => data.games)
                .map((data, i) => (
                  <SchduleTable
                    key={i}
                    gameData={data}
                    date={dateList[4]}
                    filterTeam={currentTeamTitle}
                    setFilteredItem={setFilteredItem}
                    filteredItem={filteredItem}
                    setDefaultTeam={setDefaultTeam}
                  />
                ))}
            </section>
            <section className="schedule_section" id="s6">
              {scheduleData
                .filter((data) => data.date === dateList[5])
                .map((data) => data.games)
                .map((data, i) => (
                  <SchduleTable
                    key={i}
                    gameData={data}
                    date={dateList[5]}
                    filterTeam={currentTeamTitle}
                    setFilteredItem={setFilteredItem}
                    filteredItem={filteredItem}
                    setDefaultTeam={setDefaultTeam}
                  />
                ))}
            </section>
            <section className="schedule_section" id="s7">
              {scheduleData
                .filter((data) => data.date === dateList[6])
                .map((data) => data.games)
                .map((data, i) => (
                  <SchduleTable
                    key={i}
                    gameData={data}
                    date={dateList[6]}
                    filterTeam={currentTeamTitle}
                    setFilteredItem={setFilteredItem}
                    filteredItem={filteredItem}
                    setDefaultTeam={setDefaultTeam}
                  />
                ))}
            </section> */}
          </div>
          }
          <div className="schedule_controller">
            <button className="schedule_btn" onClick={prevClick}>
              <FiChevronLeft /> Previous
            </button>
            <button className="schedule_btn" onClick={nextClick}>
              Next <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameSchedule;
