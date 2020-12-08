import { useEffect } from "react";
import { useThree } from "react-three-fiber";

const PointerCamera = ({ disabled }) => {
  const { camera, mouse, size } = useThree();

  // todo: smooth
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (disabled) return;

      camera.rotation.y = (-mouse.x / size.width) * 80;
      camera.rotation.x = (mouse.y / size.height) * 80;
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [camera.rotation, size, mouse, disabled]);
  return null;
};

export default PointerCamera;
