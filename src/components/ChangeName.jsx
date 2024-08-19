import EnterNameForm from "./EnterNameForm";

export default function ChangeName({ setShowChangeName, setPlayer, name }) {
  function submit() {
    setShowChangeName(false);
  }

  return (
    <div className="change-name-container">
      <p>What is your name?</p>
      <EnterNameForm
        setPlayer={setPlayer}
        name={name}
        submit={submit}
        buttonText="Save Name"
      />
    </div>
  );
}
