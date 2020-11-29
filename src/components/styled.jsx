/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { animated } from '@react-spring/three';
import { forwardRef } from 'react';
export const Navbar = (props) => (
  <nav
    css={css`
      position: fixed;
      top: 1rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      z-index: 1000;
      padding: 20px 30px;
    `}
    {...props}
  />
);

export const Container = forwardRef(({ children, bg = '#000' }, ref) => (
  <div
    ref={ref}
    css={css`
      display: flex;
      position: fixed;
      left: 0;
      flex-direction: column;
      width: 100%;
      height: 30vh;
      justify-content: center;
      align-items: center;
      z-index: 00;
      background-color: ${bg};
      & + div {
        position: relative;
      }
      & .heading {
        position: relative;
      }
    `}
    children={children}
  />
));

export const Heading = ({ children, style }) => (
  <h1
    css={css`
      font-size: 7.5rem;
      font-family: Arial Black, Helvetica, sans-serif;
      color: transparent;
      -webkit-text-stroke-color: #ffffff;
      -webkit-text-stroke-width: 2px;
      text-transform: uppercase;
      pointer-events: none;
      @media only screen and (min-width: 500) {
        font-size: 10rem;
      }
    `}
    style={style}
    children={children}
  />
);

export const HeadingAnimated = animated(Heading);
