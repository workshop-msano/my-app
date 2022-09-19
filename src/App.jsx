import "./App.css";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";

function App() {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectMovie] = useState("");

  useEffect(() => {
    getMovies();
  }, []);

  async function getMovies() {
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
    setMovies(res.data.getPopularMovies);
  }

  function switchModal() {
    if (!showModal) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }

  const displayMovies = movies.map((movie) => {
    const image = "http://image.tmdb.org/t/p/w154/" + movie.poster_path;
    return (
      <div key={movie.id}>
        <img
          src={image}
          alt="movie"
          onClick={() => {
            console.log(`selected movie-id is ${movie.id}`);
            switchModal();
            setSelectMovie(movie);
          }}
        ></img>
      </div>
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello MOVIES!🍿🥤</p>
      </header>
      <ul>{displayMovies}</ul>
      {showModal && (
        <Modal switchModal={switchModal} selectedMovie={selectedMovie} />
      )}
    </div>
  );
}

export default App;

/*
Web APIを利用して映画のポスターやあらすじを自分のサイトに表示する
https://chocolat5.com/tips/tmdb-api/

映画情報を取得できるTMDb API　画像（poster_path）のサイズは、決まっていた！！
https://qiita.com/kokogento/items/00ffed5c81cdd44cf85b
*/
