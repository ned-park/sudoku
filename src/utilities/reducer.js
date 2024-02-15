import { isValidBoard } from "./board";

export const reducerDefaults = {
  err: "",
  board: [],
  solution: [],
  isMutable: [],
  isValue: [],
  isLoaded: false,
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
      };
    case "SET_EVERYTHING": {
      return {
        ...state,
        isLoaded: action.isLoaded,
        board: action.board,
        isMutable: action.isMutable,
        solution: action.solution,
        isValid: isValidBoard(action.board),
      };
    }
    default:
      return state;
  }
};
