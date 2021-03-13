import type { Move, Position } from "../types";

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveMoves(startingPosition: Position, moves: Array<Move>): R;
    }
  }
}

export {};
