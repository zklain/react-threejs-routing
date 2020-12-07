import { a } from "@react-spring/three";
import { useSpring } from "@react-spring/web";
import { clamp } from "lodash";
import React, { useCallback, useEffect, useMemo } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { useGesture } from "react-use-gesture";
import Background from "../components/Background";
import ListItem from "../components/ListItem";
import Waves from "../components/Waves";

const ofItems = 5;
const GesturesPage = () => {
  const [time, setTime] = React.useState(0);
  // todo: paralax
  // todo: page transitions => background stays, content changes

  // todo: special cursor
  // todo: zoom out on click
  // todo: drag from anywhere
  // todo: bind the scroll event to the page
  // todo: bind drag to some element

  const { size, viewport } = useThree();
  // const aspect = size.width / viewport.width;

  // items offset
  const offset = useMemo(() => {
    return viewport.width / 2 + 1;
  }, [viewport]);

  const bounds = useMemo(() => {
    const half = Math.floor(ofItems / 2);
    return [-offset * half, offset * half];
  }, [ofItems, offset]);

  const positions = useMemo(() => {
    return [...new Array(ofItems)].map((_, i) => [
      offset * i - Math.floor(ofItems / 2) * offset,
      0,
      2,
    ]);
  }, [offset]);

  // todo: go slow
  const [spring, set] = useSpring(() => ({
    backgroundPosition: [],
    position: [0, 0, 0],
    config: { tension: 160, friction: 90, mass: 10 },
  }));

  const fun = useCallback(
    ({
      xy: [cx, cy],
      previous: [px, py],
      memo = spring.position.get(),
      dragging,
    }) => {
      let newX;
      if (dragging) {
        newX = clamp(memo[0] + cx - px, ...bounds);
      } else {
        newX = clamp(memo[0] + cy - py, ...bounds);
      }
      set({ position: [newX, 0, 0] });
    },
    [bounds, spring.position, set]
  );

  const bind = useGesture({ onWheel: fun, onDrag: fun }, { domTarget: window });
  useEffect(() => {
    window && bind();
  }, [bind]);

  useFrame((_, delta) => {
    setTime(time + delta);
  });

  return (
    <a.group>
      <a.group {...spring}>
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
