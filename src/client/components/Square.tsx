import React from "react";
import { Color, Piece } from "../../types";

import BlackBishop from "../images/Chess_bdt45.svg";
import BlackKing from "../images/Chess_kdt45.svg";
import BlackKnight from "../images/Chess_ndt45.svg";
import BlackPawn from "../images/Chess_pdt45.svg";
import BlackQueen from "../images/Chess_qdt45.svg";
import BlackRook from "../images/Chess_rdt45.svg";

import LightBishop from "../images/Chess_blt45.svg";
import LightKing from "../images/Chess_klt45.svg";
import LightKnight from "../images/Chess_nlt45.svg";
import LightPawn from "../images/Chess_plt45.svg";
import LightQueen from "../images/Chess_qlt45.svg";
import LightRook from "../images/Chess_rlt45.svg";

function getImage(piece: Piece) {
  if (piece.color === "dark") {
    switch (piece.type) {
      case "bishop":
        return BlackBishop;
      case "king":
        return BlackKing;
      case "knight":
        return BlackKnight;
      case "pawn":
        return BlackPawn;
      case "queen":
        return BlackQueen;
      case "rook":
        return BlackRook;
    }
  } else {
    switch (piece.type) {
      case "bishop":
        return LightBishop;
      case "king":
        return LightKing;
      case "knight":
        return LightKnight;
      case "pawn":
        return LightPawn;
      case "queen":
        return LightQueen;
      case "rook":
        return LightRook;
    }
  }
}

interface SquareProps {
  piece: Piece | null;
  row: number;
  col: number;
  color: Color;
}

const Square: React.FC<SquareProps> = ({ piece, row, col, color }) => {
  const className = color === "dark" ? "DarkSquare" : "LightSquare";
  return (
    <div
      className={`${className} Square`}
      style={{
        gridColumn: `${col + 1} / ${col + 1}`,
        gridRow: `${row + 1} / ${row + 1}`,
      }}
    >
      {piece ? <img src={getImage(piece)} alt="" className="Piece" /> : null}
    </div>
  );
};

export default Square;
