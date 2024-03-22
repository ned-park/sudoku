import { createContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

function authReducer(state = { user: null }, action) {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
}

export function AuthContextProvider({ children }) {
  const { getItem } = useLocalStorage();
  const [state, dispatch] = useReducer(authReducer, () => {
    try {
      return JSON.parse(getItem("user"));
    } catch (err) {
      return { user: null };
    }
  });

  useEffect(() => {
    const user = JSON.parse(getItem("user"));
    if (user) dispatch({ action: "LOGIN", payload: user });
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
}
