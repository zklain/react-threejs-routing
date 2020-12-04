import { Dodecahedron, Plane, Text } from "@react-three/drei";
import React from "react";
import { useFrame } from "react-three-fiber";
import "../materials/WaveMaterial";

const WawePlane = ({}) => {
  const ref = React.useRef();

  const [time, setTime] = React.useState(0);

  const [x, setX] = React.useState(0.3);
  // todo: follow mouse

  useFrame((state, delta) => {
    if (ref.current) {
      setTime(time + delta);
      // ref.current.material.uniforms.time += delta;
    }
  });

  return (
    <Plane
      ref={ref}
      position={[0, -15, -20]}
      // args: widht, height, widthSegments, heighSegments
      args={[200, 200, 1000, 1000]}
      rotation={[-Math.PI / 2.0, 0, 0]}
      onClick={() => setX(Math.random() * 5)}
    >
      <waveMaterial attach="material" color="grey" time={time} x={x} />
    </Plane>
  );
};

const GesturesPage = () => {
  return (
    <group>
      {/* <Dodecahedron> */}
      <meshStandardMaterial color="hotpink" />
      {/* </Dodecahedron> */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.6}
        font="./PlayfairDisplay-Italic.ttf"
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Wellen
      </Text>
      <WawePlane />
    </group>
  );
};
export default GesturesPage;
