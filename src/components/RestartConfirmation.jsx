export default function RestartConfirmation({
  setShowRestartConfirmation,
  endGame,
}) {
  function handleClickNo() {
    setShowRestartConfirmation(false);
  }

  return (
    <div className="restart-confirmation-container">
      <h2>Are you sure?</h2>
      <p>All progress will lost.</p>
      <div className="btns-container">
        <button className="confirmation-btn" onClick={endGame}>
          Yes
        </button>
        <button className="confirmation-btn" onClick={handleClickNo}>
          No
        </button>
      </div>
    </div>
  );
}
