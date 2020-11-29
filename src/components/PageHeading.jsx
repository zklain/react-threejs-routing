import React from 'react';
import { Html } from '@react-three/drei';
import { Heading } from './styled';

const PageHeading = ({ children, portal = null }) => (
  <Html
    style={{ position: 'absolute', transform: 'translate3d(-50%, 50%, 0)' }}
    className='heading'
    portal={portal}
    zIndexRange={[20, 10]}>
    <Heading>{children}</Heading>
  </Html>
);

export default PageHeading;
