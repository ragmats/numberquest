import { useEffect, useState } from "react";

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
}) {
  const [animationClass, setAnimationClass] = useState("");
  useEffect(() => {
    if (characterIsVictim) {
      // Set the health to startHealth to initialize the animation
      setHealthBar(startHealth);
      // Use requestAnimationFrame to ensure the state update happens in the next frame
      requestAnimationFrame(() => {
        // Trigger the transition to endHealth
        setHealthBar(endHealth);
      });
    }
  }, [startHealth, endHealth, characterIsVictim]);

  useEffect(() => {
    // Toggle class to trigger animation
    if (damageTaken > 0) {
      // Reset animation class
      setAnimationClass("");
      // Apply class
      setAnimationClass("animate-damage-number");
    }
  }, [endHealth]);

  return (
    <div className="health-UI">
      <div className="health-bar-upper">
        <span className="health-bar-name">{name}</span>
        {damageTaken > 0 ? (
          <span className={`health-bar-damage-number ${animationClass}`}>
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
    </div>
  );
}
