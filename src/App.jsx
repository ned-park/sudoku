import { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import { isValidBoard, solutionXor, createPuzzle } from "./utilities/board";

// function createPuzzle(setBoard, setSolution, setIsMutable) {
//   setBoard("123456789456789123789123456234567891567891234891234567345678912678912345912345678".split("").map(Number));
// }

// function solveBoard(board) {
//   return true;
// }

function App() {
  const [board, setBoard] = useState();
  // (() => {
  //   let arr = new Array(81).fill(0).map((_, i) => ((i + Math.floor(i / 9)) % 9) + 1);
  //   arr[1] = 2; // 2 correct, 3 breaks row and col
  //   arr[2] = 3;
  //   arr[10] = 3;
  //   return arr;
  // })()
  const [solution, setSolution] = useState();
  // use solution for give up
  // new Array(81).fill(0).map((_, i) => i + 1)
  const [isMutable, setIsMutable] = useState(new Array(81).fill(true).map((_, i) => i % 3 != 0));
  const [isValid, setIsValid] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // try {
    //   const data = localStorage.getItem("sudoku");
    //   const previousState = JSON.parse(data);
    //   setSolution(previousState.solution.map((e, i) => solutionXor(e, i)));
    //   setIsMutable(previousState.isMutable);
    //   setBoard(previousState.board);
    // } catch {
    createPuzzle(setBoard, setSolution, setIsMutable);
    // } finally {
    setIsLoaded(true);
    // }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      isValidBoard(board, setIsValid);
      localStorage.setItem(
        "sudoku",
        JSON.stringify({
          board,
          isMutable,
          solution: solution.map((e, i) => solutionXor(e, i)),
        })
      );
    }
  }, [board]);

  return (
    <>
      <h1>Sudoku</h1>
      {board && (
        <section className="container">
          <Board board={board} setBoard={setBoard} isMutable={isMutable} isValid={isValid} />
        </section>
      )}
      <h2>
        <a href="https://github.com/ned-park/sudoku">By Ned</a>
      </h2>
    </>
  );
}

export default App;
