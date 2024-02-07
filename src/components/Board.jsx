export default function Board({ board, setBoard, isMutable, isValid }) {
  let tilesToDisplay = new Array(9).fill(0).map(() => new Array(9).fill(""));
  for (let i = 0; i < board.length; i += 9) {
    for (let j = 0; j < 9; j++) {
      tilesToDisplay[i / 9][j] = [
        board[i + j] > 0 ? board[i + j] : "",
        isMutable[i + j],
        isValid[i + j],
      ];
    }
  }

  function updateBoard(e) {
    let idx = e.target.id.split("-")[1];
    setBoard((oldBoard) =>
      oldBoard.map((val, i) => (i == idx ? Number(e.target.value) : val))
    );
  }

  return (
    <div className="board">
      {tilesToDisplay.map((row, m) => (
        <div className="row" key={`row-${m}`}>
          {row.map((col, n) => (
            <input
              id={`square-${9 * m + n}`}
              key={`square-${m}-${n}`}
              className={`square ${isValid[9 * m + n] ? "" : "wrong"}`}
              disabled={!col[1]}
              // placeholder={}
              value={col[0]}
              onChange={(e) => updateBoard(e)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
