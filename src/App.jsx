import "./App.css";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import helper from "./helper"

function App() {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectMovie] = useState("");
  // const [selectType, setSelectType] = useState("");


  useEffect(() => {
    getMovies();
  }, []);

  // useEffect(() => {
  //   setSelectType(document.getElementById("movie-select").value); 

  // }, [])
  //   console.log("selectType", selectType)

  async function getMovies() {
    let res = ""; 
  //   let res = await fetch("/graphql", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       query: `
  //       query {
  //           getPopularMovies {
  //             id
  //             title
  //             overview
  //             poster_path
  //         }
  //       }`,
  //     }),
  //   });
  // res = await res.json();
  res = await helper.getPopularMovies(); 
    setMovies(res);
  }
  console.log("movies", movies)

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
        <div>
        <h1>Movie time🍕🥤</h1>
        </div>
        <div>
        <label htmlFor="movie-select">Choose a selection</label>
        <select name="movies" id="movie-select">
          <option value="">Please choose an option</option>
          <option defaultValue="popularMovies">popular movies</option>
          <option value="latestMovie">latest movie</option>
          <option value="topRatedMovies">top rated movies</option>
          <option value="upcomingMovies">up coming movies</option>
        </select>
        </div>

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
