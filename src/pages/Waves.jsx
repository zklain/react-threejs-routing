import { Dodecahedron, Plane, Reflector, Text } from "@react-three/drei";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Vector3 } from "three";
import { useLocation } from "wouter";
import "../materials/WaveMaterial";
import { useSpring, useSprings } from "@react-spring/web";
import { a } from "@react-spring/three";
import { useDrag, useGesture } from "react-use-gesture";

const defaultConfig = {
  width: 400,
  height: 30,
  widthSeg: 1000,
  heightSeg: 80,
};

const WawePlane = ({ width, height, widthSeg, heightSeg }) => {
  const ref = React.useRef();
  const [time, setTime] = React.useState(0);
  const [x, setX] = React.useState(0.3);
  // todo: controls for amplitude
  // todo: follow mouse
  // todo: movement
  // todo: colors

  useFrame((state, delta) => {
    if (ref.current) {
      setTime(time + delta);
    }
  });

  return (
    <Plane
      ref={ref}
      position={[0, -15, -20]}
      args={[width, height, widthSeg, heightSeg]}
      rotation={[-Math.PI / 2.0, 0, 0]}
      onClick={() => setX(Math.random() * 5)}
    >
      <waveMaterial attach="material" color="grey" x={x} time={time} />
    </Plane>
  );
};

// todo: make it reflect light => try extending existing material
const WavesBG = ({ time }) => (
  <Plane
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, -3.5, 10]}
    args={Object.values(defaultConfig)}
  >
    <waveMaterial time={time} x={0.35} color="#6b6b6b" />
  </Plane>
);

const ListItem = ({ texture = null, position, name }) => {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [color, setColor] = useState("grey");

  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.001;
    ref.current.rotation.z += 0.001;
  });

  // const [spring, set] = useSpring(() => ({
  //   position: position,
  //   config: { friction: 50, mass: 1 },
  // }));

  // // todo: useCallback
  // const bind = useGesture({
  //   onDrag: ({ down, movement: [mx, my] }) =>
  //     set({
  //       position: [
  //         down ? mx / aspect : position[0],
  //         down ? my / aspect : position[1],
  //         position[2],
  //       ],
  //     }),
  // });

  // todo: apply texture on hover
  // todo: random text position

  return (
    <a.group position={position}>
      <Text fontSize={1} position={[0, 2.5, 0]}>
        {name}
      </Text>
      {/* <a.mesh
    
      >
        <dodecahedronBufferGeometry />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.3} />
      </a.mesh> */}
      <Dodecahedron
        ref={ref}
        scale={[2, 2, 2]}
        onPointerLeave={(e) => {
          e.stopPropagation();
          setColor("#474747");
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setColor("lightgrey");
        }}
      >
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
      </Dodecahedron>
    </a.group>
  );
};

const offset = 10.0; // recalculate on resize
const ofItems = 5;
const GesturesPage = () => {
  const [time, setTime] = React.useState(0);
  // todo: useGesture
  // todo: paralax
  // todo: page transitions => background stays, content changes

  // todo: special cursor
  // todo: zoom out on click
  // todo: drag from anywhere

  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const [spring, set] = useSpring(() => ({ position: [0, 0, 0] }));

  const gestures = useGesture({
    onDrag: ({ offset: [x, y] }) => set({ position: [x / aspect, 0, 0] }),
    // todo: bind the scroll event to the page
    // todo: bind drag to some element
    onScroll: ({ offset: [x, y] }) => set({ position: [x / aspect, 0, 0] }),
  });

  const positions = useMemo(() => {
    return [...new Array(ofItems)].map((_, i) => [
      offset * i - Math.floor(ofItems / 2) * offset,
      0,
      2,
    ]);
  }, []);

  useFrame((_, delta) => {
    setTime(time + delta);
  });

  return (
    <a.group>
      <a.group {...spring} {...gestures()}>
        {positions.map((position, index) => (
          <ListItem key={index} position={position} name={`item #${index}`} />
        ))}
      </a.group>
      <Reflector>
        <WavesBG time={time} />
      </Reflector>
    </a.group>
  );
};
export default GesturesPage;

// todo: init anim => camera zoom
