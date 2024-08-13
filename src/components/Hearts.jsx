import Guesses from "./Guesses";

export default function Hearts({
  isLastLevel,
  isEndSubLevel,
  lives,
  guesses,
  number,
  max,
}) {
  return (
    <>
      {!isLastLevel && isEndSubLevel ? (
        <div className="hearts-container">
          <div className="hearts">
            {Array.from({ length: lives }).map((_, index) => {
              return (
                <img
                  key={index}
                  alt="Player health heart container"
                  className="heart"
                  src={`${import.meta.env.VITE_BASE_URL}img/heart.png`}
                />
              );
            })}
          </div>
          <Guesses guesses={guesses} number={number} max={max} lives={lives} />
        </div>
      ) : null}
    </>
  );
}
