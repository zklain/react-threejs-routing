import { a } from "@react-spring/three";
import { config, useSpring } from "@react-spring/web";
import React, { useCallback, useEffect, useMemo } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { useGesture, useScroll } from "react-use-gesture";
import Background from "../components/Background";
import Waves from "../components/Waves";
import ListItem from "../components/ListItem";
import { useYScroll } from "../hooks/useScroll";
import { clamp } from "lodash";

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
  // todo: bind the scroll event to the page
  // todo: bind drag to some element

  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  // todo: should be counted from ofItems
  const bounds = [-40, 20];

  // todo: go slow
  const [spring, set] = useSpring(() => ({
    position: [0, 0, 0],
    config: config.slow,
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

  // const dragFun = useCallback(({}))

  const bind = useGesture({ onWheel: fun, onDrag: fun }, { domTarget: window });
  useEffect(() => {
    window && bind();
  }, [window, bind]);

  // const gestures = useGesture({
  //   onDrag: ({ offset: [x, y], dragging, previous: [px] }) =>
  //     set({ position: [x / aspect, 0, 0] }),
  //   // onScroll: ({ offset: [x, y] }) => set({ position: [x / aspect, 0, 0] }),
  // });

  // const scroll = useScroll(handler);

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
