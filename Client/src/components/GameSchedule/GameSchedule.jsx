/* eslint-disable react/prop-types */
import DayTile from "./DayTile";
import SchduleTable from "./ScheduleTable";
import ScheduleFilterControls from "./ScheduleFilterControls";
import TitleBar from "../TitleBar";
import scheduleData from "../../data/schedule.json";
import "./gameSchedule.css";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

function GameSchedule({
  currentTeamTitle,
  setCurrentTeamTitle,
  dateList,
  getDates,
  selected,
  setSelected,
  nextClick,
  prevClick,
  setFilteredItem,
  filteredItem,
  defaultTeam,
  setDefaultTeam
}) {
  // const filterTable = (data) => {
  //   data.games
  //     .map((data) => data)
  //     .filter((data) => data.gameID === filteredItem.gameID)
  // };

  // useEffect(() => {
  //   scheduleData
  //     .filter((data) => data.date === dateList[0])
  //     .map((data) => data)
  //     .filter(filterTable);
  // });

  // console.log(filteredItem);
  return (
    <>
      <div className="schedule_container">
        <div className="schedule_content_container">
          <TitleBar title="Schedule" subtitle="2023-2024" />
          <ScheduleFilterControls
            setCurrentTeamTitle={setCurrentTeamTitle}
            currentTeamTitle={currentTeamTitle}
            getDates={getDates}
            setSelected={setSelected}
            selected={selected}
            nextClick={nextClick}
            prevClick={prevClick}
          />
          <div className="day_tile_container">
            <DayTile
              href={"#s1"}
              date={dateList[0]}
              scheduleData={scheduleData}
              filteredItem={filteredItem}
            />
            <DayTile
              href={"#s2"}
              date={dateList[1]}
              scheduleData={scheduleData}
              filteredItem={filteredItem}
            />
            <DayTile
              href={"#s3"}
              date={dateList[2]}
              scheduleData={scheduleData}
              filteredItem={filteredItem}
            />
            <DayTile
              href={"#s4"}
              date={dateList[3]}
              scheduleData={scheduleData}
              filteredItem={filteredItem}
            />
            <DayTile
              href={"#s5"}
              date={dateList[4]}
              scheduleData={scheduleData}
              filteredItem={filteredItem}
            />
            <DayTile
              href={"#s6"}
              date={dateList[5]}
              scheduleData={scheduleData}
              filteredItem={filteredItem}
            />
            <DayTile
              href={"#s7"}
              date={dateList[6]}
              scheduleData={scheduleData}
              filteredItem={filteredItem}
            />
          </div>
          <div className="schedule_table">
            <section className="schedule_section" id="s1">
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
            </section>
          </div>
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
