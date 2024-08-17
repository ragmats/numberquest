import EnterNameForm from "./EnterNameForm";

export default function EnterNamePage({ setPlayer, advancePlayerLevel, name }) {
  function submit() {
    advancePlayerLevel();
  }

  return (
    <div className="intro-container">
      <p>
        Blue birds sing and the sun shines warm... despite tales told of a
        darkness in this land.
      </p>
      <p>What is your name?</p>
      <EnterNameForm
        setPlayer={setPlayer}
        name={name}
        submit={submit}
        buttonText="Accept Quest"
      />
    </div>
  );
}
