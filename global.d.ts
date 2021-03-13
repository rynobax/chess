import type { Move, Position } from "./src/types";

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveMoves(startingPosition: Position, moves: Array<Move>): R;
    }
  }
}

export {};
