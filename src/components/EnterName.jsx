export default function EnterName({ setPlayer, advancePlayerLevel, name }) {
  function handleChange(name) {
    setPlayer((currentPlayer) => {
      return { ...currentPlayer, name: name };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    advancePlayerLevel();
  }

  return (
    <div className="intro-container">
      <p>
        Blue birds sing and the warm sun shines... despite tales of darkness
        told in this land.
      </p>
      <p>What is your Name?</p>
      <form className="name-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          className="input-name"
          onChange={(e) => handleChange(e.target.value)}
          value={name}
        />
        <button>Accept Quest</button>
      </form>
    </div>
  );
}
