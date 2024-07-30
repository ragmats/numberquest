export default function Guesses({ isLastLevel, guesses, number, max }) {
  console.log(guesses);
  return (
    <div className={isLastLevel ? "guesses guesses-last-level" : "guesses"}>
      <span>(1-{max})</span>
      {guesses.length > 0 ? (
        <>
          {guesses.map((guess) => {
            return (
              <span key={crypto.randomUUID()}>
                {guess > number ? (
                  <span>&#129051; {guess}</span>
                ) : (
                  <span>&#129049; {guess}</span>
                )}
              </span>
            );
          })}
        </>
      ) : null}
    </div>
  );
}
