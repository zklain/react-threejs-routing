import { Dodecahedron, Text } from "@react-three/drei";
import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

const ListItem = ({ texture = null, position, name }) => {
  const [color, setColor] = useState("#474747");

  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.005;
    ref.current.rotation.z += 0.0005;
  });

  // todo: apply texture on hover
  // todo: random text position

  return (
    <group position={position}>
      <Text fontSize={1} position={[0, 2.5, 0]}>
        {name}
      </Text>
      <Dodecahedron
        ref={ref}
        scale={[2, 2, 2]}
        onPointerLeave={(e) => {
          e.stopPropagation();
          setColor("#474747");
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setColor("lightgrey");
        }}
      >
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.875} />
      </Dodecahedron>
    </group>
  );
};
export default ListItem;
