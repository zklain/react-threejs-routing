import { Html } from "@react-three/drei";
import React from "react";
import { Heading } from "./styled";

const PageHeading = ({ children, portal = null, animated }) => (
  <Html
    style={{
      position: "absolute",
      transform: "translate3d(-50%, 75%, 0)",
    }}
    className="heading"
    portal={portal}
    zIndexRange={[20, 10]}
  >
    <Heading style={animated}>{children}</Heading>
  </Html>
);

export default PageHeading;
