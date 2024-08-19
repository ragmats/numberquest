import { useEffect, useRef, useState } from "react";

export default function EnterNameForm({ setPlayer, name, submit, buttonText }) {
  const [tempName, setTempName] = useState(name);
  const [errorText, setErrorText] = useState("");
  const inputRef = useRef(null);

  // Show error text if name is too long
  useEffect(() => {
    if (tempName.length >= 20)
      setErrorText("Name must be less than 20 characters.");
    else setErrorText("");
  }, [tempName]);

  function handleChange(name) {
    setTempName(name);
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
    if (tempName.length === 0)
      setErrorText("You must enter something... Traveler?");
    else if (tempName.length < 20) {
      setPlayer((currentPlayer) => {
        return { ...currentPlayer, name: tempName };
      });
      submit();
    }
  }

  return (
    <form className="name-form" onSubmit={(e) => handleSubmit(e)}>
      <input
        className="input-name"
        ref={inputRef}
        onClick={handleClick}
        onChange={(e) => handleChange(e.target.value)}
        value={tempName}
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
