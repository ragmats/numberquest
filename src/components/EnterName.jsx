import { useRef } from "react";

export default function EnterName({ setPlayer, advancePlayerLevel, name }) {
  function handleChange(name) {
    setPlayer((currentPlayer) => {
      return { ...currentPlayer, name: name };
    });
  }

  const inputRef = useRef(null);

  function handleClick() {
    if (inputRef.current) {
      // Select the text inside the input element
      inputRef.current.select();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    advancePlayerLevel();
  }

  return (
    <div className="intro-container">
      <p>
        Blue birds sing and the sun shines warm... despite tales told of a
        darkness in this land.
      </p>
      <p>What is your name?</p>
      <form className="name-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          className="input-name"
          ref={inputRef}
          onClick={handleClick}
          onChange={(e) => handleChange(e.target.value)}
          value={name}
        />
        <button>Accept Quest</button>
      </form>
    </div>
  );
}
