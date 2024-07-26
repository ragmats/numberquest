import { useEffect } from "react";

export default function HealthBarBeast({
  startHealth,
  endHealth,
  beastIsVictim,
  healthBar,
  setHealthBar,
}) {
  useEffect(() => {
    if (beastIsVictim) {
      // Set the health to startHealth to initialize the animation
      setHealthBar(startHealth);
      // Use requestAnimationFrame to ensure the state update happens in the next frame
      requestAnimationFrame(() => {
        // Trigger the transition to endHealth
        setHealthBar(endHealth);
      });
    }
  }, [startHealth, endHealth, beastIsVictim]);

  return (
    <div className="health-bar-container">
      <div className="health-number">{endHealth}</div>
      <div
        className="health-bar-beast-static"
        style={{ width: `${healthBar}%` }}
      />
      <div
        className="health-bar-beast"
        style={{ width: `${healthBar}%`, transition: "width .15s ease .5s" }}
      />
    </div>
  );
}
