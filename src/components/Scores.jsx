import { useAuthContext } from "../hooks/useAuthContext";
import { __SITE_PREFIX__ } from "../config";
import { useEffect, useState } from "react";

export default function Scores() {
  const { user } = useAuthContext();
  const [scores, setScores] = useState({ scores: [], userScores: [] });

  useEffect(() => {
    let attemptsRemaining = 3;
    const getHighScores = async () => {
      const headers = { "Content-type": "application/json" };
      if (user) headers["Authorization"] = `Bearer ${user.token}`;
      try {
        const res = await fetch(`${__SITE_PREFIX__}/api/score`, {
          method: "GET",
          headers,
        });
        if (res.ok) {
          const data = await res.json();
          setScores(data);
        } else {
          throw new Error("Something went wrong please try again");
        }
      } catch (err) {
        console.error(err);
        if (attemptsRemaining > 0) {
          attemptsRemaining--;
          getHighScores();
        }
      }
    };

    getHighScores();
  }, [user]);

  const humanReadableScore = (t) => {
    let out = "";
    let sec = t % 60;
    t -= sec;
    t /= 60;
    let min = t % 60;
    t -= min;
    t /= 60;
    let hr = t;
    if (hr > 0) out += `${hr}h `;
    if (min > 0) out += `${min}m `;
    out += `${sec.toFixed(3)}s`;
    return out;
  };

  return (
    <>
      <section className="margin-top-10rem">
        <h1>High Scores</h1>
        <ol>
          {scores &&
            scores.scores &&
            scores.scores.map((score, idx) => (
              <li key={`${score}${idx}`} className="highscore">
                <span>{`${score.username}`}</span>
                <span>{`${humanReadableScore(score.score)}`}</span>
              </li>
            ))}
        </ol>

        {user && scores && scores.userScores && (
          <>
            <h1>Your Scores</h1>
            <ol>
              {scores.userScores.map((score, idx) => (
                <li key={`${score}${idx}`} className="highscore">
                  <span>{`${score.username}`}</span>
                  <span>{`${humanReadableScore(score.score)}`}</span>
                </li>
              ))}
            </ol>
          </>
        )}
      </section>
    </>
  );
}
