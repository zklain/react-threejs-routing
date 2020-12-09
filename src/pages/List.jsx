import { a, config } from "@react-spring/three";
import { useSpring } from "@react-spring/web";
import { clamp } from "lodash";
import React, { useCallback, useMemo } from "react";
import { useThree } from "react-three-fiber";
import { useGesture } from "react-use-gesture";
import ListItem from "../components/ListItem";

const ofItems = 5;
const GesturesPage = () => {
  // todo: paralax
  // todo: infinite scroll
  // todo: camera zoom on mount
  // todo: pass list items as children

  const { viewport } = useThree();

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

  useGesture(
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
    },
    { domTarget: window, drag: { delay: 10, filterTaps: true } }
  );

  return (
    <a.group position={[0, -1, 0]}>
      <a.group {...spring}>
        {positions.map((position, index) => (
          <ListItem key={index} position={position} name={`item #${index}`} />
        ))}
      </a.group>
    </a.group>
  );
};
export default GesturesPage;
