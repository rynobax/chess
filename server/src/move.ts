import { Color, Position, Move } from "../../types";

export function allMoves(board: Position, color: Color): Array<Move> {
  const moves: Array<Move> = [];
  for (let src = 0; src < board.length; src++) {
    const piece = board[src];
    if (!piece) continue;
    if (piece.color !== color) continue;
    switch (piece.type) {
      case "pawn":
        // forward once
        moves.push({ src, dest: src + (color === "dark" ? 8 : -8) });

        // forward twice
        if (
          (color === "dark" && src < 16) ||
          (color === "light" && src >= 48)
        ) {
          moves.push({ src, dest: src + (color === "dark" ? 16 : -16) });
        }

        // diagonal take (+ en passante)

        // promote

        break;
      case "bishop":
        moves.push(...diagonalMoves(src));
        break;
      case "rook":
        moves.push(...straightMoves(src));
        break;
      case "knight":
        break;
      case "queen":
        moves.push(...diagonalMoves(src));
        moves.push(...straightMoves(src));
        break;
      case "king":
        moves.push({ src, dest: src - 7 });
        moves.push({ src, dest: src - 8 });
        moves.push({ src, dest: src - 9 });
        moves.push({ src, dest: src - 1 });
        moves.push({ src, dest: src + 1 });
        moves.push({ src, dest: src + 7 });
        moves.push({ src, dest: src + 8 });
        moves.push({ src, dest: src + 9 });
        break;
    }
  }
  return moves;
}

function diagonalMoves(src: number): Array<Move> {
  const moves: Array<Move> = [];
  let dest;

  // up left
  dest = src;
  while (dest >= 0) {
    dest -= 9;
    moves.push({ src, dest });
  }

  // up right
  dest = src;
  while (dest >= 0) {
    dest -= 7;
    moves.push({ src, dest });
  }

  // down left
  dest = src;
  while (dest < 64) {
    dest += 7;
    moves.push({ src, dest });
  }

  // down right
  dest = src;
  while (dest < 64) {
    dest += 9;
    moves.push({ src, dest });
  }

  return moves;
}

function straightMoves(src: number) {
  const moves: Array<Move> = [];
  let dest;

  // up
  dest = src;
  while (dest >= 0) {
    dest -= 8;
    moves.push({ src, dest });
  }

  // down
  dest = src;
  while (dest < 64) {
    dest += 8;
    moves.push({ src, dest });
  }

  const minLeft = Math.floor(src / 8) * 8;
  const maxRight = Math.ceil(src / 8) * 8;

  // left
  dest = src;
  while (dest >= minLeft) {
    dest -= 1;
    moves.push({ src, dest });
  }

  // right
  dest = src;
  while (dest <= maxRight) {
    dest += 1;
    moves.push({ src, dest });
  }

  return moves;
}
