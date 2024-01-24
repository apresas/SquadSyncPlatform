import React, { useState } from "react";
import "./navBar.css";
import VarsityNav from "./VarsityNav";
// import JVNav from "./JVNav";
import { FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";

function NavBar() {
  const [open, setOpen] = React.useState(false);
  const [currentCategory, setCurrentCategory] = useState("Category");
  let category = "Category";

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    // do something
    setOpen(false);
    category = "Varsity";
    handleCategory();
  };

  const handleMenuTwo = () => {
    // do something
    setOpen(false);
    category = "JV";
    handleCategory();
  };

  const handleCategory = () => {
    setCurrentCategory(category);
    console.log(category);
  };

  return (
    <div className="navbar">
      <div className="navbar_container">
        <Link to="/">
          <div className="nav_logo_container">
            <img
              className="nav_logo"
              src="../../src/assets/Logos/CHC_logo_V2.svg"
              alt="CHC Logo"
            />
            {/* <h1 className="nav_logo_title">CHC</h1> */}
            <img
              src="../../src/assets/Logos/CHC_Wordmark.svg"
              alt="Wordmark"
              className="wordmark"
            />
          </div>
        </Link>
        <div className="nav_links">
          <VarsityNav />
          {/* <JVNav /> */}
        </div>
        {/* <div className="dropdown">
          <button className="dropdown_btn" onClick={handleOpen}>
            {currentCategory}{" "}
            <div className="btn_icon">
              <FaCaretDown />
            </div>
          </button>
          {open ? (
            <ul className="menu">
              <li className="menu-item">
                <button onClick={handleMenuOne}>Varsity</button>
              </li>
              <li className="menu-item">
                <button onClick={handleMenuTwo}>JV</button>
              </li>
            </ul>
          ) : null}
          {open ? <div>Is Open</div> : <div>Is Closed</div>}
        </div> */}
      </div>
    </div>
  );
}

export default NavBar;
