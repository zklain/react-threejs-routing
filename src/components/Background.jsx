import React from "react";
import { Plane } from "@react-three/drei";

const Background = () => {
  return (
    <Plane args={[100, 100]} position={[0, -3, -20]}>
      <meshStandardMaterial color="#242424" />
    </Plane>
  );
};
export default Background;
