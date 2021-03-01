import { allValidMoves, makeMove } from "../src/move";
import { fenToPosition } from "../../fen";
import { Move, Position } from "../../types";
import { positionToAscii } from "./util";

// TODO: Move this to different file
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveMoves(startingPosition: Position, moves: Array<Move>): R;
    }
  }
}

expect.extend({
  toHaveMoves(
    expected: Array<Move>,
    startingPosition: Position,
    actual: Array<Move>
  ) {
    const onlyInExpected = expected.filter(
      (e) => !actual.find((a) => e.src === a.src && e.dest === a.dest)
    );
    const onlyInActual = actual.filter(
      (a) => !expected.find((e) => a.src === e.src && a.dest === e.dest)
    );

    const pass = onlyInExpected.length === 0 && onlyInActual.length === 0;

    let message = `In this position: ${positionToAscii(startingPosition)}`;
    message += `expected ${this.utils.printReceived(expected)} `;
    if (onlyInActual.length > 0) {
      message += `to have these positions:\n`;
      onlyInActual.forEach((move) => {
        const newPosition = makeMove(startingPosition, move);
        message += `${JSON.stringify(move)}\n${positionToAscii(newPosition)}\n`;
      });
      if (onlyInExpected.length > 0) {
        message += " and ";
      }
    }
    if (onlyInExpected.length > 0) {
      message += `to not have positions:\n`;
      onlyInExpected.forEach((move) => {
        const newPosition = makeMove(startingPosition, move);
        message += `${JSON.stringify(move)}\n${positionToAscii(newPosition)}\n`;
      });
    }

    return {
      message: () => message,
      pass,
    };
  },
});

it("empty position returns no moves", () => {
  const position = new Array(64).fill(null);
  expect(allValidMoves(position, "dark")).toHaveLength(0);
  expect(allValidMoves(position, "light")).toHaveLength(0);
});

describe("single piece on board", () => {
  it("rook bottom left", () => {
    const position = fenToPosition("8/8/8/8/8/8/8/R7 w - - 0 1");
    expect(allValidMoves(position, "light")).toHaveMoves(position, [
      { src: 56, dest: 0 },
      { src: 56, dest: 8 },
      { src: 56, dest: 16 },
      { src: 56, dest: 24 },
      { src: 56, dest: 32 },
      { src: 56, dest: 40 },
      { src: 56, dest: 48 },
      { src: 56, dest: 57 },
      { src: 56, dest: 58 },
      { src: 56, dest: 59 },
      { src: 56, dest: 60 },
      { src: 56, dest: 61 },
      { src: 56, dest: 62 },
      { src: 56, dest: 63 },
    ]);
  });

  it("rook center", () => {
    const position = fenToPosition("8/8/8/4R3/8/8/8/8 w - - 0 1");
    expect(allValidMoves(position, "light")).toHaveMoves(position, [
      { src: 28, dest: 4 },
      { src: 28, dest: 12 },
      { src: 28, dest: 20 },
      { src: 28, dest: 36 },
      { src: 28, dest: 44 },
      { src: 28, dest: 52 },
      { src: 28, dest: 60 },
      { src: 28, dest: 24 },
      { src: 28, dest: 25 },
      { src: 28, dest: 26 },
      { src: 28, dest: 27 },
      { src: 28, dest: 29 },
      { src: 28, dest: 30 },
      { src: 28, dest: 31 },
    ]);
  });

  it("anywhere on empty board rook can move to 14 squares", () => {
    for (let i = 0; i < 63; i++) {
      const position: Position = new Array(64).fill(null);
      position[i] = { color: "light", type: "rook" };
      expect(allValidMoves(position, "light")).toHaveLength(14);
    }
  });
});
