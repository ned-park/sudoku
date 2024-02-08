export function isValidBoard(board, setIsValid) {
  if (!board) return;
  const sideLength = Math.sqrt(board.length);
  const boxSideLength = Math.sqrt(sideLength);
  let isValid = true;
  let valid = new Array(board.length).fill(true);

  let rowSeen;
  let colSeen;
  let boxSeen;

  for (let m = 0; m < sideLength; m++) {
    rowSeen = new Map();
    colSeen = new Map();
    boxSeen = new Map();

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
        (n % boxSideLength);
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

  if (setIsValid) setIsValid(valid);
  return isValid;
}

export function solutionXor(e, i) {
  return e ^ ((-1) ** i * 3 ** 7 + (((-1) ** (i - 1) * i * i) % 3 ** 7));
}

export function createPuzzle(setBoard, setSolution, setIsMutable) {
  const solution = new Array(81).fill(0);
  const seedRow = new Array(9).fill(0).map((_, i) => i + 1);
  for (let i = 0; i < 20; i++) {
    seedRow.sort(() => Math.random() - 0.5);
  }
  for (let i = 0; i < seedRow.length; i++) solution[i] = seedRow[i];

  solveBoard(solution, 9);
  setSolution(solution);
  setBoard(solution);
  generateBoard(solution, setBoard, setIsMutable);
  console.log(solution);
}

function generateBoard(solution, setBoard, setIsMutable) {}

function solveBoard(board, idx) {
  if (idx == board.length) {
    return true;
  }

  if (board[idx] != 0) {
    return solveBoard(board, idx + 1);
  } else {
    for (let i = 1; i <= 9; i++) {
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
      (boxSideLength * Math.floor(r / boxSideLength) + Math.floor(j / boxSideLength)) * sideLength +
      boxSideLength * Math.floor(c / boxSideLength) +
      (j % boxSideLength);
    if (board[j * sideLength + c] == i || board[r * sideLength + j] == i || board[boxIdx] == i) return false;
  }
  return true;
}
