import { config, useSpring } from "@react-spring/web";
import { Box } from "@react-three/drei";
import { clamp } from "lodash";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { useGesture, useMove } from "react-use-gesture";
import Pages from "../pages";
import PointerCamera from "./PointerCamera";

/**
 * Use mouse wheel / drag scroll for moving the inifinite list
 *
 * @param {*} bounds
 * @param {*} props
 */
export const useYScroll = (bounds, props) => {
  const [{ x }, set] = useSpring(() => ({ x: 0, config: config.slow }));

  const fun = useCallback(
    ({ xy: [, cy], previous: [, py], memo = x.get() }) => {
      const newY = clamp(memo + cy - py, ...bounds);
      set({ x: newY });
    },
    [bounds, x, set]
  );

  const bind = useGesture({ onWheel: fun, onDrag: fun });
  useEffect(() => {
    props && props.domTarget && bind();
  }, [props, bind]);
  return [x, bind];
};

export const useCameraMouseFollow = () => {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useMove(({ xy: [x, y] }) => set({ x, y }));
  // todo: bind to canvas??
  // todo: check minecraft example (camera)

  useEffect(() => {}, []);
};

export default ({ colorAnim, containerRef, transition }) => {
  // const [spring, set] = useSpring(() => ({ rotation: [0, 0, 0] }));

  // todo: bounds

  // const { size, viewport, camera } = useThree();
  // const aspect = size.width / viewport.width;

  // const [position, setPosition] = useState({ x: 0, y: 0 });

  // get mouse movement
  // move camera with mouse

  return (
    <Canvas
      invalidateFrameloop
      colorManagement
      concurrent
      camera={{ position: [0, 0, 10] }}
    >
      <ambientLight intensity={1} />
      <spotLight position={[0, 30, 40]} />
      {/* <spotLight position={[-50, 30, 40]} /> */}
      <pointLight position={[0, 5, 0]} intensity={0.9} color="white" />
      <Suspense fallback={<Box />}>
        <PointerCamera />
        <Pages
          transition={transition}
          pageAnims={colorAnim}
          portal={containerRef}
        />
      </Suspense>
    </Canvas>
  );
};

// add background
// add grains effect
