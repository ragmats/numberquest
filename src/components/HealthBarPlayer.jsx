import { useEffect, useState } from "react";

export default function HealthBarPlayer({
  startHealth,
  endHealth,
  playerIsVictim,
}) {
  const [health, setHealth] = useState(startHealth);

  useEffect(() => {
    if (playerIsVictim) {
      setHealth(startHealth);
      requestAnimationFrame(() => {
        setHealth(endHealth);
      });
    }
  }, [endHealth, playerIsVictim]);

  return (
    <div className="health-bar-container">
      <div className="health-number">{endHealth}</div>
      <div
        className="health-bar"
        style={{ width: `${health}%`, transition: "width 0.5s ease" }}
      />
    </div>
  );
}
