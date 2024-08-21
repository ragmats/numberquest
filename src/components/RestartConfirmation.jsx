import { useEffect, useRef } from "react";

export default function RestartConfirmation({
  showRestartConfirmation,
  setShowRestartConfirmation,
  endGame,
}) {
  const confRef = useRef(null);

  useEffect(() => {
    const confirmation = confRef.current;

    // Add even listener for a click outside the menu
    if (showRestartConfirmation) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    function handleClickOutside(e) {
      if (confirmation && !confirmation.contains(e.target)) closeConfirmation();
    }
  }, [showRestartConfirmation]);

  useEffect(() => {
    if (showRestartConfirmation) {
      // Close with Escape Key
      window.addEventListener("keydown", closeOnEscape);
      return () => window.removeEventListener("keydown", closeOnEscape);
    }
    function closeOnEscape(e) {
      if (e.key === "Escape") closeConfirmation();
    }
  }, [showRestartConfirmation]);

  function closeConfirmation() {
    setShowRestartConfirmation(false);
  }

  return (
    <div ref={confRef} className="restart-confirmation-container">
      <h2>Are you sure?</h2>
      <p>All progress will lost.</p>
      <div className="btns-container">
        <button className="confirmation-btn" onClick={endGame}>
          Yes
        </button>
        <button className="confirmation-btn" onClick={closeConfirmation}>
          No
        </button>
      </div>
    </div>
  );
}
