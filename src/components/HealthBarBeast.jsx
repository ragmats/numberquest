import { useEffect } from "react";

export default function HealthBarbeast({ health, beastIsVictim }) {
  useEffect(() => {
    if (beastIsVictim)
      document.documentElement.style.setProperty(
        "--health-bar-beast-width",
        `${health}%`
      );
  }, [health]);

  return (
    <div className="health-bar-container">
      <div className="health-number">{health}</div>
      <div className="health-bar health-bar-beast"></div>
    </div>
  );
}
