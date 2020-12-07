import { config, useSpring } from "@react-spring/web";
import { clamp } from "lodash";
import { useCallback, useEffect } from "react";
import { useGesture } from "react-use-gesture";

export const useYScroll = (bounds, props) => {
  const [{ x }, set] = useSpring(() => ({ position: 0, config: config.slow }));

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
