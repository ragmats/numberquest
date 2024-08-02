import { useEffect, useState } from "react";
import Guesses from "./Guesses";

export default function HealthBar({
  character,
  name,
  maxHealth,
  startHealth,
  endHealth,
  damageTaken,
  characterIsVictim,
  healthBar,
  setHealthBar,
  turn,
  guesses,
  number,
  max,
}) {
  const [key, setKey] = useState(crypto.randomUUID());

  useEffect(() => {
    {
      if (characterIsVictim)
        // Set the health to startHealth to initialize the animation
        setHealthBar(startHealth);
      // Use requestAnimationFrame to ensure the state update happens in the next frame
      requestAnimationFrame(() => {
        // Trigger the transition to endHealth
        setHealthBar(endHealth);
      });
    }
  }, [startHealth, endHealth, characterIsVictim]);

  // Update the key only when it's a new turn to trigger the damage taken number animation
  useEffect(() => {
    if (characterIsVictim) {
      setKey(crypto.randomUUID());
    }
  }, [turn, characterIsVictim]);

  return (
    <div className="health-UI">
      <div className="health-bar-upper">
        <span className="health-bar-name">{name}</span>
        {damageTaken > 0 ? (
          <span key={key} className={`health-bar-damage-number`}>
            {damageTaken}
          </span>
        ) : null}
      </div>
      <div className="health-bar-container">
        <div
          className={`health-bar-${character}-static`}
          style={{ width: `${healthBar}%` }}
        />
        <div
          className={`health-bar-${character}`}
          style={{ width: `${healthBar}%`, transition: "width .15s ease .5s" }}
        />
        <div className="health-number">{`${endHealth}/${maxHealth}`}</div>
      </div>
      {character === "player" ? (
        <Guesses guesses={guesses} number={number} max={max} />
      ) : null}
    </div>
  );
}
