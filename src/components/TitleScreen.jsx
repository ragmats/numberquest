export default function TitleScreen({ toggleIsPlaying }) {
  return (
    <div className="intro-container">
      {/* <p>NUMBER QUEST</p> */}
      <img
        className="title-image"
        alt="Number Quest title image with black and white retro-style text and a mysterious hooded fellow"
        src={`${import.meta.env.VITE_BASE_URL}img/numberquest_logo_p.png`}
      />
      <button onClick={() => toggleIsPlaying()}>Begin</button>
    </div>
  );
}
