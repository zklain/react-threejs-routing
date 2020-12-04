import { Box, OrbitControls, PointerLockControls } from "@react-three/drei";
import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Pages from "../pages";

export default ({ colorAnim, containerRef, transition }) => {
  return (
    <Canvas colorManagement concurrent camera={{ position: [0, 0, 10] }}>
      <OrbitControls />
      <ambientLight intensity={1} />
      <spotLight position={[0, 30, 40]} />
      <spotLight position={[-50, 30, 40]} />
      <pointLight position={[0, 20, 0]} color="hotpink" />
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
