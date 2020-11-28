/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

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

export const Container = ({ children, bg = '#000' }) => (
  <div
    css={css`
      display: flex;
      position: fixed;
      /* top: -250px; */
      left: 0;
      flex-direction: column;
      width: 100%;
      height: 100vh;
      justify-content: center;
      align-items: center;
      z-index: 00;
      background-color: ${bg};
    `}
    children={children}
  />
);

export const Heading = ({ children }) => (
  <h1
    css={css`
      font-size: 10rem;
      font-family: Arial Black, Helvetica, sans-serif;
      color: transparent;
      -webkit-text-stroke-color: #ffffff;
      -webkit-text-stroke-width: 2px;
      text-transform: uppercase;
      pointer-events: none;
    `}
    children={children}
  />
);
