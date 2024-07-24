import { useEffect } from "react";

export default function HealthBarPlayer({ health, playerIsVictim }) {
  useEffect(() => {
    if (playerIsVictim)
      document.documentElement.style.setProperty(
        "--health-bar-player-width",
        `${health}%`
      );
  }, [health]);

  return (
    <div className="health-bar-container">
      <div className="health-number">{health}</div>
      <div className="health-bar health-bar-player"></div>
    </div>
  );
}
