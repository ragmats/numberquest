import HealthBar from "./HealthBar";

export default function GameImage({
  player,
  fellow,
  fellowStartingHealth,
  isLastLevel,
  isPreEndLevel,
  beastHealthBar,
  setBeastHealthBar,
}) {
  return (
    <div className="game-image">
      {isLastLevel && (player.subLevel === 5 || isPreEndLevel) ? (
        <HealthBar
          character={"beast"}
          name={"The Beast"}
          maxHealth={fellowStartingHealth}
          startHealth={fellow.prevHealth}
          endHealth={fellow.health}
          damageTaken={fellow.damageTaken}
          characterIsVictim={fellow.isVictim}
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
