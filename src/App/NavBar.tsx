import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <nav className="NavBar">
    <ul>
      <li>
        <NavLink exact to="/" activeClassName="currentPage">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/projects" activeClassName="currentPage">
          Projects
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" activeClassName="currentPage">
          About
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default NavBar;
