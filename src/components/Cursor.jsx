import { useSpring } from "@react-spring/web";
import React, { useCallback, useState } from "react";
import { useGesture } from "react-use-gesture";
import { Cursor as CircleCursor, CursorContainer } from "./styled";

const Cursor = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [dragging, setDragging] = useState(false);

  const [spring, set] = useSpring(() => ({
    scale: 1,
    // opacity: dragging ? 0 : 0.7,
  }));

  const handleMouseMove = useCallback(
    ({ xy: [x, y] }) => {
      setPosition({
        x,
        y,
      });
    },
    [setPosition]
  );

  // todo: different cursor on drag
  useGesture(
    {
      onMouseDown: () => {
        set({
          scale: 0.5,
        });
      },
      onMouseUp: () => {
        set({
          scale: 1,
        });
      },
      onDragStart: () => {
        setDragging(true);
      },
      onDragEnd: () => {
        setDragging(false);
      },
      onMove: handleMouseMove,
    },
    { domTarget: window }
  );

  return (
    <CursorContainer
      style={{
        top: position.y,
        left: position.x,
        transform: `translate3d(-50%, -50%, 0)`,
      }}
    >
      {dragging ? <div /> : <CircleCursor style={spring} />}
    </CursorContainer>
  );
};

export default Cursor;
