import { useEffect, useRef, useState } from "react";

export default function EnterNameForm({ setPlayer, name, submit, buttonText }) {
  const [errorText, setErrorText] = useState("");
  const inputRef = useRef(null);

  // Show error text if name is too long
  useEffect(() => {
    if (name.length >= 20)
      setErrorText("Name must be less than 20 characters.");
    else setErrorText("");
  }, [name]);

  function handleChange(name) {
    setPlayer((currentPlayer) => {
      return { ...currentPlayer, name: name };
    });
  }

  function handleClick() {
    if (inputRef.current) {
      // Select the text inside the input element
      inputRef.current.select();
    }
  }

  // Only submit name if it meets the length requirements
  function handleSubmit(e) {
    e.preventDefault();
    if (name.length === 0)
      setErrorText("You must enter something... Traveler?");
    else if (name.length < 20) submit();
  }

  return (
    <form className="name-form" onSubmit={(e) => handleSubmit(e)}>
      <input
        className="input-name"
        ref={inputRef}
        onClick={handleClick}
        onChange={(e) => handleChange(e.target.value)}
        value={name}
      />
      <button>{buttonText}</button>
      <p
        className="error-text"
        style={errorText ? { visibility: "visible" } : { visibility: "hidden" }}
      >
        {errorText}
      </p>
    </form>
  );
}
