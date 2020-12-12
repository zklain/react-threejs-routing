import { animated } from "@react-spring/three";
import { useSpring } from "@react-spring/web";
import React, { useState } from "react";
import { useDrag } from "react-use-gesture";

const DemoPage = () => {
  const [selected, setSelected] = useState(false);

  const animation = useSpring({
    scale: selected ? [4, 4, 4] : [1, 1, 1],
  });

  const [rotationANim, set] = useSpring(() => ({
    rotation: [0, 0, 0],
  }));

  const gestures = useDrag(({ movement: [x, y] }) => {
    set({
      rotation: [y / 20, x / 20, 0],
    });
  });

  return (
    <animated.mesh
      {...gestures()}
      {...rotationANim}
      {...animation}
      onClick={() => setSelected(!selected)}
    >
      <boxBufferGeometry />
      <meshStandardMaterial color="hotpink" />
    </animated.mesh>
  );
};

export default DemoPage;
