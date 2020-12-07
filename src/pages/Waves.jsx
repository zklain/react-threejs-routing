import { a } from "@react-spring/three";
import { useSpring } from "@react-spring/web";
import React, { useMemo } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { useGesture } from "react-use-gesture";
import Background from "../components/Background";
import Waves from "../components/Waves";
import ListItem from "../components/ListItem";

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
    onDrag: ({ offset: [x, y], dragging }) =>
      set({ position: [x / aspect, 0, 0] }),
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
      <Waves time={time} />
      <Background />
    </a.group>
  );
};
export default GesturesPage;

// todo: init anim => camera zoom
