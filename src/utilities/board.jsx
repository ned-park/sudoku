export function isValidBoard(board, setIsValid) {
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

    let boxNums = [];
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
      boxNums.push(boxIdx);
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

export function createPuzzle() {}
