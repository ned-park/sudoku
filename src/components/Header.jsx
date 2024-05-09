import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { Logout } from "./Logout";

function Hamburger({ menuOpen }) {
  return (
    <>
      <div className="hamburger">
        <div className="burger burger1"></div>
        <div className="burger burger2"></div>
        <div className="burger burger3"></div>
      </div>

      <style>
        {`
        .burger1 {
          transform: ${menuOpen ? "translateX(75%) rotate(45deg)" : "rotate(0"};
        }
        .burger2 {
          opacity: ${menuOpen ? 0 : 1};
          transform: ${menuOpen ? "translateX(100%)" : "transateX(0)"};
        }
        .burger3 {
          transform: ${menuOpen ? "translateX(75%) rotate(315deg)" : "rotate(0)"};
        }
        .hamburger {
          margin-top: ${menuOpen ? 0 : 1};
          margin-right: ${menuOpen ? 0 : 1};
          passing-rightL 
        }
        `}
      </style>
    </>
  );
}

export function Header({ setShowLogin, setShowSignup, setShowScores }) {
  const { user } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  return (
    <header className="header">
      <nav>
        {menuOpen && (
          <ul className="navLinks">
            <li>
              <button
                onClick={() => {
                  setShowLogin(false);
                  setShowSignup(false);
                  setShowScores(false);
                  setMenuOpen(false);
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
                  setMenuOpen(false);
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
                      setMenuOpen(false);
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
                      setMenuOpen(false);
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
              </>
            )}
          </ul>
        )}
        {
          <div className="menuwrapper" onClick={toggleMenu}>
            <Hamburger menuOpen={menuOpen} />
          </div>
        }
      </nav>
    </header>
  );
}
