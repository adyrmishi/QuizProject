import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import store from "../../redux/store/store";
import { useSelector } from "react-redux";
import "./QuizResults.css";
import HomeIcon from "@mui/icons-material/Home";

function QuizResults() {
  const [results, setResults] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);

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

    // if (isLoggedIn) {
    //   console.log("here")
    //   const options = {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json",
    //                 "Authorization": localStorage.getItem('token') },
    //   };
    //   await fetch(
    //     `http://localhost:3001/${currentUser.username}/${
    //       data[currentUser.username]
    //     }`,
    //     options
    //   );
    // }
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
    <div role="score">
      <button onClick={() => navigate("/", { replace: true })}>
        <div id="home-icon">
          Home <HomeIcon />
        </div>
      </button>

      <div className="results-section">
        <h1 role="header">Games Scores:</h1>
        {playerResults}

        <button id="go-lrboard" onClick={() => navigate("/Leaderboard")}>
          Go to the Leaderboard
        </button>

        <p id="remember-msg">
          Remember: if you're not logged in, your score won't be counted on the
          leaderboard!
        </p>
      </div>
    </div>
  );
}

export default QuizResults;
