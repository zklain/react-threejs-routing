import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import React, { useState } from "react";

const BoxPage = () => {
  const color = useSpring({
    from: { color: "cyan" },
    to: async (next) => {
      while (1) {
        await next({ color: "yellow" });
        await next({ color: "magenta" });
        await next({ color: "azure" });
        await next({ color: "salmon" });
        await next({ color: "chartreuse" });
        await next({ color: "cyan" });
      }
    },
  });

  const [zoom, setZoom] = useState(false);

  const anim = useSpring({
    scale: zoom ? 5.0 : 2.0,
    config: {
      mass: 2.3,
      tension: 113,
      friction: 20,
    },
  });

  const boxScale = anim.scale.to((x) => [x, x, x]);

  return (
    <group>
      <a.mesh
        onClick={() => setZoom(!zoom)}
        rotation={[-Math.PI / 3, 0, Math.PI / 3]}
        // todo: proper type
        scale={boxScale}
      >
        <boxBufferGeometry />
        <a.meshStandardMaterial color={color.color} />
      </a.mesh>
    </group>
  );
};

export default BoxPage;
