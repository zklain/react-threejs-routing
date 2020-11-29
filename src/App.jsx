import React, { Suspense, useRef } from 'react';
import { OrbitControls, Loader } from '@react-three/drei';
import { Canvas } from 'react-three-fiber';
import { Container as HeadingContainer } from './components/styled';
import Pages from './pages';
import Header from './components/Header';
import { useSpring } from '@react-spring/core';
import { useLocation } from 'wouter';

function App() {
  const containerRef = useRef();
  const [location] = useLocation();

  const colorAnim = useSpring({
    background: location === '/cactus' ? 'white' : 'black',
    color: location === '/cactus' ? 'black' : 'white',
  });

  return (
    <div className='App'>
      <Header style={{ color: colorAnim.color }} />
      <HeadingContainer style={colorAnim} ref={containerRef} />
      <Canvas
        invalidateFrameloop
        colorManagement
        concurrent
        camera={{ position: [0, 0, 10] }}>
        <OrbitControls />
        <ambientLight intensity={1} />
        <spotLight position={[0, 30, 40]} />
        <spotLight position={[-50, 30, 40]} />
        <Suspense fallback={null}>
          <Pages pageAnims={colorAnim} portal={containerRef} />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}

export default App;

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
