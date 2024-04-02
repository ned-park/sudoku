import { useAuthContext } from "../hooks/useAuthContext";
import { Logout } from "./Logout";

export function Header({ showLogin, setShowLogin, showSignup, setShowSignup }) {
  const { user } = useAuthContext();
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <button
              onClick={() => {
                setShowLogin(false);
                setShowSignup(false);
              }}
            >
              Home
            </button>
          </li>
          {!user ? (
            <>
              <li>
                <button
                  onClick={() => {
                    setShowLogin((showLogin) => !showLogin);
                    setShowSignup(false);
                  }}
                >
                  {!showLogin ? "Login" : "Back"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setShowLogin(false);
                    setShowSignup((showSignup) => !showSignup);
                  }}
                >
                  {!showSignup ? "Signup" : "Back"}
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Logout />
              </li>
              <li>
                <button>Profile</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
