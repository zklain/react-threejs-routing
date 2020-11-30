import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/three';
import { TorusKnot } from '@react-three/drei';
import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import Cactus from '../components/Cactus';
import PageHeading from '../components/PageHeading';
import Text from '../components/Text';

const BoxPage = () => {
  const color = useSpring({
    from: { color: 'cyan' },
    to: async (next) => {
      while (1) {
        await next({ color: 'yellow' });
        await next({ color: 'magenta' });
        await next({ color: 'azure' });
        await next({ color: 'salmon' });
        await next({ color: 'chartreuse' });
        await next({ color: 'cyan' });
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
        scale={boxScale}>
        <boxBufferGeometry />
        <a.meshStandardMaterial color={color.color} />
      </a.mesh>
    </group>
  );
};

const Pages = ({ portal = null, pageAnims, transition }) => {
  const [location] = useLocation();

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

          <BoxPage />
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
