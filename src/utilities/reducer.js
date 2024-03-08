import { isValidBoard } from "./board";

export const reducerDefaults = {
  err: "",
  board: [],
  solution: [],
  isMutable: [],
  isValue: [],
  isLoaded: false,
  isWon: false,
  history: [],
};

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, err: action.err };
    case "SET_IS_LOADED":
      return { ...state, isLoaded: action.isLoaded };
    case "SET_SOLUTION":
      return { ...state, solution: action.solution };
    case "SET_IS_MUTABLE":
      return { ...state, isMutable: state.board.map((e) => e != 0) };
    case "SET_BOARD":
      return {
        ...state,
        board: action.board,
        isValid: isValidBoard(action.board),
        history: [...state.history, action.history],
      };
    case "SET_EVERYTHING": {
      return {
        ...state,
        isLoaded: action.isLoaded,
        board: action.board,
        history: action.history,
        isMutable: action.isMutable,
        solution: action.solution,
        isValid: isValidBoard(action.board),
        isWon: action.isWon,
      };
    }
    case "SET_WON": {
      return {
        ...state,
        isLoaded: false,
        isWon: true,
      };
    }
    case "UNDO": {
      if (state.history.length === 0) return { ...state };
      const { idx, oldValue } = state.history[state.history.length - 1];
      const newBoard = state.board.map((value, i) => (i == idx ? oldValue : value));
      return {
        ...state,
        history: [...state.history.slice(0, state.history.length - 1)],
        isValid: isValidBoard(newBoard),
        board: newBoard,
      };
    }

    default:
      return state;
  }
};
