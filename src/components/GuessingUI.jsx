export default function GuessingUI({
  level,
  player,
  inputDigit,
  clearGuess,
  clearAnnouncer,
  respond,
  checkGuess,
  isLastLevel,
}) {
  const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <div className="guessing-ui-container">
      <div className="your-guess">{player.guess}</div>
      <div className="number-btns-container">
        {numberButtons.map((numberButton) => {
          return (
            <div key={crypto.randomUUID()}>
              <button
                className="number-btn"
                onClick={() => {
                  inputDigit(numberButton);
                }}
              >
                {numberButton}
              </button>
            </div>
          );
        })}
      </div>
      <div className="guess-btns">
        <button
          onClick={() => {
            clearGuess(level);
            clearAnnouncer();
            if (player.guess) {
              if (isLastLevel) {
                respond(
                  "suggestion",
                  `All is clear now, ${player.name}. Focus your aim!`,
                  `The way is clear, ${player.name}! Find your target!`,
                  `Clear your mind and strike!`
                );
              } else {
                respond(
                  "fellow",
                  `“That’s it, ${player.name}. Clear your mind.”`,
                  `“Clear your mind of everything, ${player.name}.”`,
                  `“Yes, let your mind go blank.”`
                );
              }
            } else if (isLastLevel) {
              respond(
                "suggestion",
                `It’s clear enough. Strike the beast!`,
                `How clear must it be, ${player.name}? Attack!`,
                `Forget clarity! Fight for your life!`
              );
            } else {
              respond(
                "fellow",
                `“Could it be any clearer?”`,
                `“But it’s so clear already, ${player.name}?”`,
                `“${player.name}, what are you trying to do?”`
              );
            }
          }}
        >
          Clear
        </button>
        <button onClick={() => checkGuess()}>{level.action}</button>
      </div>
    </div>
  );
}
