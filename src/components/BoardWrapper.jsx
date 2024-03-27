import Board from "./Board";
import { isWinningMove, runWorker, solutionXor } from "../utilities/board";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEventListener } from "../hooks/useEventListener";
import { onKeyDown, onKeyUp, onClick } from "../utilities/events";

export function BoardWrapper({ boardStuff, dispatch }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const { setItem, removeItem } = useLocalStorage();

  useEffect(() => {
    if (!boardStuff.isLoaded) return;
    if (isWinningMove(boardStuff.board, boardStuff.solution)) {
      removeItem("sudoku");
      dispatch({ type: "SET_WON", isLoaded: false, isWon: true });
      runWorker(dispatch);
    } else {
      setItem(
        "sudoku",
        JSON.stringify({
          board: boardStuff.board,
          isMutable: boardStuff.isMutable,
          solution: boardStuff.solution.map((e, i) => solutionXor(e, i)),
          history: boardStuff.history,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardStuff.board, boardStuff.isLoaded, boardStuff.history]);

  useEventListener("keydown", (e) => onKeyDown(e, setActiveIdx));
  useEventListener("keyup", (e) => onKeyUp(e, dispatch));
  useEventListener("click", (e) => onClick(e, setActiveIdx));

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
            <Board {...boardStuff} dispatch={dispatch} activeIdx={activeIdx} />
          </>
        )
      )}
    </>
  );
}
