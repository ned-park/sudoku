import { createContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

function authReducer(state = { user: null }, action) {
  switch (action.type) {
    case "LOGIN":
      console.log("LOGIN hit");
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
}

const getUser = (getItem, dispatch) => {
  const storedUser = getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : { user: null };
  if (user) return dispatch({ type: "LOGIN", payload: user });
  if (storedUser) return user;
};

export function AuthContextProvider({ children }) {
  const { getItem } = useLocalStorage();
  const [state, dispatch] = useReducer(authReducer, () => getUser(getItem, dispatch));

  useEffect(() => {
    const user = JSON.parse(getItem("user"));
    if (user) dispatch({ type: "LOGIN", payload: user });
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
}
