import { Color, Position, Move } from "../types";

export function allValidMoves(position: Position, color: Color): Array<Move> {
  const moves: Array<Move> = [];
  for (let src = 0; src < position.length; src++) {
    const piece = position[src];
    if (!piece) continue;
    if (piece.color !== color) continue;
    switch (piece.type) {
      case "pawn":
        const direction = color === "dark" ? 1 : -1;

        // forward once
        const forwardOnce = src + 8 * direction;
        if (!position[forwardOnce]) {
          moves.push({ src, dest: forwardOnce });

          // forward twice
          if (
            (color === "dark" && src < 16) ||
            (color === "light" && src >= 48)
          ) {
            const forwardTwice = src + 16 * direction;
            if (!position[forwardOnce]) moves.push({ src, dest: forwardTwice });
          }
        }

        const takeSquares = [src + 7 * direction, src + 9 * direction];
        for (const dest of takeSquares) {
          if (position[dest]?.color !== color) {
            moves.push({ src, dest });
          }
        }

        // TODO: promote
        // TODO: en passante

        break;
      case "bishop":
        moves.push(...diagonalMoves(src, position, color));
        break;
      case "rook":
        moves.push(...straightMoves(src, position, color));
        break;
      case "knight": {
        let dest: number;
        dest = src - 17;
        if (position[dest]?.color !== color) moves.push({ src, dest });
        dest = src - 15;
        if (position[dest]?.color !== color) moves.push({ src, dest });
        dest = src - 10;
        if (position[dest]?.color !== color) moves.push({ src, dest });
        dest = src - 6;
        if (position[dest]?.color !== color) moves.push({ src, dest });
        dest = src + 17;
        if (position[dest]?.color !== color) moves.push({ src, dest });
        dest = src + 15;
        if (position[dest]?.color !== color) moves.push({ src, dest });
        dest = src + 10;
        if (position[dest]?.color !== color) moves.push({ src, dest });
        dest = src + 6;
        if (position[dest]?.color !== color) moves.push({ src, dest });
        break;
      }
      case "queen":
        moves.push(...diagonalMoves(src, position, color));
        moves.push(...straightMoves(src, position, color));
        break;
      case "king": {
        let dest: number;
        dest = src - 7;
        if (position[dest]?.color !== color) moves.push({ src, dest });
        dest = src - 8;
        if (position[dest]?.color !== color) moves.push({ src, dest });
        dest = src - 9;
        if (position[dest]?.color !== color) moves.push({ src, dest });
        dest = src - 1;
        if (position[dest]?.color !== color) moves.push({ src, dest });
        dest = src + 1;
        if (position[dest]?.color !== color) moves.push({ src, dest });
        dest = src + 7;
        if (position[dest]?.color !== color) moves.push({ src, dest });
        dest = src + 8;
        if (position[dest]?.color !== color) moves.push({ src, dest });
        dest = src + 9;
        if (position[dest]?.color !== color) moves.push({ src, dest });

        // TODO: Castle
        // TODO: Cannot move into check
        break;
      }
    }
  }

  // TODO: might be more efficient to filter earlier
  return moves.filter((m) => m.dest >= 0 && m.dest < 64);
}

function diagonalMoves(
  src: number,
  position: Position,
  color: Color
): Array<Move> {
  const moves: Array<Move> = [];
  let dest;

  // up left
  dest = src;
  while (dest >= 0) {
    dest -= 9;
    const square = position[dest];
    if (square) {
      if (square.color !== color) moves.push({ src, dest });
      break;
    } else {
      moves.push({ src, dest });
    }
  }

  // up right
  dest = src;
  while (dest >= 0) {
    dest -= 7;
    const square = position[dest];
    if (square) {
      if (square.color !== color) moves.push({ src, dest });
      break;
    } else {
      moves.push({ src, dest });
    }
  }

  // down left
  dest = src;
  while (dest < 64) {
    dest += 7;
    const square = position[dest];
    if (square) {
      if (square.color !== color) moves.push({ src, dest });
      break;
    } else {
      moves.push({ src, dest });
    }
  }

  // down right
  dest = src;
  while (dest < 64) {
    dest += 9;
    const square = position[dest];
    if (square) {
      if (square.color !== color) moves.push({ src, dest });
      break;
    } else {
      moves.push({ src, dest });
    }
  }

  return moves;
}

function straightMoves(src: number, position: Position, color: Color) {
  const moves: Array<Move> = [];
  let dest;

  // up
  dest = src;
  while (dest >= 0) {
    dest -= 8;
    const square = position[dest];
    if (square) {
      if (square.color !== color) moves.push({ src, dest });
      break;
    } else {
      moves.push({ src, dest });
    }
  }

  // down
  dest = src;
  while (dest < 64) {
    dest += 8;
    const square = position[dest];
    if (square) {
      if (square.color !== color) moves.push({ src, dest });
      break;
    } else {
      moves.push({ src, dest });
    }
  }

  const minLeft = Math.floor((src + 0.5) / 8) * 8;
  const maxRight = Math.ceil((src + 0.5) / 8) * 8;

  // left
  dest = src - 1;
  while (dest >= minLeft) {
    const square = position[dest];
    if (square) {
      if (square.color !== color) moves.push({ src, dest });
      break;
    } else {
      moves.push({ src, dest });
    }
    dest -= 1;
  }

  // right
  dest = src + 1;
  while (dest < maxRight) {
    const square = position[dest];
    if (square) {
      if (square.color !== color) moves.push({ src, dest });
      break;
    } else {
      moves.push({ src, dest });
    }
    dest += 1;
  }

  return moves;
}

export function makeMove(position: Position, move: Move): Position {
  const newPosition = [...position];
  newPosition[move.dest] = position[move.src];
  newPosition[move.src] = null;
  // TODO: en passant
  // TODO: castling
  // TODO: promoting
  return newPosition;
}
