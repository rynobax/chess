import { Move, Position } from "../types";
import { makeMove } from "./src/move";
import { positionToAscii } from "./tests/util";

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

export {};
