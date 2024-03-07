import { useEffect} from "react";
import "./awards.css";
import AwardItem from "./AwardItem";
import TitleBar from "../TitleBar";
import HonorableMention from "./HonorableMention";
import AllDivisionItem from "./AllDivisionItem";
import playerAwards from "../../data/playerAwards.json";

function Awards({getDates}) {
  useEffect(() => {
    getDates(new Date())
  }, [])
  return (
    <div className="awards_container">
      <div className="awards_content_container">
        <TitleBar title="All League Awards" subtitle="2023-2024" />
        <div className="all_league_section">
        <div className="section_container">
          <h2 className="section_title" id="title">First Team</h2>
          <h3 className="section_sub_title">All CHC</h3>
          <div className="first_team_container">
            {playerAwards
              .filter((data) => data.category === "firstTeam")
              .map((data, i) => (
                <AwardItem key={i} player={data} />
              ))}
          </div>
        </div>
        <div className="section_container">
          <h2 className="section_title" id="title">Second Team</h2>
          <h3 className="section_sub_title">All CHC</h3>
          <div className="second_team_container">
            {playerAwards
              .filter((data) => data.category === "secondTeam")
              .map((data, i) => (
                <AwardItem key={i} player={data} />
              ))}
          </div>
        </div>
        </div>
        <div className="section_container" id="all_league_section">
          <h2 className="section_title">All Division Team</h2>
          <div className="all_league_container">
            <div className="all_division_container">
              <div
                className="all_division_header"
                style={{ backgroundColor: "#ff2400", color: "white" }}
              >
                <h2>1st Team</h2>
                <h3>All-Red Division</h3>
              </div>
              <div className="all_division_body">
                {playerAwards
                  .filter(
                    (data) =>
                      data.category === "allDivision" && data.division === "Red"
                  )
                  .map((data, i) => (
                    <AllDivisionItem key={i} player={data} />
                  ))}
              </div>
            </div>
            <div className="all_division_container">
              <div
                className="all_division_header"
                style={{ backgroundColor: "transparent" }}
              >
                <h2>1st Team</h2>
                <h3>All-White Division</h3>
              </div>
              <div className="all_division_body">
                {playerAwards
                  .filter(
                    (data) =>
                      data.category === "allDivision" &&
                      data.division === "White"
                  )
                  .map((data, i) => (
                    <AllDivisionItem key={i} player={data} />
                  ))}
              </div>
            </div>
            <div className="all_division_container">
              <div
                className="all_division_header"
                style={{ backgroundColor: "#0047ab", color: "white" }}
              >
                <h2>1st Team</h2>
                <h3>All-Blue Division</h3>
              </div>
              <div className="all_division_body">
                {playerAwards
                  .filter(
                    (data) =>
                      data.category === "allDivision" &&
                      data.division === "Blue"
                  )
                  .map((data, i) => (
                    <AllDivisionItem key={i} player={data} />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="section_container" id="honorable_section">
        <h2 className="section_title">Honorable Mentions</h2>
        {/* <div className="honorable_mention_container"> */}
          <HonorableMention />
        {/* </div> */}
      </div>
      </div>
    </div>
  );
}

export default Awards;
