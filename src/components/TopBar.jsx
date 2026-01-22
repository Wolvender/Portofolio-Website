import React from "react";
import { NavLink } from "react-router-dom";

export default function TopBar() {
  return (
    <header className="site-top header-top" role="banner">
      <div className="top-boxes">
        <NavLink to="/" className="top-box" aria-label="Portfolio">
          Portfolio
        </NavLink>
        <NavLink to="/projects" className="top-box" aria-label="Projects">
          Projects
        </NavLink>
      </div>
    </header>
  );
}
