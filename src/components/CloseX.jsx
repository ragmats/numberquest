export default function closeX({ handleClose }) {
  return (
    <button onClick={() => handleClose()} className="close-X">
      ×
    </button>
  );
}
