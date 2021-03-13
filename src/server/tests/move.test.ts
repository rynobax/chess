import { allValidMoves } from "../move";
import { fenToPosition } from "../../fen";
import { Position } from "../../types";

it("empty position returns no moves", () => {
  const position = new Array(64).fill(null);
  expect(allValidMoves(position, "dark")).toHaveLength(0);
  expect(allValidMoves(position, "light")).toHaveLength(0);
});

const sq = (row: number, col: number) => row - 1 + (col - 1) * 8;

/**
 *  0  1  2  3  4  5  6  7
 *  8  9 10 11 12 13 14 15
 * 16 17 18 19 20 21 22 23
 * 24 25 26 27 28 29 30 31
 * 32 33 34 35 36 37 38 39
 * 40 41 42 43 44 45 46 47
 * 48 49 50 51 52 53 54 55
 * 56 57 58 59 60 61 62 63
 */

describe("single piece on board", () => {
  describe("rook", () => {
    it("rook bottom left", () => {
      const position = fenToPosition("8/8/8/8/8/8/8/R7 w - - 0 1");
      const src = sq(1, 8);
      expect(allValidMoves(position, "light")).toHaveMoves(position, [
        { src, dest: sq(1, 1) },
        { src, dest: sq(1, 2) },
        { src, dest: sq(1, 3) },
        { src, dest: sq(1, 4) },
        { src, dest: sq(1, 5) },
        { src, dest: sq(1, 6) },
        { src, dest: sq(1, 7) },
        { src, dest: sq(2, 8) },
        { src, dest: sq(3, 8) },
        { src, dest: sq(4, 8) },
        { src, dest: sq(5, 8) },
        { src, dest: sq(6, 8) },
        { src, dest: sq(7, 8) },
        { src, dest: sq(8, 8) },
      ]);
    });

    it("rook center", () => {
      const position = fenToPosition("8/8/8/4R3/8/8/8/8 w - - 0 1");
      const src = sq(5, 4);
      expect(allValidMoves(position, "light")).toHaveMoves(position, [
        { src, dest: sq(5, 1) },
        { src, dest: sq(5, 2) },
        { src, dest: sq(5, 3) },
        { src, dest: sq(5, 5) },
        { src, dest: sq(5, 6) },
        { src, dest: sq(5, 7) },
        { src, dest: sq(5, 8) },
        { src, dest: sq(1, 4) },
        { src, dest: sq(2, 4) },
        { src, dest: sq(3, 4) },
        { src, dest: sq(4, 4) },
        { src, dest: sq(6, 4) },
        { src, dest: sq(7, 4) },
        { src, dest: sq(8, 4) },
      ]);
    });

    describe("anywhere on empty board rook can move to 14 squares", () => {
      it.each(new Array(64).fill(0).map((_, i) => [i]))("Square %i", (i) => {
        const position: Position = new Array(64).fill(null);
        position[i] = { color: "light", type: "rook" };
        expect(allValidMoves(position, "light")).toHaveLength(14);
      });
    });
  });

  describe("bishop", () => {
    it("bishop bottom left", () => {
      const position = fenToPosition("8/8/8/8/8/8/8/B7 w - - 0 1");
      const src = sq(1, 8);
      expect(allValidMoves(position, "light")).toHaveMoves(position, [
        { src, dest: sq(2, 7) },
        { src, dest: sq(3, 6) },
        { src, dest: sq(4, 5) },
        { src, dest: sq(5, 4) },
        { src, dest: sq(6, 3) },
        { src, dest: sq(7, 2) },
        { src, dest: sq(8, 1) },
      ]);
    });

    it("bishop center", () => {
      const position = fenToPosition("8/8/8/4B3/8/8/8/8 w - - 0 1");
      const src = sq(5, 4);
      expect(allValidMoves(position, "light")).toHaveMoves(position, [
        // up left
        { src, dest: sq(4, 3) },
        { src, dest: sq(3, 2) },
        { src, dest: sq(2, 1) },
        // down left
        { src, dest: sq(4, 5) },
        { src, dest: sq(3, 6) },
        { src, dest: sq(2, 7) },
        { src, dest: sq(1, 8) },
        // up right
        { src, dest: sq(6, 3) },
        { src, dest: sq(7, 2) },
        { src, dest: sq(8, 1) },
        // down right
        { src, dest: sq(6, 5) },
        { src, dest: sq(7, 6) },
        { src, dest: sq(8, 7) },
      ]);
    });

    describe("anywhere on empty board bishop can move between 7 and 13 squares", () => {
      it.each(new Array(64).fill(0).map((_, i) => [i]))("Square %i", (i) => {
        const position: Position = new Array(64).fill(null);
        position[i] = { color: "light", type: "bishop" };
        const len = allValidMoves(position, "light").length;
        expect(len).toBeGreaterThanOrEqual(7);
        expect(len).toBeLessThanOrEqual(13);
      });
    });
  });
});
