import { Box } from "@react-three/drei";
import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Pages from "../pages";

const Scene = ({ colorAnim, containerRef, transition }) => {
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
        <Pages
          transition={transition}
          pageAnims={colorAnim}
          portal={containerRef}
        />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
// add grains effect
