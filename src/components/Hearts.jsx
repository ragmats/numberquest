export default function Hearts({ isLastLevel, isEndSubLevel, lives }) {
  return (
    <>
      {!isLastLevel && isEndSubLevel ? (
        <div className="hearts-container">
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
      ) : null}
    </>
  );
}
