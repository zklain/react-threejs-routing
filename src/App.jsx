import React, { lazy, Suspense, useRef } from 'react';
import { useSpring, useTransition } from '@react-spring/core';
import { Box, OrbitControls } from '@react-three/drei';
import { useLocation } from 'wouter';
import Header from './components/Header';
import { Container as HeadingContainer } from './components/styled';
import Pages from './pages';

const Canvas = lazy(() => import('./components/Canvas'));

function App() {
  const containerRef = useRef();
  const [location] = useLocation();

  const colorAnim = useSpring({
    background: location === '/cactus' ? 'white' : 'black',
    color: location === '/cactus' ? 'black' : 'white',
  });

  const transition = useTransition(location, {
    from: { position: [30, 0, -20], scale: [0, 0, 0], opacity: 0 },
    enter: { position: [0, 0, 0], scale: [1, 1, 1], opacity: 1 },
    leave: { position: [-30, 0, -10], scale: [0, 0, 0], opacity: 0 },
  });

  return (
    <div className='App'>
      <Header style={{ color: colorAnim.color }} />
      <HeadingContainer style={colorAnim} ref={containerRef} />
      <Suspense fallback={<h1>Loading</h1>}>
        <Canvas
          transition={transition}
          colorAnim={colorAnim}
          containerRef={containerRef}
        />
      </Suspense>
    </div>
  );
}

export default App;

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

// todo: models served by CDN
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

// !TODO: CHROMATIC ABBERATION!

// version 2.0
// transform object on page transition

// // todo: rotation => create group, pu switch inside the group
// // todo: shapes
