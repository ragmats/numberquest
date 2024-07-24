export default function HealthBar({ health }) {
  // Set width of health-bar by health

  return (
    <div className="health-bar-container">
      <div className="health-bar">Health: {health}</div>
    </div>
  );
}
