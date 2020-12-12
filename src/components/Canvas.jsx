import { Box, OrbitControls } from "@react-three/drei";
import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Background from "../components/Background";
import Pages from "../pages/Routes";

const Scene = ({ containerRef, transition }) => {
  return (
    <Canvas
      // invalidateFrameloop
      colorManagement
    >
      <ambientLight intensity={1} />
      <spotLight position={[0, 30, 40]} />
      <pointLight position={[0, 5, 0]} intensity={0.9} color="white" />
      {/* <PointerCamera /> */}
      <OrbitControls />
      <Suspense fallback={<Box />}>
        <Pages transition={transition} portal={containerRef} />
        {/* <Waves /> */}
        <Background />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
// add grains effect
