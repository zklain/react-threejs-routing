import { a, config } from "@react-spring/three";
import { useSpring } from "@react-spring/web";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useThree } from "react-three-fiber";

// todo: dont change rotation on mobile
const PointerCamera = ({ disabled }) => {
  const ref = useRef();

  const { mouse, size, setDefaultCamera } = useThree();

  const [animation, set] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: config.molasses,
  }));

  useLayoutEffect(() => {
    setDefaultCamera(ref.current);
  }, [setDefaultCamera]);

  useEffect(() => {
    const handleMouseMove = () => {
      set({
        rotation: [
          (mouse.y / size.height) * 80,
          (-mouse.x / size.width) * 80,
          0,
        ],
      });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [size, mouse, disabled, set]);

  return (
    <a.perspectiveCamera
      ref={ref}
      fov={75}
      position={[0, 1, 10]}
      {...animation}
    />
  );
};

export default PointerCamera;
