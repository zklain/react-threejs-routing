import React, { useMemo } from 'react';
import { FontLoader, Vector3 } from 'three';
import { useLoader, useUpdate } from 'react-three-fiber';

const Text = ({ children }) => {
  const font = useLoader(FontLoader, 'Fira Code_Regular.json');
  const config = useMemo(() => ({ font, size: 1, height: 0.3, width: 10 }), [
    font,
  ]);
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
  return (
    <group>
      <mesh ref={mesh}>
        <textBufferGeometry args={[children, config]} />
        <meshStandardMaterial color='#ef0d33' />
      </mesh>
    </group>
  );
};

export default Text;
