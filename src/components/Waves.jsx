import { Plane } from "@react-three/drei";
import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import "../materials/WaveMaterial";

const defaultConfig = {
  width: 400,
  height: 100,
  widthSeg: 1000,
  heightSeg: 1000,
};

const Waves = () => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      // update uniform time
      ref.current.material.time = state.clock.getElapsedTime() * 7.0;
    }
  });

  const [x, setX] = useState();
  return (
    <Plane
      onClick={() => setX(Math.random(0, 1) * Math.random(0, 1) * 50)}
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3.5, 10]}
      args={Object.values(defaultConfig)}
    >
      <waveMaterial x={x} color="#6b6b6b" />
    </Plane>
  );
};
export default Waves;
