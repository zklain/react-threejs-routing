import { Plane } from "@react-three/drei";
import React from "react";
import "../materials/WaveMaterial";

const defaultConfig = {
  width: 400,
  height: 30,
  widthSeg: 1000,
  heightSeg: 80,
};

const Waves = ({ time }) => (
  <Plane
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, -3.5, 10]}
    args={Object.values(defaultConfig)}
  >
    <waveMaterial time={time} x={0.35} color="#6b6b6b" />
  </Plane>
);
export default Waves;
