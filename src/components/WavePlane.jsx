import { Plane } from "@react-three/drei";
import React from "react";
import { useFrame } from "react-three-fiber";

const WawePlane = ({ width, height, widthSeg, heightSeg }) => {
  const ref = React.useRef();
  const [time, setTime] = React.useState(0);
  const [x, setX] = React.useState(0.3);
  // todo: controls for amplitude
  // todo: follow mouse
  // todo: movement
  // todo: colors

  useFrame((state, delta) => {
    if (ref.current) {
      setTime(time + delta);
    }
  });

  return (
    <Plane
      ref={ref}
      position={[0, -15, -20]}
      args={[width, height, widthSeg, heightSeg]}
      rotation={[-Math.PI / 2.0, 0, 0]}
      onClick={() => setX(Math.random() * 5)}
    >
      <waveMaterial attach="material" color="grey" x={x} time={time} />
    </Plane>
  );
};

export default WawePlane;
