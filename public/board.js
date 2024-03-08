onmessage = () => {
  const solution = createFilledPuzzle();
  const board = generatePlayableBoard(solution);
  const isMutable = board.map((e) => e == 0);

  postMessage({
    solution,
    board,
    isMutable,
    history: [],
  });
};

function createFilledPuzzle() {
  const solution = new Array(81).fill(0);
  const seedRow = new Array(9).fill(0).map((_, i) => i + 1);
  randomize(seedRow);
  for (let i = 0; i < seedRow.length; i++) solution[i] = seedRow[i];

  solveBoard(solution, 9);
  return solution;
}

function generatePlayableBoard(solvedBoard, setBoard, setIsMutable) {
  let board = solvedBoard.concat();
  try {
    let removed = [];
    let numToRemove = 45;
    let boardPositions = new Array(board.length).fill(0).map((_, i) => i);
    randomize(boardPositions);

    while (removed.length < numToRemove) {
      let idx = boardPositions.pop();
      if (idx === undefined) throw new Error("no go");
      if (board[idx] == 0) continue;

      removed.push(board[idx]);
      board[idx] = 0;

      if (hasMultipleSolutions(board)) {
        board[idx] = removed.pop();
      }
    }

    return board;
  } catch (e) {
    generatePlayableBoard(solvedBoard, setBoard, setIsMutable);
  }

  return board;
}

function hasMultipleSolutions(board) {
  let solutions = new Set();
  let zeros = [];
  for (let i = 0; i < board.length; i++) if (board[i] == 0) zeros.push(i);

  for (let i = 0; i < zeros.length; i++) {
    let solution = board.concat();
    solveBoard(solution, zeros[i]);
    solveBoard(solution, 0);

    if (solution.every((e) => e != 0)) solutions.add(solution.join());
    if (solutions.size > 1) return true;
  }

  return false;
}

function randomize(array) {
  for (let i = 0; i < array.length * 2; i++) {
    array.sort(() => Math.random() - 0.5);
  }
}

function solveBoard(board, idx) {
  if (idx == board.length) {
    return true;
  }

  if (board[idx] != 0) {
    return solveBoard(board, idx + 1);
  } else {
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    randomize(nums);
    for (const i of nums) {
      if (hasNoConflicts(board, idx, i)) {
        board[idx] = i;
        const hasSolution = solveBoard(board, idx + 1);
        if (hasSolution) return hasSolution;
        board[idx] = 0;
      }
    }
  }

  return false;
}

function hasNoConflicts(board, idx, i) {
  const sideLength = Math.sqrt(board.length);
  const boxSideLength = Math.sqrt(sideLength);
  let r = Math.floor(idx / sideLength);
  let c = idx % sideLength;
  for (let j = 0; j < sideLength; j++) {
    let boxIdx =
      (boxSideLength * Math.floor(r / boxSideLength) +
        Math.floor(j / boxSideLength)) *
        sideLength +
      boxSideLength * Math.floor(c / boxSideLength) +
      (j % boxSideLength);
    if (
      board[r * sideLength + j] == i ||
      board[j * sideLength + c] == i ||
      board[boxIdx] == i
    )
      return false;
  }
  return true;
}
