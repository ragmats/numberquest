import { useEffect } from "react";

export default function HealthBar({ health }) {
  // Set width of health-bar by health

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--health-bar-width",
      `${health}%`
    );
  }, [health]);

  return (
    <div className="health-bar-container">
      <div className="health-number">{health}</div>
      <div className="health-bar"></div>
    </div>
  );
}
