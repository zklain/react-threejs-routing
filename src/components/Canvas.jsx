import { Box } from "@react-three/drei";
import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Pages from "../pages";
import Background from "./Background";
import PointerCamera from "./PointerCamera";
import Waves from "./Waves";

const Scene = ({ containerRef, transition }) => {
  return (
    <Canvas
      // invalidateFrameloop
      colorManagement
      concurrent
      camera={{ position: [0, 0, 10] }}
    >
      <ambientLight intensity={1} />
      <spotLight position={[0, 30, 40]} />
      <pointLight position={[0, 5, 0]} intensity={0.9} color="white" />
      <Suspense fallback={<Box />}>
        <Pages transition={transition} portal={containerRef} />
        <Waves />

        <PointerCamera />
        <Background />
        {/* todo: place waves and  BG here */}
        {/* todo: place list to the pages */}
      </Suspense>
    </Canvas>
  );
};

export default Scene;
// add grains effect
