import HealthBarbeast from "./HealthBarBeast";

export default function GameImage({
  player,
  fellow,
  isLastLevel,
  isPreEndLevel,
}) {
  return (
    <div className="game-image">
      {isLastLevel && (player.subLevel === 5 || isPreEndLevel) ? (
        <HealthBarbeast
          health={fellow.health}
          beastIsVictim={fellow.isVictim}
        />
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
