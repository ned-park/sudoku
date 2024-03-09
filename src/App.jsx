import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { solutionXor } from "./utilities/board";
import { reducer, reducerDefaults } from "./utilities/reducer";

function App() {
  const [boardStuff, dispatch] = useReducer(reducer, reducerDefaults);
  const [activeIdx, setActiveIdx] = useState(0);

  const isWinningMove = () => {
    return boardStuff.board.every((n, i) => n == boardStuff.solution[i]);
  };

  const handleArrows = (x, y) => {
    setActiveIdx((active) => (active + y * 9 + x + 81) % 81);
  };

  useEffect(() => {
    if (boardStuff.isLoaded) {
      if (isWinningMove()) {
        localStorage.clear("sudoku");
        dispatch({ type: "SET_WON", isLoaded: false, isWon: true });
        runWorker();
      } else {
        localStorage.setItem(
          "sudoku",
          JSON.stringify({
            board: boardStuff.board,
            isMutable: boardStuff.isMutable,
            solution: boardStuff.solution.map((e, i) => solutionXor(e, i)),
            history: boardStuff.history,
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardStuff.board, boardStuff.isLoaded, boardStuff.history]);

  function runWorker() {
    dispatch({ type: "SET_ERROR", err: "" });
    const worker = new window.Worker("./board.js");

    worker.postMessage({});
    worker.onerror = (err) => console.error(err);
    worker.onmessage = (e) => {
      dispatch({ type: "SET_EVERYTHING", isLoaded: true, ...e.data, isWon: false, history: [] });
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
          isWon: false,
          history: sudoku.history,
        });
      } else {
        localStorage.clear("sudoku");
        runWorker();
      }
    } catch (e) {
      console.error(e);
      runWorker();
    }

    const onKeyDown = (e) => {
      if ((e.ctrlKey && e.key === "z") || e.key === "#") {
        e.preventDefault();
      } else if (e.key === "h") {
        handleArrows(-1, 0);
      } else if (e.key === "l") {
        handleArrows(1, 0);
      } else if (e.key === "k") {
        handleArrows(0, -1);
      } else if (e.key === "j") {
        handleArrows(0, 1);
      }
    };

    const onKeyUp = (e) => {
      if (e.key === "z" || e.key === "#") {
        dispatch({ type: "UNDO" });
      }
    };

    const onClick = (e) => {
      if (e.target.id.startsWith("square-")) {
        setActiveIdx(Number(e.target.id.split("-")[1]));
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      document.addEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (boardStuff.isLoaded) {
      document.getElementById(`square-${activeIdx}`).focus();
    }
  }, [activeIdx, boardStuff.isLoaded]);

  return (
    <>
      {!boardStuff.isLoaded ? (
        !boardStuff.isWon ? (
          <h1>Your puzzle is being generated</h1>
        ) : (
          <h1>Nice Work!</h1>
        )
      ) : (
        boardStuff.board && (
          <>
            <h1 className="fromRight">Sudoku</h1>
            <section className="container">
              <Board {...boardStuff} dispatch={dispatch} activeIdx={activeIdx} />
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
