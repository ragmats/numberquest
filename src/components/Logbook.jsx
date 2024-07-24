export default function Logbook({ player, fellow, isLastLevel }) {
  return (
    <div className="logbook">
      <p>Logbook</p>
      {fellow.max ? <p>Range: 1-{fellow.max}</p> : null}
      {!isLastLevel ? (
        <>
          {/* Rmeaining Guesses displayed as heart containers */}
          <div className="hearts-container">
            {Array.from({ length: player.lives }).map((_, index) => {
              return (
                <img
                  key={index}
                  alt="Player health heart container"
                  className="heart"
                  src="/img/heart.png"
                />
              );
            })}
          </div>
        </>
      ) : null}

      <div className="guesses">
        {player.guesses.length > 0 ? (
          <>
            {player.guesses.map((guess) => {
              if (guess > fellow.number)
                return <p key={crypto.randomUUID()}>{`# < ${guess}`}</p>;
              return <p key={crypto.randomUUID()}>{`# > ${guess}`}</p>;
            })}
          </>
        ) : null}
      </div>
    </div>
  );
}
