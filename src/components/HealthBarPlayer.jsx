import { useEffect } from "react";

export default function HealthBarPlayer({
  startHealth,
  endHealth,
  playerIsVictim,
  healthBar,
  setHealthBar,
}) {
  useEffect(() => {
    if (playerIsVictim) {
      // Set the health to startHealth to initialize the animation
      setHealthBar(startHealth);
      // Use requestAnimationFrame to ensure the state update happens in the next frame
      requestAnimationFrame(() => {
        // Trigger the transition to endHealth
        setHealthBar(endHealth);
      });
    }
  }, [startHealth, endHealth, playerIsVictim]);

  return (
    <div className="health-bar-container">
      <div className="health-number">{endHealth}</div>
      <div
        className="health-bar-player-static"
        style={{ width: `${healthBar}%` }}
      />
      <div
        className="health-bar-player"
        style={{ width: `${healthBar}%`, transition: "width .15s ease .5s" }}
      />
    </div>
  );
}
