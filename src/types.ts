export type Position = Array<Piece | null>;

export type Color = "dark" | "light";

export interface Piece {
  color: Color;
  type: "rook" | "knight" | "bishop" | "queen" | "king" | "pawn";
}

export type Move = { src: number; dest: number };
