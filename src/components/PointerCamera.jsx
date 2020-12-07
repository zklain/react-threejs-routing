import { useEffect } from "react";
import { useThree } from "react-three-fiber";

const PointerCamera = () => {
  const { camera, viewport } = useThree();

  // todo: smooth?

  const handleMouseMove = (e) => {
    const x = e.screenX;
    const y = e.screenY;
    camera.rotation.y = (-x / viewport.width) * 0.001;
    camera.rotation.x = (-y / viewport.height) * 0.001;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return null;
};

export default PointerCamera;
