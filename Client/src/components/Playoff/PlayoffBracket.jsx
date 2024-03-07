import { useEffect } from "react";
import BracketLayout from "./BracketLayout";
import "./playoffBracket.css";
import TitleBar from "../TitleBar";
import ConsolationBracket from "./ConsolationBracket";

function PlayoffBracket({getDates}) {
useEffect(() => {
  getDates(new Date());
}, [])
  return (
    <div className="playoff_bracket_container">
      <div className="playoff_bracket_content_container">
        <TitleBar title="Blue Jackets Cup" subtitle="2023-2024" />
        <div className="bracket_section_container">
          <h2 className="bracket_title">Varsity Bracket</h2>
          <BracketLayout />
        </div>
        <span className="section_divider" />
        <div className="bracket_section_container">
          <h2 className="bracket_title">Consolation Bracket</h2>
          {/* <BracketLayout /> */}
          <ConsolationBracket />
        </div>
      </div>
    </div>
  );
}

export default PlayoffBracket;
