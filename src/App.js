import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState({});
  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    let res = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query {
            getPopularMovies {
              id
              title
              overview
              poster_path
          }
        }`,
      }),
    });
    res = await res.json();
    setMovies(res.data);
  };
  console.log("movies", movies);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
