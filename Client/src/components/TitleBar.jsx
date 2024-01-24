import React from 'react';
import "./titleBar.css";

function TitleBar({title, subtitle}) {
  return (
    <>
    <div className="title_bar_container">
        <h1>{title}</h1>
        {subtitle !== null && 
        <h3>{subtitle}</h3>
        } 
    </div>
    <div className="title_bar"></div>
    </>
  )
}

export default TitleBar