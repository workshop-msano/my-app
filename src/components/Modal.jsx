import "./Modal.css";

function Modal({ switchModal, selectedMovie }) {
  const image = "http://image.tmdb.org/t/p/w154/" + selectedMovie.poster_path;
  return (
    <div id="overlay">
      <div id="content">
        <img src={image} alt="movie"></img>
        <p>{selectedMovie.title}</p>
        <p>{selectedMovie.overview}</p>
        <button
          onClick={() => {
            switchModal();
          }}
        >
          close
        </button>
      </div>
    </div>
  );
}

export default Modal;

/*
Reactの基礎を学ぶのにモーダルウィンドウはいい教材
https://reffect.co.jp/react/react-modal#i-5
*/
