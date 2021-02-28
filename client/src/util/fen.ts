import { Position } from "../types";

// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1

export function fenToPosition(fen: string): Position {
  const position: Position = [];
  for (let i = 0; i < fen.length; i++) {
    const c = fen[i];
    switch (c) {
      case "r":
        position.push({ type: "rook", color: "dark" });
        break;
      case "n":
        position.push({ type: "knight", color: "dark" });
        break;
      case "b":
        position.push({ type: "bishop", color: "dark" });
        break;
      case "k":
        position.push({ type: "king", color: "dark" });
        break;
      case "q":
        position.push({ type: "queen", color: "dark" });
        break;
      case "p":
        position.push({ type: "pawn", color: "dark" });
        break;
      case "R":
        position.push({ type: "rook", color: "light" });
        break;
      case "N":
        position.push({ type: "knight", color: "light" });
        break;
      case "B":
        position.push({ type: "bishop", color: "light" });
        break;
      case "K":
        position.push({ type: "king", color: "light" });
        break;
      case "Q":
        position.push({ type: "queen", color: "light" });
        break;
      case "P":
        position.push({ type: "pawn", color: "light" });
        break;
      case "/":
        break;
      case "1":
        position.push(null);
        break;
      case "2":
        position.push(null);
        position.push(null);
        break;
      case "3":
        position.push(null);
        position.push(null);
        position.push(null);
        break;
      case "4":
        position.push(null);
        position.push(null);
        position.push(null);
        position.push(null);
        break;
      case "5":
        position.push(null);
        position.push(null);
        position.push(null);
        position.push(null);
        position.push(null);
        break;
      case "6":
        position.push(null);
        position.push(null);
        position.push(null);
        position.push(null);
        position.push(null);
        position.push(null);
        break;
      case "7":
        position.push(null);
        position.push(null);
        position.push(null);
        position.push(null);
        position.push(null);
        position.push(null);
        position.push(null);
        break;
      case "8":
        position.push(null);
        position.push(null);
        position.push(null);
        position.push(null);
        position.push(null);
        position.push(null);
        position.push(null);
        position.push(null);
        break;
      case " ":
        return position;
      default:
        throw Error(`Unexpected fen character ${c}`);
    }
  }
  return position;
}
