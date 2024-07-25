import { useEffect, useState } from "react";

export default function HealthBarBeast({
  startHealth,
  endHealth,
  beastIsVictim,
}) {
  const [health, setHealth] = useState(startHealth);

  useEffect(() => {
    if (beastIsVictim) {
      setHealth(startHealth);
      requestAnimationFrame(() => {
        setHealth(endHealth);
      });
    }
  }, [endHealth, beastIsVictim]);

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
