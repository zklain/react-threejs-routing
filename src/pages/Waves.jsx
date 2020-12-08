import { a, config } from "@react-spring/three";
import { useSpring } from "@react-spring/web";
import { clamp } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { useGesture } from "react-use-gesture";
import Background from "../components/Background";
import ListItem from "../components/ListItem";
import PointerCamera from "../components/PointerCamera";
import Waves from "../components/Waves";

const ofItems = 5;
const GesturesPage = () => {
  const [time, setTime] = React.useState(0);

  const [dragging, setDragging] = useState(false);
  // todo: paralax
  // todo: infinite scroll
  // todo: page transitions => background stays, content changes
  // todo: init anim => camera zoom
  // todo: camera zoom on mount
  // todo: loading

  // todo: special cursor
  // todo: zoom out on click
  // todo: drag from anywhere
  // todo: bind the scroll event to the page
  // todo: bind drag to some element

  const { viewport } = useThree();
  // const aspect = size.width / viewport.width;

  // items offset
  const offset = useMemo(() => {
    return viewport.width / 2 + 1;
  }, [viewport.width]);

  const bounds = useMemo(() => {
    const half = Math.floor(ofItems / 2);
    return [-offset * half, offset * half];
  }, [offset]);

  const positions = useMemo(() => {
    return [...new Array(ofItems)].map((_, i) => [
      offset * i - Math.floor(ofItems / 2) * offset,
      0,
      2,
    ]);
  }, [offset]);

  const [spring, set] = useSpring(() => ({
    backgroundPosition: [],
    position: [0, 0, 0],
    config: { ...config.molasses, clamp: true },
    // config: { tension: 160, friction: 90, mass: 10, clamp: true },
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
      set({ position: [newX, 0, memo[2]] });
    },
    [bounds, spring.position, set]
  );

  const bind = useGesture(
    {
      onWheel: fun,
      onDrag: fun,
      onMouseDown: () => {
        const pos = spring.position.get();
        set({
          position: [pos[0], pos[1], -1.5],
        });
      },
      onMouseUp: () => {
        const pos = spring.position.get();
        set({
          position: [pos[0], pos[1], 0],
        });
      },
      onDragStart: () => {
        setDragging(true);
      },
      onDragEnd: () => {
        setDragging(false);
      },
    },
    { domTarget: window, drag: { delay: 10, filterTaps: true } }
  );
  useEffect(() => {
    window && bind();
  }, [bind]);

  useFrame((_, delta) => {
    setTime(time + delta);
  });

  return (
    <a.group>
      <PointerCamera disabled={dragging} />
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
