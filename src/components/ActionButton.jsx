export default function ActionButton({ advancePlayer, level }) {
  return <button onClick={() => advancePlayer()}>{level.action}</button>;
}
