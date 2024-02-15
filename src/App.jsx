import { useEffect, useReducer } from "react";
import "./App.css";
import Board from "./components/Board";
import { solutionXor } from "./utilities/board";
import { reducer, reducerDefaults } from "./utilities/reducer";

function App() {
  const [boardStuff, dispatch] = useReducer(reducer, reducerDefaults);

  useEffect(() => {
    if (boardStuff.isLoaded) {
      localStorage.setItem(
        "sudoku",
        JSON.stringify({
          board: boardStuff.board,
          isMutable: boardStuff.isMutable,
          solution: boardStuff.solution.map((e, i) => solutionXor(e, i)),
        })
      );
    }
  }, [boardStuff.board, boardStuff.isLoaded, boardStuff.isMutable, boardStuff.solution]);

  function runWorker() {
    dispatch({ type: "SET_ERROR", err: "" });
    const worker = new window.Worker("./board.js");

    worker.postMessage({});
    worker.onerror = (err) => console.log(err);
    worker.onmessage = (e) => {
      dispatch({ type: "SET_EVERYTHING", isLoaded: true, ...e.data });
      worker.terminate();
    };
  }

  useEffect(() => {
    try {
      const sudoku = JSON.parse(localStorage.getItem("sudoku"));
      if (sudoku) {
        dispatch({
          type: "SET_EVERYTHING",
          board: sudoku.board,
          isMutable: sudoku.isMutable,
          isLoaded: true,
          solution: sudoku.solution.map((e, i) => solutionXor(e, i)),
        });
      } else {
        localStorage.clear("sudoku");
        runWorker();
      }
    } catch (e) {
      console.error(e);
      runWorker();
    }
  }, []);

  return (
    <>
      {!boardStuff.isLoaded ? (
        <h1>Your puzzle is being generated</h1>
      ) : (
        boardStuff.board && (
          <>
            <h1 className="fromRight">Sudoku</h1>
            <section className="container">
              <Board {...boardStuff} dispatch={dispatch} />
            </section>
            <h2 className="fromLeft">
              <a href="https://github.com/ned-park/sudoku">By Ned</a>
            </h2>
          </>
        )
      )}
    </>
  );
}

export default App;
