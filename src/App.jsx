import { useEffect, useState } from "react";
import "./App.css";

// TODO Separate into components
// TODO Create random number
// TODO Make first number guessing sequence

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState({
    name: "Traveler",
    level: 0,
    subLevel: 0,
  });
  const [number, setNumber] = useState(0);

  const gameText = [
    {
      level: 1,
      subLevel: 1,
      text1: "Along a path, you meet a young fellow dressed in black.",
      text2: "He looks friendly enough... or does he?",
      action: "Approach",
      image: "path to image",
      endLevel: false,
    },
    {
      level: 1,
      subLevel: 2,
      text1: "With a curious smirk, he says to you:",
      text2: `"Greetings, ${player.name}! I'm thinking of a number from 1-10. Can you guess it?"`,
      action: "Guess",
      image: "path to image",
      endLevel: true,
    },
    {
      level: 1,
      subLevel: "win",
      text1: "With an almost surprised look, the fellow says:",
      text2: `"Very impressive, ${player.name}! ...You may pass.`,
      action: "Pass along the path",
      image: "path to image",
    },
    {
      level: 1,
      subLevel: "lose",
      text1: `"The fellow smiles and looks at you darkly. "Sorry, ${player.name}, it was ${number}."`,
      text2:
        "The fellow's eyes turn black. You suddenly feel heavy and very tired. The world around you begins to fade.",
      action: "Be gone, forever",
      image: "path to image",
    },
    {
      level: 2,
      subLevel: 1,
      text1: "At the edge of a forest, you once again meet your new friend.",
      text2: "Does he still look friendly?",
      action: "Approach",
      image: "path to image",
      endLevel: false,
    },
    {
      level: 2,
      subLevel: 2,
      text1: "With a respectful bow, he says to you:",
      text2: `"Hello again, ${player.name}! Now what number am I thinking of?"`,
      action: "Guess",
      image: "path to image",
      endLevel: true,
    },
    {
      level: 2,
      subLevel: "win",
      text1: "With a glimpse of annoyance masked by charm, the fellow says: ",
      text2: `"You win again, ${player.name}! Go ahead... if you must.`,
      action: "Step into the forest",
      image: "path to image",
    },
    {
      level: 2,
      subLevel: "lose",
      text1: `"The fellow clenches his fists as if holding something back. "So sorry, ${player.name}... my number was ${number}."`,
      text2:
        "A slow forming smirk reveals the depair in his voice to be false. The fellow opens his arms and pulls you into the irresistible darkness and silence.",
      action: "Let go of life and light",
      image: "path to image",
    },
    {
      level: 3,
      subLevel: 1,
      text1:
        "You reach a long, worn bridge, the only way forward. At the bridge's mouth, you spy the shape of your old friend.",
      text2: "He has been wating for you.",
      action: "Approach",
      image: "path to image",
      endLevel: false,
    },
    {
      level: 3,
      subLevel: 2,
      text1: "With only seriousness now, he asks you darkly:",
      text2: `"What is my number, ${player.name}?`,
      action: "Guess",
      image: "path to image",
      endLevel: true,
    },
    {
      level: 3,
      subLevel: "win",
      text1:
        "The fellow suddenly fades away, right there before you, as if by some black magic.",
      text2: `His voice can be heard in the distance: "Now you have done it"`,
      action: "Cross the bridge",
      image: "path to image",
    },
    {
      level: 3,
      subLevel: "lose",
      text1: `"The fellow shivers with a mixture of relief, pain, and joy. "This is it, dear ${player.name}... my number was ${number}."`,
      text2:
        "His form begins to grow adn the blacks if his cloak become blacker, until the blackness shrouds anything and everything.",
      action: "Beocme one with the darkness",
      image: "path to image",
    },
    {
      level: 4,
      subLevel: 1,
      text1: "Wait... is it not the end?",
      text2: "Beyond the bridge is a cave. You hesitantly approach.",
      action: "Step inside",
      image: "path to image",
      endLevel: false,
    },
    {
      level: 4,
      subLevel: 2,
      text1: "In the darkness, you think you see a form.",
      text2: "Could it be him?",
      action: "Approach",
      image: "path to image",
      endLevel: false,
    },
    {
      level: 4,
      subLevel: 3,
      text1:
        "The form moves suddenly. It jerks and moans. You think you can make out your name, almost whimpered.",
      text2: "It is becoming something much larger...",
      action: "Turn back and run",
      image: "path to image",
      endLevel: false,
    },
    {
      level: 4,
      subLevel: 4,
      text1:
        "You see that it has sharp, twisted numbers growing out of its body.",
      text2: "It locks its black eyes on you and roars!",
      action: "Try desperately to escape",
      image: "path to image",
      endLevel: false,
    },
    {
      level: 4,
      subLevel: 5,
      text1:
        "The beast is too quick! In a flash, you see it raising a razor sharp claw.",
      text2: "Quickly, it must have a weak spot. You must find it!",
      action: "Fight!", // Initiate health bars & fight sequence
      image: "path to image",
      endLevel: true,
    },
    {
      level: 4,
      subLevel: "win",
      text1: `The beast cries out with the scream of ${
        number - 1
      } tortured voice(s). "No, what have you done? You were supposed to be my ${number}!`,
      text2:
        "Suddenly, the beast bursts into black flames. You meet eyes one last time before it is swallowed completely by the darkness",
      action: "Be remembered as a hero",
      image: "path to image",
    },
    {
      level: 4,
      subLevel: "lose",
      text1: `The beast picks you up over its great horns. "You are mine! You shall become my ${number}!`,
      text2: `As the beast widens its toothy maw, you hear a symphony of ${
        number - 1
      } tortured voices soon to be joined with yours.`,
      action: "Slide into the darkness, forever.",
      image: "path to image",
    },
  ];

  function toggleIsPlaying() {
    if (!isPlaying) setIsPlaying(true);
    else setIsPlaying(false);
  }

  function handleChange(name) {
    setPlayer((currentPlayer) => {
      return { ...currentPlayer, name: name };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setPlayer((currentPlayer) => {
      return { ...currentPlayer, level: 1, subLevel: 1 };
    });
  }

  function handleClick(item) {
    if (item.endLevel) {
      setPlayer((currentPlayer) => {
        return { ...currentPlayer, level: item.level + 1, subLevel: 1 };
      });
    } else {
      setPlayer((currentPlayer) => {
        return { ...currentPlayer, subLevel: item.subLevel + 1 };
      });
    }
  }

  return (
    <div className="container">
      {!isPlaying ? (
        <div className="intro-container">
          NUMBER QUEST
          <button onClick={() => toggleIsPlaying()}>Begin</button>
        </div>
      ) : (
        <>
          {player.level === 0 ? (
            <div className="intro-container">
              What is your Name?
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  onChange={(e) => handleChange(e.target.value)}
                  value={player.name}
                />
                <button>Accept Quest</button>
              </form>
            </div>
          ) : (
            <div className="game-container">
              <div className="game-image">
                Artwork for level {player.level} subLevel {player.subLevel}
              </div>

              {gameText.map((item) => {
                if (
                  item.level === player.level &&
                  item.subLevel === player.subLevel
                ) {
                  return (
                    <div key={crypto.randomUUID()} className="game-text">
                      <p>{item.text1}</p>
                      <p>{item.text2}</p>
                      <button onClick={() => handleClick(item)}>
                        {item.action}
                      </button>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
