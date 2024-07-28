export default function Hearts({ isLastLevel, isEndSubLevel, lives }) {
  return (
    <div className="hearts-container">
      {Array.from({ length: lives }).map((_, index) => {
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
  );
}
