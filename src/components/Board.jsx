export default function Board({ dispatch, board, isValid, isMutable }) {
  function updateBoard(e) {
    let idx = e.target.id.split("-")[1];
    let newValue = e.target.value >= 1 && e.target.value <= 9 ? Number(e.target.value) : 0;
    dispatch({ type: "SET_BOARD", board: board.map((value, i) => (i == idx ? newValue : value)) });
  }

  return (
    <div className="board">
      {board.map((sq, m) => (
        <input
          id={`square-${m}`}
          key={`square-${m}`}
          className={`square ${isValid[m] ? "" : "wrong"} ${
            Math.floor((m - (m % 9) + 9) % 27) != 0 ? "" : "boxbottom"
          }`}
          disabled={!isMutable[m]}
          value={sq != 0 ? sq : ""}
          onChange={(e) => updateBoard(e)}
        />
      ))}
    </div>
  );
}
