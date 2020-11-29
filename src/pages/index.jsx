import { Box, TorusKnot } from '@react-three/drei';
import React, { useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { Route, Switch } from 'wouter';
import PageHeading from '../components/PageHeading';
import Text from '../components/Text';

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
          <Text portal='portal'>STRV</Text>
        </Route>
        <Route path='/'>
          <PageHeading portal={portal}>Box</PageHeading>
          <Box scale={[3, 3, 3]}>
            <meshStandardMaterial color='cyan' />
          </Box>
        </Route>
        <Route path='/knot'>
          <PageHeading portal={portal}>Knot</PageHeading>
          <TorusKnot scale={[1.5, 1.5, 1.5]}>
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
export default Pages;
