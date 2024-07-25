import { useEffect, useState } from "react";

export default function HealthBarBeast({
  startHealth,
  endHealth,
  beastIsVictim,
}) {
  const [health, setHealth] = useState(endHealth);

  // TODO Consider 1. moving this state to the main app and passing as a prop, so it doesnt reset to default upon re-render
  // TODO 2. combining the player and beast healthbar component, using specific variables for each (i,..e playerStartHealth, etc.)

  useEffect(() => {
    console.log("width based on beast health: ", health);
    console.log("startHealth: ", startHealth);
    console.log("endHealth: ", endHealth);
  }, [health]);

  useEffect(() => {
    if (beastIsVictim) {
      // Set the health to startHealth to initialize the animation
      setHealth(startHealth);
      // Use requestAnimationFrame to ensure the state update happens in the next frame
      requestAnimationFrame(() => {
        // Trigger the transition to endHealth
        setHealth(endHealth);
      });
    }
  }, [startHealth, endHealth, beastIsVictim]);

  return (
    <div className="health-bar-container">
      <div className="health-number">{endHealth}</div>
      <div
        className="health-bar-beast"
        style={{ width: `${health}%`, transition: "width 1.5s ease" }}
      />
    </div>
  );
}
