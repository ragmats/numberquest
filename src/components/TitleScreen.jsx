export default function TitleScreen({ toggleIsPlaying }) {
  return (
    <div className="intro-container">
      <p>NUMBER QUEST</p>
      <button onClick={() => toggleIsPlaying()}>Begin</button>
    </div>
  );
}
