import HealthBarBeast from "./HealthBarBeast";

export default function GameImage({
  player,
  fellow,
  isLastLevel,
  isPreEndLevel,
  beastHealthBar,
  setBeastHealthBar,
}) {
  return (
    <div className="game-image">
      {isLastLevel && (player.subLevel === 5 || isPreEndLevel) ? (
        <HealthBarBeast
          startHealth={fellow.prevHealth}
          endHealth={fellow.health}
          beastIsVictim={fellow.isVictim}
          healthBar={beastHealthBar}
          setHealthBar={setBeastHealthBar}
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