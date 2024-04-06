import { useAuthContext } from "../hooks/useAuthContext";
import { Logout } from "./Logout";

export function Header({ setShowLogin, setShowSignup, setShowScores }) {
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
                setShowScores(false);
              }}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setShowScores(true);
                setShowLogin(false);
                setShowSignup(false);
              }}
            >
              Scores
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
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setShowLogin(false);
                    setShowSignup((showSignup) => !showSignup);
                  }}
                >
                  Signup
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
