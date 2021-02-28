import { allValidMoves } from "../src/move";

it("empty position returns no moves", () => {
  const position = new Array(64).fill(null);
  expect(allValidMoves(position, "dark")).toHaveLength(0);
  expect(allValidMoves(position, "light")).toHaveLength(0);
});
