import React from "react";
import { useFrame } from "react-three-fiber";
import "../materials/JuicyMaterial";
import * as THREE from "three";

const Juicy = () => {
  // todo: set displacement and amplitude propely
  const ref = React.useRef();

  const [displacement, setDisplacement] = React.useState(new Float32Array());

  const [noise, setNoise] = React.useState(new Float32Array());

  React.useLayoutEffect(() => {
    const count = ref.current.geometry.attributes.position.count;
    setDisplacement(new Float32Array(count));
    setNoise(new Float32Array(count));
    // ref.current.material.uniforms.displacement = new THREE.BufferAttribute(
    //   new Float32Array(count),
    //   1
    // );
  }, [ref.current]);

  let time;
  useFrame((_, delta) => {
    time += delta;
    ref.current.rotation.x += 0.05;
    ref.current.material.uniforms.amplitude =
      2.6 * Math.sin(ref.current.rotation.x);

    for (let i = 0; i < displacement.length; i++) {
      displacement[i] = Math.sin(0.1 * i + time);

      noise[i] = Math.random() * 5 + 0.5 * (0.5 - Math.random());
      noise[i] = THREE.MathUtils.clamp(noise[i], -5, 5);

      displacement[i] += noise[i];
    }
    // todo: check with the instanced
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereBufferGeometry args={[3, 128, 64]} />
        {/* <meshStandardMaterial color="hotpink" /> */}
        <juicyMaterial displacement={displacement} color="hotpink" />
      </mesh>
    </group>
  );
};

export default Juicy;
