import HealthBar from "./HealthBar";

export default function GameImage({
  player,
  fellow,
  isLastLevel,
  isPreEndLevel,
}) {
  return (
    <div className="game-image">
      {isLastLevel && (player.subLevel === 5 || isPreEndLevel) ? (
        <HealthBar health={fellow.health} />
      ) : null}
      <p>Artwork.</p>
      <p>
        Player level {player.level}, Player subLevel {player.subLevel}
      </p>
      <p>
        Number: {fellow.number}, Max: {fellow.max}
      </p>
      <p>Fellow Response: {fellow.response}</p>
    </div>
  );
}
