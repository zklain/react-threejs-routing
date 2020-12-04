import React from "react";
import { Navbar } from "./styled";
import { Link } from "wouter";

const Header = ({ style }) => (
  <Navbar style={style}>
    <Link to="/#1">Waves</Link>
    <Link to="/box">Box</Link>
    <Link to="/text">text</Link>
  </Navbar>
);

export default Header;
