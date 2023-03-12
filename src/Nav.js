import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <div>
      <nav className="fill">
        <ul>
          <li className="nav-item-l">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item-center">
            <Link to="/donatepage">DonationHub</Link>
          </li>
          <li className="nav-item-r">
            <Link to="/donate">Donate</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
