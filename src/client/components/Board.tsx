import React from "react";
import { Color, Position } from "../../types";
import Square from "./Square";

interface BoardProps {
  position: Position;
}

const Board: React.FC<BoardProps> = ({ position }) => {
  return (
    <div className="Board">
      {position.map((piece, i) => {
        const row = Math.floor(i / 8);
        const col = i % 8;
        const compareVal = row % 2 === 0 ? 1 : 0;
        const color: Color = i % 2 === compareVal ? "dark" : "light";
        return (
          <Square key={i} piece={piece} row={row} col={col} color={color} />
        );
      })}
    </div>
  );
};

export default Board;
