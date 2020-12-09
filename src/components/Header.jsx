import React from "react";
import { Link } from "wouter";
import { Navbar } from "./styled";

// todo: custom link
const Header = () => (
  <Navbar>
    <Link style={{ cursor: "none" }} to="/">
      List
    </Link>
    <Link to="/box">Box</Link>
    <Link to="/text">Text</Link>
  </Navbar>
);

export default Header;
