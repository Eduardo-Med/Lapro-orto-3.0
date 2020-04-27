import React, { useState } from "react";
import "./styles.css";
import image from "../Ticket/logo.png";

import { menuData } from "./MenuVerticalD";

function NavBar({ componentes }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const handleMenuButtonClick = ({ componentes }) => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div classNameName="div-body">
 <input type="checkbox" id="check"/>

    <header>
      <label for="check">
        <i className="fas fa-bars" id="sidebar_btn"></i>
      </label>
      <div className="left_area">
        <h3>Coding <span>Snow</span></h3>
      </div>
      <div className="right_area">
        <a href="#1" className="logout_btn">Logout</a>
      </div>
    </header>

    <div className="sidebar">
      <center>
        <img src={image} className="profile_image" alt=""/>
        <h4>Jessica</h4>
      </center>
      <a href="#1"><i className="fas fa-desktop"></i><span>Dashboard</span></a>
      <a href="#1"><i className="fas fa-cogs"></i><span>Components</span></a>
      <a href="#1"><i className="fas fa-table"></i><span>Tables</span></a>
      <a href="#1"><i className="fas fa-th"></i><span>Forms</span></a>
      <a href="#1"><i className="fas fa-info-circle"></i><span>About</span></a>
      <a href="#1"><i className="fas fa-sliders-h"></i><span>Settings</span></a>
    </div>


    <div className="content"></div>
    </div>
  );
}

export default NavBar;

/* <div classNameName="menu-buttom" onClick={() => handleMenuButtonClick()}>
             {isSideBarOpen ? (
          <i classNameName="fas fa-times fa-2x"></i>
        ) : (
          <i className="fas fa-bars" id="sidebar_btn"></i>
        )}
      </div> */
