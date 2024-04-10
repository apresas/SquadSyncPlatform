// import { useRef } from "react";
import "./varsityNav.css";
import { Link } from "react-router-dom";

function VarsityNav() {
  // const scheduleBtnRef = useRef();
  // const infoBtnRef = useRef();
  // const rankingBtnRef = useRef();
  // const postseasonBtnRef = useRef();
  // const awardsBtnRef = useRef();
  // const allstarBtnRef = useRef();

  // const handleNavSelected = (type) => {
  //   if (type === "SCHEDULE") {
  //     scheduleBtnRef.current.className = "navLinks nav_selected";
  //     infoBtnRef.current.className = "navLinks";
  //     rankingBtnRef.current.className = "navLinks";
  //     postseasonBtnRef.current.className = "navLinks";
  //     awardsBtnRef.current.className = "navLinks";
  //     allstarBtnRef.current.className = "navLinks";
  //   } else if (type === "INFO") {
  //     scheduleBtnRef.current.className = "navLinks";
  //     infoBtnRef.current.className = "navLinks nav_selected";
  //     rankingBtnRef.current.className = "navLinks";
  //     postseasonBtnRef.current.className = "navLinks";
  //     awardsBtnRef.current.className = "navLinks";
  //     allstarBtnRef.current.className = "navLinks";
  //   } else if (type === "RANKING") {
  //     scheduleBtnRef.current.className = "navLinks";
  //     infoBtnRef.current.className = "navLinks";
  //     rankingBtnRef.current.className = "navLinks nav_selected";
  //     postseasonBtnRef.current.className = "navLinks";
  //     awardsBtnRef.current.className = "navLinks";
  //     allstarBtnRef.current.className = "navLinks";
  //   } else if (type === "POSTSEASON") {
  //     scheduleBtnRef.current.className = "navLinks";
  //     infoBtnRef.current.className = "navLinks";
  //     rankingBtnRef.current.className = "navLinks";
  //     postseasonBtnRef.current.className = "navLinks nav_selected";
  //     awardsBtnRef.current.className = "navLinks";
  //     allstarBtnRef.current.className = "navLinks";
  //   } else if (type === "AWARDS") {
  //     scheduleBtnRef.current.className = "navLinks";
  //     infoBtnRef.current.className = "navLinks";
  //     rankingBtnRef.current.className = "navLinks";
  //     postseasonBtnRef.current.className = "navLinks";
  //     awardsBtnRef.current.className = "navLinks nav_selected";
  //     allstarBtnRef.current.className = "navLinks";
  //   } else if (type === "ALLSTAR") {
  //     scheduleBtnRef.current.className = "navLinks";
  //     infoBtnRef.current.className = "navLinks";
  //     rankingBtnRef.current.className = "navLinks";
  //     postseasonBtnRef.current.className = "navLinks";
  //     awardsBtnRef.current.className = "navLinks";
  //     allstarBtnRef.current.className = "navLinks nav_selected";
  //   }
  // };

  return (
    <div className="varsity_nav_container">
      {/* Varsity */}
      <Link
        to="/schedule"
        className="navLinks"
        // ref={scheduleBtnRef}
        // onClick={() => handleNavSelected("SCHEDULE")}
      >
        Schedule
      </Link>
      <Link
        to="/info"
        className="navLinks"
        // ref={infoBtnRef}
        // onClick={() => handleNavSelected("INFO")}
      >
        League Info
      </Link>
      <Link
        to="/rankings"
        className="navLinks"
        // ref={rankingBtnRef}
        // onClick={() => handleNavSelected("RANKING")}
      >
        Rankings
      </Link>
      <Link
        to="/postseason"
        className="navLinks"
        // ref={postseasonBtnRef}
        // onClick={() => handleNavSelected("POSTSEASON")}
      >
        Post Season
      </Link>
      <Link
        to="/awards"
        className="navLinks"
        // ref={awardsBtnRef}
        // onClick={() => handleNavSelected("AWARDS")}
      >
        Player Awards
      </Link>
      <Link
        to="/allstar"
        className="navLinks"
        // ref={allstarBtnRef}
        // onClick={() => handleNavSelected("ALLSTAR")}
      >
        All-Star Games
      </Link>
      {/* <a href="" className="navLinks">
        Schdule
      </a>
      <a href="" className="navLinks">
        League Info
      </a>
      <a href="" className="navLinks">
        Post Season
      </a>
      <a href="" className="navLinks">
        Rankings
      </a>
      <a href="" className="navLinks">
        League Leaders
      </a>
      <a href="" className="navLinks">
        Player Awards
      </a>
      <a href="" className="navLinks">
        All-Star Games
      </a>
      <a href="" className="navLinks">
        Team Columbus
      </a>
      <a href="" className="navLinks">
        League History
      </a>
      <a href="" className="navLinks">
        Archives
      </a>
      <a href="" className="navLinks">
        Links
      </a> */}
    </div>
  );
}

export default VarsityNav;
