import { useEffect, useReducer, useState } from "react";
import "./App.css";
import { solutionXor } from "./utilities/board";
import { reducer, reducerDefaults } from "./utilities/reducer";
import { BoardWrapper } from "./components/BoardWrapper";
import { runWorker } from "./utilities/board";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Header } from "./components/Header";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const [boardStuff, dispatch] = useReducer(reducer, reducerDefaults);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { user } = useAuthContext();

  console.log(user);
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
        runWorker(dispatch);
      }
    } catch (e) {
      console.error(e);
      runWorker(dispatch);
    }
  }, []);

  let content = !boardStuff.isLoaded ? (
    !boardStuff.isWon ? (
      <h1>Your puzzle is being generated</h1>
    ) : (
      <h1>Nice Work!</h1>
    )
  ) : (
    boardStuff.board && (
      <div className="wrapper">
        <h1 className="fromRight">Sudoku</h1>
        <section className="container">
          <BoardWrapper boardStuff={boardStuff} dispatch={dispatch} />
        </section>
        <h2 className="fromLeft">
          <a href="https://github.com/ned-park/sudoku">By Ned</a>
        </h2>
      </div>
    )
  );
  if (showLogin) {
    content = <Login setShowLogin={setShowLogin} />;
  } else if (showSignup) {
    content = <Signup setShowSignup={setShowSignup} />;
  }

  return (
    <>
      <Header setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
      {content}
    </>
  );
}

export default App;
