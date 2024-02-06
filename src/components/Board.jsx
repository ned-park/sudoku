export default function Board({ board, setBoard, isMutable }) {
  let tilesToDisplay = new Array(9).fill(0).map(() => new Array(9).fill(0));
  for (let i = 0; i < board.length; i += 9) {
    for (let j = 0; j < 9; j++) {
      tilesToDisplay[i / 9][j] = [board[i + j], isMutable[i + j]];
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
              className="square"
              disabled={!col[1]}
              placeholder={col[0]}
              value={col[0]}
              onChange={(e) => updateBoard(e)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
