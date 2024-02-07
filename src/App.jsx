import { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";

function createPuzzle() {}

function isValidBoard(board, isMutable, setIsValid) {
  const sideLength = Math.sqrt(board.length);
  const boxSideLength = Math.sqrt(sideLength);
  let isValid = true;
  let valid = new Array(81).fill(true);

  let rowSeen;
  let colSeen;
  let boxSeen;

  for (let m = 0; m < sideLength; m++) {
    rowSeen = new Map();
    colSeen = new Map();
    boxSeen = new Map();

    let boxNums = [];
    for (let n = 0; n < sideLength; n++) {
      // rows
      if (board[m * sideLength + n] != 0) {
        if (rowSeen.has(board[m * sideLength + n])) {
          valid[rowSeen.get(board[m * sideLength + n])] = false;
          valid[m * sideLength + n] = false;
          isValid = false;
        } else {
          rowSeen.set(board[m * sideLength + n], m * sideLength + n);
        }
      }
      // columns
      if (board[n * sideLength + m] != 0) {
        if (colSeen.has(board[n * sideLength + m])) {
          valid[colSeen.get(board[n * sideLength + m])] = false;
          valid[n * sideLength + m] = false;
          isValid = false;
        } else {
          colSeen.set(board[n * sideLength + m], n * sideLength + m);
        }
      }
      // boxes
      let boxIdx =
        Math.floor(m / boxSideLength) * sideLength * boxSideLength +
        Math.floor(n / boxSideLength) * sideLength +
        Math.floor(m % boxSideLength) * boxSideLength +
        (n % 3);
      boxNums.push(boxIdx);
      if (board[boxIdx] != 0) {
        if (boxSeen.has(board[boxIdx])) {
          valid[boxSeen.get(board[boxIdx])] = false;
          valid[boxIdx] = false;
          isValid = false;
        } else {
          boxSeen.set(board[boxIdx], boxIdx);
        }
      }
    }
  }

  setIsValid(valid);
  return isValid;
}

function App() {
  const [board, setBoard] = useState(
    // (() => {
    //   let arr = new Array(81).fill(0).map((_, i) => ((i + Math.floor(i / 9)) % 9) + 1);
    //   arr[1] = 2; // 2 correct, 3 breaks row and col
    //   arr[2] = 3;
    //   arr[10] = 3;
    //   return arr;
    // })()
    "123456789456789123789123456234567891567891234891234567345678912678912345912345678".split("").map(Number)
  );
  const [solution, setSolution] = useState(
    // use solution for give up
    new Array(81).fill(0).map((_, i) => i + 1)
  );
  const [isMutable, seIsMutable] = useState(new Array(81).fill(true).map((_, i) => i % 3 != 0));
  const [isValid, setIsValid] = useState(new Array(81).fill(true).map((_, i) => i % 3 == 2));

  useEffect(() => {
    createPuzzle(setSolution, setBoard, seIsMutable);
  }, []);

  useEffect(() => {
    isValidBoard(board, isMutable, setIsValid);
  }, [board]);

  return (
    <>
      {board && (
        <section className="container">
          <Board board={board} setBoard={setBoard} isMutable={isMutable} isValid={isValid} />
        </section>
      )}
    </>
  );
}

export default App;
