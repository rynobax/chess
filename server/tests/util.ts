import { Piece, Position } from "../../types";

const HORIZONTAL_LINE = `+${new Array(31).fill("-").join("")}+`;
export function positionToAscii(position: Position) {
  let s = `\n${HORIZONTAL_LINE}\n`;
  for (let rank = 0; rank < 8; rank++) {
    s += "|";
    for (let file = 0; file < 8; file++) {
      const square = rank * 8 + file;
      const piece = position[square];
      if (piece) {
        s += ` ${getPieceAscii(piece)} |`;
      } else {
        s += "   |";
      }
    }
    s += `\n${HORIZONTAL_LINE}\n`;
  }
  return s;
}

function getPieceAscii(piece: Piece) {
  if (piece.color === "dark") {
    switch (piece.type) {
      case "bishop":
        return "b";
      case "king":
        return "k";
      case "knight":
        return "n";
      case "pawn":
        return "p";
      case "queen":
        return "q";
      case "rook":
        return "r";
    }
  } else {
    switch (piece.type) {
      case "bishop":
        return "B";
      case "king":
        return "K";
      case "knight":
        return "N";
      case "pawn":
        return "P";
      case "queen":
        return "Q";
      case "rook":
        return "R";
    }
  }
}

// doesnt work for terminal because unicode characters take up two squares
function getPieceUnicode(piece: Piece) {
  if (piece.color === "dark") {
    switch (piece.type) {
      case "bishop":
        return "♝";
      case "king":
        return "♚";
      case "knight":
        return "♞";
      case "pawn":
        return "♟︎";
      case "queen":
        return "♛";
      case "rook":
        return "♜";
    }
  } else {
    switch (piece.type) {
      case "bishop":
        return "♗";
      case "king":
        return "♔";
      case "knight":
        return "♘";
      case "pawn":
        return "♙";
      case "queen":
        return "♕";
      case "rook":
        return "♖";
    }
  }
}
