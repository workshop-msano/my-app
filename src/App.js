import logo from "./logo.svg";
import "./App.css";
require("isomorphic-fetch");

// const axios = require('axios');
// async function test(){
//   const movies = await axios.get("http://localhost:4000/graphql");
//   console.log("movies", movies)
// }
// test();
fetch("http://localhost:4000/graphql", {
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
})
  .then((res) => res.json())
  .then((res) => console.log(res.data));

function App() {
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
