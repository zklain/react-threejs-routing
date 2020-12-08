/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { animated } from "@react-spring/web";
import { forwardRef } from "react";
export const Navbar = (props) => (
  <animated.nav
    style={props.style}
    css={css`
      position: fixed;
      top: 1rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1000;
      will-change: color;
      padding: 20px 30px;
    `}
    {...props}
  />
);

export const Container = forwardRef(({ children, bg = "#000", style }, ref) => (
  <animated.div
    ref={ref}
    style={style}
    css={css`
      display: flex;
      position: fixed;
      left: 0;
      flex-direction: column;
      width: 100%;
      height: 100vh;
      justify-content: center;
      align-items: center;
      z-index: 00;
      background-color: ${bg};
      will-change: background-color;
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

// export const AnimatedContainer = animated(Container);

export const Heading = ({ children, style }) => (
  <animated.h1
    style={{
      opacity: style.opacity,
      WebkitTextStrokeColor: style.color,
    }}
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
  >
    {children}
  </animated.h1>
);

export const CursorContainer = ({ style, children }) => (
  <animated.div
    style={style}
    css={css`
      position: absolute;
      z-index: 99999;
      transform: translate3d(-50%, -50%);
      pointer-events: none;
    `}
  >
    {children}
  </animated.div>
);

export const Cursor = ({ style }) => (
  <animated.div
    style={style}
    css={css`
      height: 3rem;
      width: 3rem;
      border: 1px solid white;
      border-radius: 50%;
      opacity: 0.7;
    `}
  />
);
