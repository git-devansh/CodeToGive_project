import React from "react";

function Navbar(props) {
  return (
    <nav className="my-nav-bar-test">
      <h1>
        Salva Vita{" "}
        <span className="my-nav-bar-test-span">{props.pagetype}</span>
      </h1>
    </nav>
  );
}

export default Navbar;
