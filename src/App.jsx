import "./App.css";
import { useState, useEffect } from "react";
import Select from "react-select";
import Modal from "./components/Modal";
import helper from "./helper";

function App() {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectMovie] = useState("");
  const [options, setOptions] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    getOptions();
    getMovies();
  }, []);

  async function getMovies() {
    let res = "";
    console.log("selectedType", selectedType);
    if (selectedType === "") {
      res = await helper.popular();
    } else {
      res = await helper[selectedType]();

    }
    setMovies(res);
    // setTimeout(() => window.location.reload(), 5000)
  }
  // getMovies();

  // setHasReload(false);
  console.log("selectedType", selectedType);
  console.log("movies", movies);

  function getOptions() {
    let ops = ["", "popular", "top", "upcoming"];
    ops = ops.map((el) => {
      return {
        value: el,
        label: el,
      };
    });
    setOptions(ops);
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
        <div>
          <h1>Movie time🍕🥤</h1>
        </div>
        <div>
          <Select
            options={options}
            onChange={(e) => {
              console.log("e", e);
              setSelectedType(e.value);
            }}
          />
          {/* <label htmlFor="movie-select">Choose a selection</label>
          <select name="movies" id="movie-select">
            <option value="">Please choose an option</option>
            <option value="popularMovies" selected>
              popular movies
            </option>
            <option value="latestMovie">latest movie</option>
            <option value="topRatedMovies">top rated movies</option>
            <option value="upcomingMovies">up coming movies</option>
          </select> */}
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
