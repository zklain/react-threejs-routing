import React, { useMemo } from "react";
import { useLoader, useUpdate } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { Detailed } from "@react-three/drei";

const Head = ({ rotation }) => {
  const { nodes } = useLoader(GLTFLoader, "/models/head.glb");

  // const stuff = useMemo(() => {
  //   const geometr;
  // }, [nodes]);

  // const ref = useUpdate(
  //   (self) => {
  //     self.position.set(nodes["FaceBuilderHead"].geometry);
  //   },
  //   [nodes]
  // );

  const stuff = useMemo(() => {
    const geometry = nodes["FaceBuilderHead"].geometry;
    const material = new THREE.PointsMaterial();
    const mesh = new THREE.Points(geometry, material);
  }, [nodes]);

  return (
    <Detailed>
      <mesh>
        <points>
          <torusKnotBufferGeometry />
          {/* <mesh scale={[3, 3, 3]} geometry={} /> */}
          <pointsMaterial attach="material" size={0.001} />
        </points>
      </mesh>
    </Detailed>

    // {/* <mesh
    //   rotation={rotation}
    //   ref={model}
    //   visible
    //   scale={[4, 4, 4]}
    //   geometry={nodes["FaceBuilderHead"].geometry}
    //   geometry={new THREE.Points()}
    // > */}
    // {/* <bufferGeometry args={[nodes["FaceBuilderHead"].geometry]} /> */}
  );
};

// points:
// => geometry
// => material

// todo: try simple object, but have it
export default Head;
