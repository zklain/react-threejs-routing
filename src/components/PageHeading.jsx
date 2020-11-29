import React from 'react';
import { Html } from '@react-three/drei';
import { Heading, HeadingAnimated } from './styled';

const PageHeading = ({ children, portal = null, animated }) => (
  // todo: animated heading
  <Html
    style={{ position: 'absolute', transform: 'translate3d(-50%, 50%, 0)' }}
    className='heading'
    portal={portal}
    zIndexRange={[20, 10]}>
    <HeadingAnimated style={animated}>{children}</HeadingAnimated>
  </Html>
);

export default PageHeading;
