export default function ActionButton({ advancePlayer, level }) {
  return (
    <div className="action-btn">
      <button onClick={() => advancePlayer()}>{level.action}</button>
    </div>
  );
}
