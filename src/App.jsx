import { useState } from "react";
import "./App.css";
import Board from "./components/Board";

function createPuzzle() {}

function App() {
  const [board, setBoard] = useState(
    new Array(81).fill(0).map((_, i) => i + 1)
  );
  const [isMutable, setMutable] = useState(
    new Array(81).fill(true).map((_, i) => i % 2 == 0)
  );

  createPuzzle(setBoard, setMutable);

  return (
    <>
      {board && (
        <section className="container">
          <Board board={board} setBoard={setBoard} isMutable={isMutable} />
        </section>
      )}
    </>
  );
}

export default App;
