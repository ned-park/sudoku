import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export function useAuthContext() {
  const authContext = useContext(AuthContext);
  return authContext;
}
