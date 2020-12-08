import { useTransition } from "@react-spring/core";
import React, { lazy, Suspense, useRef } from "react";
import { useLocation } from "wouter";
import Cursor from "./components/Cursor";

/* eslint-disable */
const Canvas = lazy(() => import("./components/Canvas"));
/* eslint-enable */

function App() {
  const containerRef = useRef();
  const [location] = useLocation();

  // const colorAnim = useSpring({
  //   background: location === "/cactus" ? "white" : "black",
  //   color: location === "/cactus" ? "black" : "white",
  // });

  const transition = useTransition(location, {
    from: { position: [30, 0, -20], scale: [0, 0, 0], opacity: 0 },
    enter: { position: [0, 0, 0], scale: [1, 1, 1], opacity: 1 },
    leave: { position: [-30, 0, -10], scale: [0, 0, 0], opacity: 0 },
  });

  return (
    <div className="App">
      {/* <Header style={{ color: colorAnim.color }} /> */}
      {/* <HeadingContainer style={colorAnim} ref={containerRef} /> */}
      <Suspense fallback={<h1>Loading</h1>}>
        <Canvas transition={transition} containerRef={containerRef} />
      </Suspense>
      <Cursor />
    </div>
  );
}

export default App;

// todo: apply texture on hover
// todo: add text
// todo: use reactSpring for animating shader / scene

// todo: error boundary
// todo: no orbitControls, just rotation of the shape

// todo: same shape, only change color

// todo: scroll page and animate
// todo: auto resize canvas
// todo: center text and object (flex?)
// todo: animations
// todo: different color for page

// todo: shadow
// todo: complex scene (add room, models, shadow)
// todo: load model

// todo: models served by CDN ?
// todo: add text as ThreeJS text?

// todo: try text in place
// todo: optimize imports => mesure bundle size
// todo: use objects as link

// Variation No. 2 single object, different color
// Variation No. 3 single object, or mesh, changing shape with page transition

// extra: how does scroll work

// TEST \ TRY
// => Next.js (SSR / SSG)
// -> ReactRouter

// version 2.0
// todo: transform object on page transition

// // todo: rotation => create group, pu switch inside the group
// // todo: shapes
