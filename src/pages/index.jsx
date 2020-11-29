import { Box, TorusKnot } from '@react-three/drei';
import React, { useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { Route, Switch, useLocation } from 'wouter';
import PageHeading from '../components/PageHeading';
import Text from '../components/Text';
import Cactus from '../components/Cactus';
import { a, useSpring, useTransition } from '@react-spring/three';

const Pages = ({ portal = null, pageAnims }) => {
  const [rotation, setRotation] = useState([Math.PI / 6, Math.PI / 6, 0]);
  const [location] = useLocation();

  const spring = useSpring({});

  const transition = useTransition(location, {
    from: { position: [30, 0, -20], scale: [0, 0, 0], opacity: 0 },
    enter: { position: [0, 0, 0], scale: [1, 1, 1], opacity: 1 },
    leave: { position: [-30, 0, -10], scale: [0, 0, 0], opacity: 0 },
  });

  useFrame((state, delta) => {
    // const rotationSpeed = Math.sin(delta * 0.5);
    // setRotation([Math.PI / 6, rotation[1] + rotationSpeed, 0]);
  });

  return transition(({ position, scale, opacity }, location) => (
    <a.group position={position} scale={scale}>
      <Switch location={location}>
        <Route path='/cactus'>
          <PageHeading
            animated={{ opacity, color: pageAnims.color }}
            portal={portal}>
            Cactus
          </PageHeading>
          <Cactus />
        </Route>
        <Route path='/text'>
          <Text>STRV</Text>
        </Route>
        <Route path='/'>
          <PageHeading animated={{ opacity }} portal={portal}>
            Box
          </PageHeading>

          <Box scale={[3, 3, 3]}>
            <meshStandardMaterial color='cyan' />
          </Box>
        </Route>
        <Route path='/knot'>
          <PageHeading animated={{ opacity }} portal={portal}>
            Knot
          </PageHeading>
          <TorusKnot scale={[1.5, 1.5, 1.5]}>
            <meshStandardMaterial
              roughness={0.2}
              metalness={0.9}
              color='yellow'
            />
          </TorusKnot>
        </Route>
      </Switch>
    </a.group>
  ));
};
export default Pages;
