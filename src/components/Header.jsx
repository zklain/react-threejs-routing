import React from "react";
import { Link as WLink, useRoute } from "wouter";
import { Anchor, Navbar } from "./styled";

const Link = (props) => {
  const [active] = useRoute(props.href);
  return (
    <WLink {...props}>
      <Anchor active={active}>{props.children}</Anchor>
    </WLink>
  );
};
// todo: custom link
const Header = () => (
  <Navbar>
    <Link href="/">List</Link>
    <Link href="/box">Box</Link>
    <Link href="/text">Text</Link>
  </Navbar>
);

export default Header;
