import React from "react";
import "./App.css";
import Board from "./components/Board";
import { Position } from "../../types";
import { fenToPosition } from "../../fen";

const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

function App() {
  const position: Position = fenToPosition(START_FEN);
  return (
    <div className="App">
      <Board position={position} />
    </div>
  );
}

export default App;
