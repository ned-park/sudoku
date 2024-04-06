import { useAuthContext } from "../hooks/useAuthContext";
import { __SITE_PREFIX__ } from "../config";
import { useEffect, useState } from "react";

export default function Scores() {
  const { user } = useAuthContext();
  const [scores, setScores] = useState({ scores: [], userScores: [] });

  useEffect(() => {
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
          console.log({ data });
          setScores(data);
        } else {
          throw new Error("Something went wrong please try again");
        }
      } catch (err) {
        console.error(err);
      }
    };

    getHighScores();
  }, [user]);

  return (
    <>
      <h1>High Scores</h1>
      <ol>
        {scores &&
          scores.scores &&
          scores.scores.map((score, idx) => (
            <li key={`${score}${idx}`}>
              {score.username} {score.score}
            </li>
          ))}
      </ol>

      {scores && scores.userScores && (
        <>
          <h1>Your high scores</h1>
          <ol>
            {scores.userScores.map((score, idx) => (
              <li key={`${score}${idx}`}>
                {score.username} {score.score}
              </li>
            ))}
          </ol>
        </>
      )}
    </>
  );
}
