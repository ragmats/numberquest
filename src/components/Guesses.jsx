export default function Guesses({ guesses, number, max, lives }) {
  // console.log(guesses);
  return (
    <div className="guesses">
      <span>(1-{max})</span>
      {console.log("lives: ", lives)}
      {guesses.length > 0 && lives >= 1 ? (
        <>
          {guesses.map((guess) => {
            return (
              <span key={crypto.randomUUID()}>
                {/* {guess > number ? "🠇" : "🠅"} */}
                {guess > number ? "↓" : "↑"}
                {guess}
              </span>
            );
          })}
        </>
      ) : null}
    </div>
  );
}
