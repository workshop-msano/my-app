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
    getMovies(selectedType);
  }, [selectedType]);

  async function getMovies(stype) {
    let res = "";
    if (stype !== "") {
      res = await helper[stype]();
      setMovies(res);
    }
  }

  function getOptions() {
    let ops = ["", "popular", "top", "upcoming", "latest"];
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

  //styles for react-select
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted gray",
      color: state.isSelected ? "white" : "gray",
      padding: 20,
    }),
  };

  let displayMovies;
  if (Array.isArray(movies)) {
    displayMovies = movies.map((movie) => {
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
  } else {
    displayMovies = (() => {
      return (
        <div>
          <h3>✨The most newly created movie...✨</h3>
          <h1>{movies.title}</h1>
          <p>{movies.overview}</p>
        </div>
      );
    })();
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Mmmovie!🍕🥤</h1>
        </div>
        <div>
          <div style={{ width: "150px", marginBottom: "10px" }}>
            <Select
              styles={customStyles}
              options={options}
              onChange={(e) => {
                console.log("e.value", e.value);
                setSelectedType(e.value);
                getMovies(selectedType);
              }}
            />
          </div>
        </div>
      </header>
      <ul>{displayMovies}</ul>
      {selectedType === "" && <h3>Select category🤪</h3>}
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

React-select
https://react-select.com/home
*/
