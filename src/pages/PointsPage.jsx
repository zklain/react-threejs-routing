import { Plane } from "@react-three/drei";
import React from "react";
import Head from "../components/Head";

const PointsPage = () => {
  return (
    <group>
      <mesh>
        {/* <points> */}
        {/* <boxBufferGeometry /> */}
        {/* <pointsMaterial color="green" size={0.1} /> */}
        <Head rotation={[0, 0, 0]} />
        {/* </points> */}
      </mesh>
    </group>
  );
};

// todo: animate on scroll
export default PointsPage;
