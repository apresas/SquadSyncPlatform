// import React from 'react'
import "./footer.css";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer_container">
      <div className="footer_content_container">
        <div className="footer_icons_container">
          <a className="footer_icons">
            <FaYoutube />
          </a>
          <a className="footer_icons">
            <FaInstagram />
          </a>
          <a className="footer_icons">
            <FaFacebook />
          </a>
          <a className="footer_icons">
            <FaXTwitter />
          </a>
        </div>
        <div className="footer_links_container">
          <Link to="/" className="footer_link">
            CHC.com
          </Link>
          <a href="" className="footer_link">
            Team Columbus
          </a>
          <Link to="/info" className="footer_link">
            League History
          </Link>
          <Link to="/archive" className="footer_link">
            Archives
          </Link>
          <Link to="/links" className="footer_link">
            Links
          </Link>
          <Link to="/info" className="footer_link">
            About
          </Link>
        </div>
        <span className="footer_links_divider" />
        <div className="footer_legal_container">
          <Link to="/" className="footer_logo_container">
            <img src="../../src/assets/Logos/CHC_logo_V2.svg" alt="CHC Logo" />
          </Link>
          <span className="footer_section_divider" />
          <div className="footer_statement_container">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              voluptas dignissimos eius ipsa fugiat voluptatem nam velit,
              consectetur eos porro dolorem pariatur illo harum beatae
              obcaecati, fugit nisi modi veniam quia magni error itaque animi
              dolore. Tempore a ullam quos at officiis, quisquam accusamus?
              Culpa aspernatur a quisquam voluptates impedit accusamus aliquid
              excepturi provident. Reiciendis minima ratione minus cupiditate
              delectus ab dolorum ipsam dolorem quidem non velit voluptatum
              numquam saepe, optio sint explicabo exercitationem excepturi
              provident nisi! Voluptatem natus impedit ea illo, adipisci
              pariatur molestiae quisquam dolorem consectetur vel nisi id
              deleniti? Nihil recusandae voluptas nostrum porro doloremque
              dolorem facere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
