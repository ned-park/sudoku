export function isValidBoard(board) {
  if (!board) return;
  const sideLength = Math.sqrt(board.length);
  const boxSideLength = Math.sqrt(sideLength);
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
        } else {
          rowSeen.set(board[m * sideLength + n], m * sideLength + n);
        }
      }
      // columns
      if (board[n * sideLength + m] != 0) {
        if (colSeen.has(board[n * sideLength + m])) {
          valid[colSeen.get(board[n * sideLength + m])] = false;
          valid[n * sideLength + m] = false;
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
        } else {
          boxSeen.set(board[boxIdx], boxIdx);
        }
      }
    }
  }

  return valid;
}

export function solutionXor(e, i) {
  return e ^ ((-1) ** i * 3 ** 7 + (((-1) ** (i - 1) * i * i) % 3 ** 7));
}
