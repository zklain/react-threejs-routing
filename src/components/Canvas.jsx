import { Box } from "@react-three/drei";
import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Pages from "../pages";
import PointerCamera from "./PointerCamera";

export default ({ colorAnim, containerRef, transition }) => {
  return (
    <Canvas
      invalidateFrameloop
      colorManagement
      concurrent
      camera={{ position: [0, 0, 10] }}
    >
      <ambientLight intensity={1} />
      <spotLight position={[0, 30, 40]} />
      <pointLight position={[0, 5, 0]} intensity={0.9} color="white" />
      <Suspense fallback={<Box />}>
        <PointerCamera />
        <Pages
          transition={transition}
          pageAnims={colorAnim}
          portal={containerRef}
        />
      </Suspense>
    </Canvas>
  );
};

// add background
// add grains effect
