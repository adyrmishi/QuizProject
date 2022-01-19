import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import store from "../../redux/store/store";
import { useSelector } from "react-redux";

function QuizResults() {
  const [results, setResults] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.currentUser);

  async function fetchResults() {
    const response = await fetch(`http://localhost:3001/results/${id}`);
    const initialData = await response.json();
    const data = initialData.sort(function (a, b) {
      return b.scoreKeeper - a.scoreKeeper;
    });
    // splitting into one object with key:value pairs
    data.forEach((data) => {
      setResults((prevState) => ({
        ...prevState,
        [data.username]: data.scoreKeeper,
      }));
    });

    console.log(store.getState());

    if (isLoggedIn) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      const scoreData = await fetch(
        `http://localhost:3001/${currentUser.username}/${
          data[currentUser.username]
        }`,
        options
      );
    }
  }

  const playerResults = Object.keys(results).map((r) => {
    return (
      <div key={r} value={r}>
        {r}: {results[r]}
      </div>
    );
  });

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div>
      <h1>Games Scores:</h1>
      {playerResults}

      <button onClick={() => navigate("/Leaderboard")}>
        Go to the Leaderboard
      </button>
    </div>
  );
}

export default QuizResults;
