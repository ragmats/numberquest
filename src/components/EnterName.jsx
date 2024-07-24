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
      What is your Name?
      <form onSubmit={(e) => handleSubmit(e)}>
        <input onChange={(e) => handleChange(e.target.value)} value={name} />
        <button>Accept Quest</button>
      </form>
    </div>
  );
}
