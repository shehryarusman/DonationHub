import React from "react";
import "./Nav.css";

function Nav() {
  return (
    <div>
      <nav className="fill">
        <ul>
          <li className="nav-item-l">
            <a href="#">Home</a>
          </li>
          <li className="nav-item-center">
            <a href="#">DonationHub</a>
          </li>
          <li className="nav-item-r">
            <a href="#">Donate</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
