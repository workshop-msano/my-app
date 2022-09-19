import "./Modal.css";

function Modal({ switchModal, selectedMovie }) {
  return (
    <div id="overlay">
      <div id="content">
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
