import { useSpring } from "@react-spring/core";
import { a, config } from "@react-spring/three";
import React, { useCallback } from "react";

const BoxPage = () => {
  const color = useSpring({
    from: { color: "cyan" },
    to: async (next) => {
      while (true) {
        await next({ color: "yellow" });
        await next({ color: "magenta" });
        await next({ color: "azure" });
        await next({ color: "salmon" });
        await next({ color: "chartreuse" });
        await next({ color: "cyan" });
      }
    },
    config: config.slow,
  });

  const [anim, set] = useSpring(() => ({
    rotation: [-Math.PI / 3, 0, Math.PI / 3],
    scale: [2.0, 2.0, 2.0],
    config: {
      mass: 2.3,
      tension: 113,
      friction: 20,
    },
  }));

  const setZoom = useCallback(({ current = anim.scale.get() }) => {
    let scale = 2;
    if (current[0] === 2) {
      scale = 5;
    }
    set({
      scale: [scale, scale, scale],
    });
  }, []);

  // todo: useDrag for rotation

  return (
    <group>
      <a.mesh onClick={setZoom} {...anim}>
        <boxBufferGeometry />
        <a.meshStandardMaterial {...color} />
      </a.mesh>
    </group>
  );
};

export default BoxPage;
