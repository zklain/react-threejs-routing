import React, { useMemo } from "react";
import { useFrame, useLoader, useUpdate } from "react-three-fiber";
import { FontLoader, Vector3 } from "three";

const Text = ({ children }) => {
  const font = useLoader(FontLoader, "/Fira Code_Regular.json");
  const config = useMemo(() => ({ font, size: 3, height: 0.3 }), [font]);
  const mesh = useUpdate(
    (self) => {
      const size = new Vector3();
      self.geometry.computeBoundingBox();
      self.geometry.boundingBox.getSize(size);
      self.position.x = -size.x / 2;
      self.position.y = -size.y / 2;
    },
    [children]
  );

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = 0.2 * Math.cos(state.clock.getElapsedTime());
      mesh.current.rotation.x = 0.5 * Math.cos(state.clock.getElapsedTime());
    }
  });

  // todo: shadow

  return (
    <group>
      <mesh ref={mesh}>
        <textBufferGeometry args={[children, config]} />
        <meshStandardMaterial color="#ef0d33" />
      </mesh>
    </group>
  );
};

export default Text;
