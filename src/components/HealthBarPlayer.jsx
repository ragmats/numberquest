import { useEffect, useState } from "react";

export default function HealthBarPlayer({
  startHealth,
  endHealth,
  playerIsVictim,
}) {
  const [health, setHealth] = useState(endHealth);

  useEffect(() => {
    console.log("width based on player health: ", health);
    console.log("startHealth: ", startHealth);
    console.log("endHealth: ", endHealth);
  }, [health]);

  useEffect(() => {
    if (playerIsVictim) {
      // Set the health to startHealth to initialize the animation
      setHealth(startHealth);
      // Use requestAnimationFrame to ensure the state update happens in the next frame
      requestAnimationFrame(() => {
        // Trigger the transition to endHealth
        setHealth(endHealth);
      });
    }
  }, [startHealth, endHealth, playerIsVictim]);

  return (
    <div className="health-bar-container">
      <div className="health-number">{endHealth}</div>
      <div
        className="health-bar-player"
        style={{ width: `${health}%`, transition: "width 1.5s ease" }}
      />
    </div>
  );
}
