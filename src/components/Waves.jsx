import { Plane } from "@react-three/drei";
import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import "../materials/WaveMaterial";

const defaultConfig = {
  width: 400,
  height: 30,
  widthSeg: 1000,
  heightSeg: 80,
};

const Waves = () => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      // update uniform time
      ref.current.material.time = state.clock.getElapsedTime();
    }
  });
  return (
    <Plane
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3.5, 10]}
      args={Object.values(defaultConfig)}
    >
      <waveMaterial x={0.35} color="#6b6b6b" />
    </Plane>
  );
};
export default Waves;
