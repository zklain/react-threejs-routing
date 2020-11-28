import { Box, Html, OrbitControls, Sphere, TorusKnot } from '@react-three/drei';
import React, { Suspense, useState, useRef, useMemo } from 'react';
import { useUpdate, Canvas, useFrame, useLoader } from 'react-three-fiber';
import { Link, Route, Switch } from 'wouter';
import './App.css';
import { Container, Heading, Navbar } from './styled';
import * as THREE from 'three';

const PageHeading = ({ children, portal = null }) => (
  // !FIX: pointer looks don't work when HTML inserted
  <Html
    style={{ width: '100%', height: '100%' }}
    portal={portal}
    zIndexRange={[20, 10]}>
    {/* <Container> */}
    <Heading>{children}</Heading>
    {/* </Container> */}
  </Html>
);

const Text = ({ children }) => {
  const font = useLoader(THREE.FontLoader, 'Fira Code_Regular.json');
  const config = useMemo(() => ({ font, size: 1, height: 0.3, width: 10 }), [
    font,
  ]);
  const mesh = useUpdate(
    (self) => {
      const size = new THREE.Vector3();
      self.geometry.computeBoundingBox();
      self.geometry.boundingBox.getSize(size);
      self.position.x = -size.x / 2;
      self.position.y = -size.y / 2;
    },
    [children]
  );
  return (
    <group>
      <mesh ref={mesh}>
        <textBufferGeometry args={[children, config]} />
        <meshNormalMaterial />
      </mesh>
    </group>
  );
};

const Pages = ({ portal = null }) => {
  const [rotation, setRotation] = useState([Math.PI / 6, Math.PI / 6, 0]);

  useFrame((state, delta) => {
    const rotationSpeed = Math.sin(delta * 0.5);
    setRotation([Math.PI / 6, rotation[1] + rotationSpeed, 0]);
  });

  return (
    <Switch>
      <group rotation={rotation}>
        <Route path='/text'>
          <Text>Juicy Routing</Text>
        </Route>
        <Route path='/'>
          <PageHeading portal={portal}>Box</PageHeading>
          <Box scale={[3, 3, 3]}>
            <meshStandardMaterial color='cyan' />
          </Box>
        </Route>
        <Route path='/sphere'>
          <Sphere>
            <meshStandardMaterial color='magenta' />
          </Sphere>
          <PageHeading>Sphere</PageHeading>
        </Route>
        <Route path='/knot'>
          <PageHeading>Knot</PageHeading>
          <TorusKnot>
            <meshStandardMaterial
              roughness={0.2}
              metalness={0.9}
              color='yellow'
            />
          </TorusKnot>
        </Route>
      </group>
    </Switch>
  );
};

function App() {
  const containerRef = useRef();
  return (
    <div className='App'>
      <Navbar>
        <Link to='/'>Box</Link>
        <Link to='/sphere'>Sphere</Link>
        <Link to='/knot'>Knot</Link>
        <Link to='/text'>text</Link>
      </Navbar>
      <Container>
        <div ref={containerRef} />
      </Container>
      <Canvas concurrent camera={{ position: [0, 0, 10] }}>
        <OrbitControls />
        <ambientLight intensity={1} />
        <spotLight position={[0, 30, 40]} />
        <spotLight position={[-50, 30, 40]} />
        <Suspense fallback={null}>
          <Pages portal={containerRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;

// todo: animations
// todo: different color for page

// todo: shadow
// todo: complex scene (add room, models, shadow)
// todo: load model

// todo: models served by CDN
// todo: add text as ThreeJS text?

// Variation No. 2 single object, different color
// Variation No. 3 single object, or mesh, changing shape with page transition

// TEST \ TRY
// => Next.js (SSR / SSG)
// -> ReactRouter

// !TODO: CHROMATIC ABBERATION!

// version 2.0
// transform object on page transition

// // todo: rotation => create group, pu switch inside the group
// // todo: shapes
