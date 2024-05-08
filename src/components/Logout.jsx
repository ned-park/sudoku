import { useAuth } from "../hooks/useAuth";

export function Logout() {
  const { logout } = useAuth();
  const onSubmit = async () => {
    await logout();
  };

  return <button onClick={onSubmit}>Logout</button>;
}
