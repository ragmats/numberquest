import HealthBar from "./HealthBar";

export default function GameImage({
  player,
  fellow,
  fellowStartingHealth,
  isEndSubLevel,
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
          turn={player.guesses.length}
        />
      ) : null}
      <p>Artwork goes here.</p>
      <p>
        Player level {player.level}, Player subLevel {player.subLevel}
      </p>
      <p>The number is {fellow.number}.</p>
    </div>
  );
}
