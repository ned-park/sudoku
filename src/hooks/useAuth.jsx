import { useLocalStorage } from "./useLocalStorage";
import { __SITE_PREFIX__ } from "../config";
import { useAuthContext } from "./useAuthContext";

export function useAuth() {
  const { dispatch } = useAuthContext();
  const { setItem, removeItem } = useLocalStorage();

  const login = async (payload) => {
    const res = await fetch(`${__SITE_PREFIX__}/api/users/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    const userPayload = { token: data.token, username: data.user.username, id: data.user.id };
    setItem("user", JSON.stringify(userPayload));
    dispatch({ action: "LOGIN", payload: userPayload });
    return;
  };

  const logout = async () => {
    removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return { login, logout };
}
