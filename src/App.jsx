import { useEffect, useState } from "react";
import "./App.css";

// TODO Lay out a logbook/journal during guessing so the content doesn't move around as it updates
// TODO Separate into components
// TODO Create random number
// TODO Make first number guessing sequence
// TODO EMRIS' IDEA - add a button to reverse game text and artwork, right/left to left/right
// TODO Add random responses
// TODO improve text to handle singular and plural: (es) and (s) - search for "singular/plural"

function App() {
  const startingLives = 3;
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState({
    name: "Traveler",
    level: 0,
    subLevel: 0,
    guess: "",
    guesses: [],
    lives: startingLives,
    health: 100,
    damage: 1,
  });
  const [fellow, setFellow] = useState({
    number: 0,
    max: 0,
    response: "",
    health: 100,
  });
  const [announcer, setAnnouncer] = useState({
    reaction: "",
    description: "",
    suggestion: "",
    hasAnnouncement: false,
  });

  useEffect(() => {
    console.log(announcer);
  }, [announcer]);

  useEffect(() => {
    if (!isPlaying) {
      // Reset player to defaults
      resetDefaults();
    }
  }, [isPlaying]);

  useEffect(() => {
    retoreLives();
    clearGuesses();
    increaseMax();
  }, [player.level]);

  useEffect(() => {
    setFellow((currentFellow) => {
      return { ...currentFellow, number: getRandomNumber(fellow.max) };
    });
  }, [fellow.max]);

  useEffect(() => {
    if (
      announcer.reaction !== "" ||
      announcer.description !== "" ||
      announcer.suggestion !== ""
    ) {
      setAnnouncer((currentAnnouncer) => {
        return { ...currentAnnouncer, hasAnnouncement: true };
      });
    } else {
      setAnnouncer((currentAnnouncer) => {
        return { ...currentAnnouncer, hasAnnouncement: false };
      });
    }
  }, [announcer.reaction, announcer.description, announcer.suggestion]);

  const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const gameLevels = [
    {
      level: 1,
      subLevel: 1,
      text1: "Along a path, you meet a young fellow in a black cloak.",
      text2: "He looks friendly enough... or does he?",
      action: "Approach",
      image: "path to image",
      endLevel: false,
    },
    {
      level: 1,
      subLevel: 2,
      text1: "With a curious smirk, he says to you:",
      text2: `“Greetings, ${player.name}! I’m thinking of a number from 1-${fellow.max}. Can you guess it?”`,
      action: "Guess",
      image: "path to image",
      endLevel: true,
    },
    {
      level: 1,
      subLevel: "win",
      text1: "With an almost surprised look, the fellow says:",
      text2: `“Very impressive, ${player.name}! You may pass...”`,
      action: "Walk the path",
      image: "path to image",
    },
    {
      level: 1,
      subLevel: "lose",
      text1: `The fellow smiles and looks at you darkly. “Sorry, ${player.name}, it was ${fellow.number}.”`,
      text2:
        "His eyes turn black. You suddenly feel heavy and very tired. The world around you begins to fade.",
      action: "Leave this world forever",
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
      text2: `“Hello again, ${player.name}! From 1-${fellow.max}, now what number might I be thinking of?”`,
      action: "Guess",
      image: "path to image",
      endLevel: true,
    },
    {
      level: 2,
      subLevel: "win",
      text1: "With a glimpse of annoyance masked by charm, the fellow says:",
      text2: `“You win again, ${player.name}! Go ahead... if you must.”`,
      action: "Step into the forest",
      image: "path to image",
    },
    {
      level: 2,
      subLevel: "lose",
      text1: `The fellow clenches his fists as if holding something back. “So sorry, ${player.name}... my number was ${fellow.number}.”`,
      text2:
        "A slow, deliberate smirk betrays the pretense of despair in his voice.",
      text3:
        "The fellow opens his arms and pulls you into the irresistible darkness and silence.",
      action: "Let go of life and light",
      image: "path to image",
    },
    {
      level: 3,
      subLevel: 1,
      text1: "You reach a long, worn bridge, the only way forward.",
      text2: "At the bridge’s mouth, you spy the shape of your old friend.",
      text3: "It appears he has been wating for you.",
      action: "Approach",
      image: "path to image",
      endLevel: false,
    },
    {
      level: 3,
      subLevel: 2,
      text1: "With only seriousness now, he asks you darkly:",
      text2: `“1-${fellow.max}, ${player.name}... what is my number?”`,
      action: "Guess",
      image: "path to image",
      endLevel: true,
    },
    {
      level: 3,
      subLevel: "win",
      text1:
        "The fellow suddenly fades away, right before your eyes, as if by some black magic.",
      text2: `His voice can be heard at an ominous distance, a mere echo in the sky:`,
      text3: `“Now you have done it.”`,
      action: "Cross the bridge",
      image: "path to image",
    },
    {
      level: 3,
      subLevel: "lose",
      text1: `"The fellow shivers with a mixture of relief, pain, and joy. His eyes roll back. “This is it, dear ${player.name}... my number was ${fellow.number}.”`,
      text2:
        "His form begins to grow and the blacks of his cloak become blacker and wider until shrouding anything and everything.",
      text3: "Especially you.",
      action: "Become one with darkness",
      image: "path to image",
    },
    {
      level: 4,
      subLevel: 1,
      text1: "Wait... is it not the end?",
      text2: "Beyond the bridge is a cave.",
      text2: "You hesitantly approach.",
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
      text1: "The form moves suddenly. It jerks and moans.",
      text2: "You think you can make out your name, almost a whimper.",
      text3: "It is becoming something much larger...",
      action: "Turn back and run",
      image: "path to image",
      endLevel: false,
    },
    {
      level: 4,
      subLevel: 4,
      text1:
        "In a shimmer of light, you can see it has sharp, twisted numbers growing out of its body.",
      text2: "It locks its black eyes on you and roars!",
      action: "Try desperately to escape",
      image: "path to image",
      endLevel: false,
    },
    {
      level: 4,
      subLevel: 5,
      text1:
        "The beast is quick! As if teleporting, you instantly see it raising a razor sharp claw.",
      text2: `Quickly, ${player.name}, it must have a weak spot!`,
      text3: `From 1-${fellow.max}, you must find it!`,
      action: "Fight!", // Initiate health bars & fight sequence
      image: "path to image",
      endLevel: true,
    },
    {
      level: 4,
      subLevel: "win",
      text1: `The beast cries out like the tears of ${
        fellow.number - 1 // TODO singular/plural
      } terrified brother(s), and roars: “No, no! What have you done, ${
        player.name // TODO singular/plural
      }? You were supposed to be my precious number ${fellow.number}!”`,
      text2: `Suddenly, the beast bursts into black flames. The surrounding air feels both hot and cold. You meet its eyes and glimpse the fleeting expression of a lost child. The beast reaches out a trembling finger, whispers your name... “${player.name}...” and is instantly swallowed whole by the darkness, leaving only the empty black cloak to collapse and crumple onto the ground.`,
      text3: "You pick it up. It still feels warm. You ponder.",
      action: "Put on the cloak",
      image: "path to image",
    },
    {
      level: 4,
      subLevel: "lose",
      text1: `The beast picks you up above its great numbered horns.`,
      text2: `“You are mine! You shall become my number ${fellow.number}!”`,
      text3: `As the beast widens its toothy maw, you hear a single/symphony of ${
        fellow.number - 1 // TODO singular/plural
      } tortured voice(s) soon to be joined with your own.`, // TODO singular/plural
      action: "To the pit",
      image: "path to image",
    },
  ];

  function resetDefaults() {
    setPlayer((currentPlayer) => {
      return {
        ...currentPlayer,
        level: 0,
        subLevel: 0,
        guess: "",
        guesses: [],
        lives: startingLives,
      };
    });
    setFellow((currentFellow) => {
      return { ...currentFellow, number: 0, max: 0, response: "" };
    });
  }

  function getRandomNumber(max) {
    return Math.floor(Math.random() * max + 1);
  }

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
    advancePlayerLevel();
  }

  function increaseMax() {
    let max = fellow.max;
    if (player.level === 1) max = 10;
    else if (player.level === 2) max = 25;
    else max = max * 2;
    setFellow((currentFellow) => {
      return { ...currentFellow, max: max };
    });
  }

  function advancePlayer() {
    // Get the current level
    const currentGameLevel = gameLevels.find(
      (level) =>
        level.level === player.level && level.subLevel === player.subLevel
    );
    // If current level is a win, advance level
    // Otherwise, just advance sublevel
    if (currentGameLevel.subLevel === "win") advancePlayerLevel();
    else if (currentGameLevel.subLevel === "lose") endGame();
    else advancePlayerSubLevel(currentGameLevel);
  }

  function advancePlayerSubLevel(level) {
    if (level.endLevel) {
      setPlayer((currentPlayer) => {
        return { ...currentPlayer, subLevel: "win" };
      });
    } else {
      setPlayer((currentPlayer) => {
        return { ...currentPlayer, subLevel: player.subLevel + 1 };
      });
    }
  }

  function advancePlayerLevel() {
    setPlayer((currentPlayer) => {
      return { ...currentPlayer, level: player.level + 1, subLevel: 1 };
    });
  }

  function inputDigit(digit) {
    const newNumber = parseInt(`${player.guess}${digit}`);
    if (newNumber < 1 || newNumber > fellow.max) {
      if (player.level === 4) {
        clearAnnouncer();
        respond(
          "suggestion",
          `You can only find its weak spot from 1-${fellow.max}.`,
          `You are out of range, ${player.name}. Keep it from 1-${fellow.max}.`,
          `Aim from 1-${fellow.max} only, ${player.name}.`
        );
      } else {
        respond(
          "fellow",
          `“No, ${player.name}! It must be from 1-${fellow.max}... IT MUST!”`,
          `“Keep it from 1-${fellow.max}, ${player.name}.”`,
          `“Would that be from 1-${fellow.max}? No, it would not.”`
        );
      }
    } else {
      if (player.level === 4) {
        if (!player.guess) {
          clearAnnouncer();
          respond(
            "suggestion",
            `Aim true, ${player.name}!`,
            `Is that the beast's weak spot, ${player.name}?`,
            `Be certain before you strike.`
          );
        }
      } else {
        if (!player.guess) {
          respond(
            "fellow",
            `“Are you certain about that, ${player.name}?”`,
            `“Could it be that simple, ${player.name}?”`,
            `“Are you sure?”`
          );
        }
      }
      setPlayer((currentPlayer) => {
        return { ...currentPlayer, guess: newNumber };
      });
    }
  }

  // function respond(...responses) {
  //   const randomIndex = Math.floor(Math.random() * responses.length);
  //   setFellow((currentFellow) => {
  //     return {
  //       ...currentFellow,
  //       response: responses[randomIndex],
  //     };
  //   });
  // }

  // Response type (fellow, reaction, desscription, or suggestion)
  function respond(type, ...responses) {
    const randomIndex = Math.floor(Math.random() * responses.length);
    if (type === "fellow") {
      setFellow((currentFellow) => {
        return {
          ...currentFellow,
          response: responses[randomIndex],
        };
      });
    } else if (type === "reaction") {
      setAnnouncer((currentAnnouncer) => {
        return {
          ...currentAnnouncer,
          reaction: responses[randomIndex],
        };
      });
    } else if (type === "description") {
      setAnnouncer((currentAnnouncer) => {
        return {
          ...currentAnnouncer,
          description: responses[randomIndex],
        };
      });
    } else if (type === "suggestion") {
      setAnnouncer((currentAnnouncer) => {
        return {
          ...currentAnnouncer,
          suggestion: responses[randomIndex],
        };
      });
    } else {
      console.log("No response set for type: ", type);
    }
  }

  function clearResponse() {
    setFellow((currentFellow) => {
      return {
        ...currentFellow,
        response: "",
      };
    });
  }

  function clearAnnouncer(...types) {
    // console.log("types: ", types);
    const validTypes = ["reaction", "description", "suggestion"];
    if (types.length === 0) {
      console.log("Clearing Announcer (all)");
      setAnnouncer((currentAnnouncer) => {
        return {
          ...currentAnnouncer,
          reaction: "",
          description: "",
          suggestion: "",
        };
      });
    } else {
      types.forEach((type) => {
        if (validTypes.includes(type)) {
          console.log("Clearing Announcer type: ", type);
          setAnnouncer((currentAnnouncer) => {
            return {
              ...currentAnnouncer,
              [type]: "test",
            };
          });
        } else console.log("Invalid Announcer type, nothing cleared.");
      });
    }
  }

  function addToGuesses() {
    setPlayer((currentPlayer) => {
      return {
        ...currentPlayer,
        guesses: [...player.guesses, player.guess],
      };
    });
  }

  function clearGuess() {
    setPlayer((currentPlayer) => {
      return { ...currentPlayer, guess: "" };
    });
  }

  function clearGuesses() {
    setPlayer((currentPlayer) => {
      return { ...currentPlayer, guesses: [] };
    });
  }

  function loseGame() {
    setPlayer((currentPlayer) => {
      return { ...currentPlayer, subLevel: "lose" };
    });
  }

  function loseALife() {
    setPlayer((currentPlayer) => {
      return { ...currentPlayer, lives: player.lives - 1 };
    });
  }

  function retoreLives() {
    setPlayer((currentPlayer) => {
      return { ...currentPlayer, lives: startingLives + player.level };
    });
  }

  function rollVictim() {
    // Return either "player" or "beast" to be attacked
    console.log("need to figure out victim");
    return "player";
  }

  function rollDamage() {
    // roll 20 to decide what happens in the attack
    console.log("need to figure out damage");
    return 1;
  }

  function damageVictim(victim, damage) {
    console.log({ victim });
    console.log({ damage });
    if (victim === "player")
      setPlayer((currentPlayer) => {
        respond("reaction", "Whip crack went his whippy tail!");
        // TODO Add all the different responses based on damage here
        return { ...currentPlayer, health: player.health - damage };
      });
    else if (victim === "beast") {
      // TODO Add all the different responses based on damage here
      respond("reaction", "The beast is stunned!");
      setFellow((currentFellow) => {
        return { ...currentFellow, health: fellow.health - damage };
      });
    }
  }

  function endGame() {
    toggleIsPlaying();
  }

  function checkGuess() {
    // Player is on last level
    if (player.level === 4) {
      // Repond if there is no guess
      if (!player.guess) {
        respond(
          "suggestion",
          `There is no time to waste, ${player.name}, you are under attack!`,
          `Quit messing around and fight for your life!`,
          `Continue to do nothing and meet your end surely, ${player.name}!`
        );
      } else if (player.guess === fellow.number) {
        // Player, on last level, guesses the right number
        clearAnnouncer();
        advancePlayer();
      } else {
        // Player, on last level, guessed the wrong number
        clearAnnouncer();
        // Player is on last level in beast fight (health not lives)
        const victim = rollVictim();
        const damage = rollDamage();
        if (victim === "player" && player.health - damage < 1) {
          loseGame();
        } else if (victim === "beast" && fellow.health - damage < 1) {
          advancePlayer();
        }
        damageVictim(victim, damage);

        if (player.guesses.includes(player.guess)) {
          // Respond if player already made the guess
          respond(
            "fellow",
            `“Haven’t you already tried that, ${player.name}"”`,
            `“Why guess the same number again, ${player.name}? You now have one less guess.”`,
            `“Stop repeating yourself, ${player.name}... it will not end well.”`,
            `“Why would it be any different this time? Oh well...”`,
            `“I suggest you guess something new.”`,
            `“I don’t recommend wasting any more guesses, ${player.name}."”`
          );
        } else if (player.guess < fellow.number) {
          // Respond to player's too-low guess
          respond(
            "suggestion",
            `Its weak spot is higher, ${player.name}!`,
            `Higher, ${player.name}, aim higher!`,
            `Go for its weak spot! Aim higher!`
          );
        } else {
          // Respond to player's too-high guess
          respond(
            "suggestion",
            `Aim lower, ${player.name}!`,
            `Hit its weak spot, ${player.name}! Look lower!`,
            `Hit it lower!`
          );
        }
        // Add to player guesses
        addToGuesses();
      }
    }

    // Player is NOT on last level
    if (player.level !== 4) {
      if (!player.guess)
        respond(
          "fellow",
          `“Won’t you even try, ${player.name}?”`,
          `“You can do much better than that, ${player.name}?”`,
          `“Do you refuse to guess, ${player.name}?”`
        );
      else if (player.guess === fellow.number) {
        clearResponse();
        clearAnnouncer();
        advancePlayer();
      } else {
        // If player loses last life
        if (player.lives - 1 === 0) {
          clearResponse();
          loseGame();
        } else {
          // Player loses a life but is still in the game
          loseALife();
          // Send fellow response
          // If guess is too low...
          if (player.guesses.includes(player.guess)) {
            // Respond if player already made the guess
            respond(
              "fellow",
              `“Haven’t you already tried that, ${player.name}"”`,
              `“Why guess the same number again, ${player.name}? You now have one less guess.”`,
              `“Stop repeating yourself, ${player.name}... it will not end well.”`,
              `“Why would it be any different this time? Oh well...”`,
              `“I suggest you guess something new.”`,
              `“I don’t recommend wasting any more guesses, ${player.name}."”`
            );
          } else if (player.guess < fellow.number) {
            // Respond to player's too-low guess
            respond(
              "fellow",
              `“Regretfully, no. Try higher, ${player.name}”`,
              `“No, ${player.name}. Think higher.”`,
              `“Try something higher.”`
            );
          } else {
            // Respond to player's too-high guess
            respond(
              "fellow",
              `“That’s not it, ${player.name}. Perhaps lower?”`,
              `“Good try, ${player.name}. It’s lower.”`,
              `“No, but lower...”`
            );
          }
          // Add to player guesses
          addToGuesses();
        }
      }
    }

    // Clear player's incorrect guess
    clearGuess();
  }

  return (
    <div className="container">
      {!isPlaying ? (
        <div className="intro-container">
          NUMBER QUEST
          <button onClick={() => toggleIsPlaying()}>Begin</button>
        </div>
      ) : (
        // Player Start, Enter Name
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
            // Game Start
            <div className="game-container">
              <div className="game-image">
                {player.level === 4 && player.subLevel === 5 ? (
                  <div className="fellow-health">Health: {fellow.health}</div>
                ) : null}
                <p>Artwork.</p>
                <p>
                  Player level {player.level}, Player subLevel {player.subLevel}
                </p>
                <p>
                  Number: {fellow.number}, Max: {fellow.max}
                </p>
                <p>Fellow Response: {fellow.response}</p>
              </div>

              {gameLevels.map((level) => {
                if (
                  level.level === player.level &&
                  level.subLevel === player.subLevel
                ) {
                  return (
                    <div
                      key={crypto.randomUUID()}
                      className="game-text-container"
                    >
                      <div className="game-text">
                        {fellow.response || announcer.hasAnnouncement ? (
                          <>
                            {player.level === 4 ? (
                              <>
                                {announcer.reaction ? (
                                  <p>{announcer.reaction}</p>
                                ) : null}
                                {announcer.description ? (
                                  <p>{announcer.description}</p>
                                ) : null}
                                {announcer.suggestion ? (
                                  <p>{announcer.suggestion}</p>
                                ) : null}
                              </>
                            ) : (
                              <p>{fellow.response}</p>
                            )}
                          </>
                        ) : (
                          <>
                            <p>{level.text1}</p>
                            <p>{level.text2}</p>
                            {level.text3 ? <p>{level.text3}</p> : null}
                          </>
                        )}
                      </div>
                      {/* <p>
                        Game level {level.level}, Game subLevel {level.subLevel}
                      </p> */}
                      {level.endLevel ? (
                        // Guessing interface here
                        // Display number buttons
                        // Display guess
                        // Display guesses with > or < indicators
                        <>
                          <div className="your-guess">{player.guess}</div>
                          <div className="number-btns-container">
                            {numberButtons.map((numberButton) => {
                              return (
                                <div key={crypto.randomUUID()}>
                                  <button
                                    className="number-btn"
                                    onClick={() => {
                                      inputDigit(numberButton);
                                    }}
                                  >
                                    {numberButton}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                          <div className="guess-btns">
                            <button onClick={() => checkGuess(level)}>
                              {level.action}
                            </button>
                            <button
                              onClick={() => {
                                clearGuess(level);
                                clearAnnouncer();
                                if (player.guess) {
                                  if (player.level === 4) {
                                    respond(
                                      "suggestion",
                                      `All is clear now, ${player.name}. Focus your aim!`,
                                      `The way is clear, ${player.name}! Find your target!`,
                                      `Clear your mind and strike!`
                                    );
                                  } else {
                                    respond(
                                      "fellow",
                                      `“That’s it, ${player.name}. Clear your mind.”`,
                                      `“Clear your mind of everything, ${player.name}.”`,
                                      `“Yes, let your mind go blank.”`
                                    );
                                  }
                                } else if (player.level === 4) {
                                  respond(
                                    "suggestion",
                                    `It's clear enough. Strike the beast!`,
                                    `How clear must it be, ${player.name}? Attack!`,
                                    `Forget clarity! Fight for your life!`
                                  );
                                } else {
                                  respond(
                                    "fellow",
                                    `“Could it be any clearer?”`,
                                    `“But it’s so clear already, ${player.name}?”`,
                                    `“${player.name}, what are you trying to do?”`
                                  );
                                }
                              }}
                            >
                              Clear
                            </button>
                          </div>
                          <div className="logbook">
                            <p>Logbook</p>
                            {fellow.max ? <p>Range: 1-{fellow.max}</p> : null}
                            {player.level === 4 ? (
                              <div className="player-health">
                                Health: {player.health}
                              </div>
                            ) : (
                              <>
                                {/* TODO singular/plural */}
                                <p>{player.lives} guess(es) remain</p>
                              </>
                            )}

                            <div className="guesses">
                              {player.guesses.length > 0 ? (
                                <>
                                  {player.guesses.map((guess) => {
                                    if (guess > fellow.number)
                                      return (
                                        <p
                                          key={crypto.randomUUID()}
                                        >{`# < ${guess}`}</p>
                                      );
                                    return (
                                      <p
                                        key={crypto.randomUUID()}
                                      >{`# > ${guess}`}</p>
                                    );
                                  })}
                                </>
                              ) : null}
                            </div>
                          </div>
                        </>
                      ) : (
                        // Non-guessing interface here
                        <button onClick={() => advancePlayer()}>
                          {level.action}
                        </button>
                      )}
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
