import { useEffect } from "react";
import { useThree } from "react-three-fiber";

const PointerCamera = () => {
  const { camera, mouse, size } = useThree();

  useEffect(() => {
    const handleMouseMove = (e) => {
      camera.rotation.y = (-mouse.x / size.width) * 80;
      camera.rotation.x = (mouse.y / size.height) * 80;
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [camera.rotation, size, mouse]);
  return null;
};

export default PointerCamera;
