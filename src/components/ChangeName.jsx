import EnterNameForm from "./EnterNameForm";
import CloseX from "./CloseX";
import { useEffect, useRef } from "react";

export default function ChangeName({
  showChangeName,
  setShowChangeName,
  setPlayer,
  name,
}) {
  const changeNameRef = useRef(null);

  useEffect(() => {
    const changeName = changeNameRef.current;

    // Add even listener for a click outside the menu
    if (showChangeName) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    function handleClickOutside(e) {
      if (changeName && !changeName.contains(e.target)) closeChangeName();
    }
  }, [showChangeName]);

  useEffect(() => {
    if (showChangeName) {
      // Close with Escape Key
      window.addEventListener("keydown", closeOnEscape);
      return () => window.removeEventListener("keydown", closeOnEscape);
    }
    function closeOnEscape(e) {
      if (e.key === "Escape") closeChangeName();
    }
  }, [showChangeName]);

  function submit() {
    closeChangeName();
  }

  function closeChangeName() {
    setShowChangeName(false);
  }

  return (
    <div ref={changeNameRef} className="change-name-container">
      <h3>What is your name?</h3>
      <CloseX handleClose={closeChangeName} />
      <EnterNameForm
        setPlayer={setPlayer}
        name={name}
        submit={submit}
        buttonText="Save Name"
      />
    </div>
  );
}
