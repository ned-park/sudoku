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
    if (res.ok) {
      const data = await res.json();
      const userPayload = { token: data.token, username: data.user.username, id: data.user.id };
      setItem("user", JSON.stringify(userPayload));
      dispatch({ type: "LOGIN", payload: userPayload });
      return userPayload;
    } else {
      throw new Error("Something went wrong please try again");
    }
  };

  const logout = async () => {
    removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return { login, logout };
}
