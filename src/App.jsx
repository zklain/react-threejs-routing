import { useTransition } from "@react-spring/core";
import React, { lazy, Suspense, useRef } from "react";
import { useLocation } from "wouter";
import Cursor from "./components/Cursor";
import Header from "./components/Header";

const Canvas = lazy(() => import("./components/Canvas"));

function App() {
  const containerRef = useRef();
  const [location] = useLocation();

  const transition = useTransition(location, {
    from: { position: [30, 0, -20], scale: [0, 0, 0], opacity: 0 },
    enter: { position: [0, 0, 0], scale: [1, 1, 1], opacity: 1 },
    leave: { position: [-30, 0, -10], scale: [0, 0, 0], opacity: 0 },
  });

  return (
    <div className="App">
      <Header />
      {/* <HeadingContainer style={colorAnim} ref={containerRef} /> */}
      <Suspense fallback={<h1>Loading</h1>}>
        <Canvas transition={transition} containerRef={containerRef} />
      </Suspense>
      <Cursor />
    </div>
  );
}

export default App;

// todo: sexy font for list
// todo: loading component
// todo: apply texture on hover
// todo: error boundary
// todo: auto resize canvas
// todo: shadow
// todo: complex scene (add room, models, shadow)
// todo: models served by CDN ?
// todo: optimize imports => mesure bundle size
// todo: use objects as link

// Variation No. 2 single object, different color
// Variation No. 3 single object, or mesh, changing shape with page transition
// todo: scroll page and animate

// TEST \ TRY
// => Next.js (SSR / SSG)
// -> ReactRouter

// version 2.0
// todo: transform object on page transition

// // todo: rotation => create group, pu switch inside the group
// // todo: shapes
