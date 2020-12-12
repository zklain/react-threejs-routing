import { Sphere } from "@react-three/drei";
import React from "react";
import { useFrame } from "react-three-fiber";
import { DoubleSide } from "three";
import "../materials/WaveMaterial";

const JuicySphere = () => {
  const ref = React.useRef(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.material.time = state.clock.getElapsedTime();
    }
  });

  return (
    <Sphere ref={ref} args={[10, 100, 100]}>
      <meshPhongMaterial side={DoubleSide} color="hotpink" />
      <waveMaterial x={50} color="hotpink" />
    </Sphere>
  );
};

export default JuicySphere;
