import React from "react";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google Books Search
      </a>
      <a className="nav-link bg-dark" href="/search">
        Search Page
      </a>
      <a className="nav-link bg-dark" href="/savedlist">
        My Saved Books
      </a>
    </nav>
  );
}

export default Nav;