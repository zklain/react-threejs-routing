import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useThree } from "react-three-fiber";
import { Vector3 } from "three";
import { useSpring } from "@react-spring/web";
import { a, config } from "@react-spring/three";

const PointerCamera = ({ disabled }) => {
  const ref = useRef();

  const { camera, mouse, size, setDefaultCamera } = useThree();

  const [animation, set] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: config.molasses,
  }));

  useLayoutEffect(() => {
    setDefaultCamera(ref.current);
  }, [setDefaultCamera]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (disabled) return;

      // todo: looool
      camera.rotation.setFromVector3(
        new Vector3(-mouse.x / size.width, mouse.y / size.height, 0)
      );

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
  }, [size, mouse, disabled]);

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
