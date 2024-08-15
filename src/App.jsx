import { useEffect, useState } from "react";
// import "./App.css";
import TitleScreen from "./components/TitleScreen";
import EnterName from "./components/EnterName";
import GameImage from "./components/GameImage";
import GameText from "./components/GameText";
import GuessingUI from "./components/GuessingUI";
import ActionButton from "./components/ActionButton";
import HealthBar from "./components/HealthBar";
import Hearts from "./components/Hearts";

// ! TODO In final battle log, highlight the last 4 events that happen each hit.
// ! TODO Remove gradient when no scroll, and fade away gradient when scrolled to very top
// TODO Change reference to "battleLog" to "questLog". The Logbook component should be QuestLog also.
// ! TODO When page reloads, a broken image icon flashes behind the art
// ! TODO Map Close-X is mis-positioned in full screen mode.
// ! TODO When map is open, put a dimming overlay behind it
// ! TODO Crete settings menu: change name, end game, kid mode toggle, sound toggle, credits, contact
// ! TODO First image loading needs to be hidden somehow.
// ! TODO Text areas are too big, and should change when there is not UI
// ! TODO add a character limit to name
// ! TODO All text needs to be bigger on high-rez screens... (tablet view)
// ! TODO Proof all the text
// ! TODO Refactor, add function descriptions, and put some functions into separate modules?
// ! Remove dev text and number answer
// TODO Try image transitions as fades?
// TODO Add a map button that opens a simple map showing the 4 levels - portrait and landscape versions
// TODO Should logbook be viewable in the regular levels just showing the guesses and losing health?
// TODO Add some kind of background style to the text part... change based on time of day?
// TODO Add main text reveal animation...
// TODO show loading bar on start page? "Loading artork..."
// TODO Begin and Accept quest button is annoying small
// TODO Improve unicode arrows - use svg instead?
// TODO In final battle, limit the number of guesses... after a certain number... the beast enrages and only delivers crits?!
// TODO test and balance damage of final battle. Add a heal mechanic?
// TODO Add a tutorial?
// TODO Add variations to all the text
// TODO On final pre-win or pre-lose screens, there should be a sound and focus on the flashing 0-health bar.
// TODO Emris idea: add in "kid mode" which would switch to his artwork, make the game easier, and change the text to a younger reading level.
// TODO Emris idea: add a button to reverse game text and artwork, right/left to left/right
// TODO the final screen should be "put on the cloak" or "Continue...?" to loop, where the numbers get higher and higher.
// TODO When the player chooses "put on the cloak", fade to black and then a final story full-page screen about you are drawn to a path, etc., action is: Wait for a Traveler
// TODO Is there a better way to record "A singular strike!" in the logbook upon one-shot (in checkGuess())?
// TODO When player loops, need to handle numbers with commas and other weird spacing issues that will happen

function App() {
  const startingLives = 3;
  const playerStartingHealth = 100;
  const fellowStartingHealth = 100;

  const [isPlaying, setIsPlaying] = useState(
    () => localStorage.getItem("isPlaying") === "true"
  );
  const [player, setPlayer] = useState(() => {
    const storedPlayer = localStorage.getItem("player");
    return storedPlayer
      ? JSON.parse(storedPlayer)
      : {
          name: "Traveler",
          level: 0,
          subLevel: 0,
          guess: "",
          guesses: [],
          lives: startingLives,
          health: playerStartingHealth,
          prevHealth: playerStartingHealth,
          damageTaken: 0,
          isVictim: false,
          isDead: false,
        };
  });
  const [fellow, setFellow] = useState(() => {
    const storedFellow = localStorage.getItem("fellow");
    return storedFellow
      ? JSON.parse(storedFellow)
      : {
          number: 0,
          max: 0,
          response: "",
          health: fellowStartingHealth,
          prevHealth: fellowStartingHealth,
          damageTaken: 0,
          isVictim: false,
          isDead: false,
        };
  });
  const [announcer, setAnnouncer] = useState(() => {
    const storedAnnouncer = localStorage.getItem("announcer");
    return storedAnnouncer
      ? JSON.parse(storedAnnouncer)
      : {
          reaction: "",
          description: "",
          suggestion: "",
          lastDescription: "",
          hasAnnouncement: false,
        };
  });
  const [isEndSubLevel, setIsEndSubLevel] = useState(
    () => localStorage.getItem("isEndSubLevel") === "true"
  );
  const [isLastLevel, setIsLastLevel] = useState(
    () => localStorage.getItem("isLastLevel") === "true"
  );
  const [isPreEndLevel, setIsPreEndLevel] = useState(
    () => localStorage.getItem("isPreEndLevel") === "true"
  );
  const [battleLog, setBattleLog] = useState(() => {
    const storedBattleLog = localStorage.getItem("battleLog");
    return storedBattleLog ? JSON.parse(storedBattleLog) : [];
  });
  const [playerHealthBar, setPlayerHealthBar] = useState(player.health);
  const [beastHealthBar, setBeastHealthBar] = useState(fellow.health);
  const [fightHasStarted, setFightHasStarted] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [screenSize, setScreenSize] = useState(null); // sm, med, lg

  // useEffect(() => {
  //   console.log("Battle Log: ", battleLog);
  // }, [battleLog]);

  // Save game states to local storage when they change
  useEffect(() => {
    localStorage.setItem("isPlaying", JSON.stringify(isPlaying));
  }, [isPlaying]);

  useEffect(() => {
    localStorage.setItem("isEndSubLevel", JSON.stringify(isEndSubLevel));
  }, [isEndSubLevel]);

  useEffect(() => {
    localStorage.setItem("isLastLevel", JSON.stringify(isLastLevel));
  }, [isLastLevel]);

  useEffect(() => {
    localStorage.setItem("isPreEndLevel", JSON.stringify(isPreEndLevel));
  }, [isPreEndLevel]);

  useEffect(() => {
    localStorage.setItem("player", JSON.stringify(player));
  }, [player]);

  useEffect(() => {
    localStorage.setItem("fellow", JSON.stringify(fellow));
  }, [fellow]);

  useEffect(() => {
    localStorage.setItem("announcer", JSON.stringify(announcer));
  }, [announcer]);

  useEffect(() => {
    localStorage.setItem("battleLog", JSON.stringify(battleLog));
  }, [battleLog]);

  // Save screen height and width to state on mount or whenever it changes
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  // Set the screen size descriptor based on width and height to load that set of images
  useEffect(() => {
    if (screenWidth >= screenHeight) {
      if (screenHeight <= 450) setScreenSize("sm");
      else if (screenHeight <= 850) setScreenSize("med");
      else setScreenSize("lg");
    } else {
      if (screenWidth <= 450) setScreenSize("sm");
      else if (screenWidth <= 850) setScreenSize("med");
      else setScreenSize("lg");
    }
  }, [screenWidth, screenHeight]);

  // Set isLastLevel only when player is on level 4
  useEffect(() => {
    if (player.level === 4) {
      setIsLastLevel(true);
    } else {
      setIsLastLevel(false);
    }
  }, [player.level]);

  // Set isPreEndLevel only when player is on level 4 and a pre-ending subLevel
  useEffect(() => {
    if (
      (!isLastLevel && player.subLevel === 2) ||
      (isLastLevel && player.subLevel === 5)
    ) {
      setIsEndSubLevel(true);
    } else setIsEndSubLevel(false);

    if (
      player.subLevel === "preWinLucky" ||
      player.subLevel === "preWinOneShot" ||
      player.subLevel === "preLose"
    ) {
      setIsPreEndLevel(true);
    } else {
      setIsPreEndLevel(false);
    }
  }, [player.subLevel]);

  // Reset defaults when the game ends
  useEffect(() => {
    if (!isPlaying) {
      resetDefaults();
    }
  }, [isPlaying]);

  // Restore player lives, reset guesses, and increase the max number on new level, first subLevel only
  useEffect(() => {
    if (player.subLevel === 1) {
      restoreLives();
      clearGuesses();
      increaseMax();
    }
  }, [player.level]);

  // Update the fellow's number whenenver the max number increases on the first subLevel only
  useEffect(() => {
    if (player.subLevel === 1) {
      setFellow((currentFellow) => {
        return { ...currentFellow, number: getRandomNumber(fellow.max) };
      });
    }
  }, [fellow.max]);

  // Set hasAnnouncement based on if the announcer has any of 3 announcement types
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

  // Save most recent announcer description to be displayed on the pre-win/lose screens
  useEffect(() => {
    if (announcer.description !== "") {
      setAnnouncer((currentAnnouncer) => {
        return {
          ...currentAnnouncer,
          lastDescription: currentAnnouncer.description,
        };
      });
    }
  }, [announcer.description]);

  // Clear announcer and advance the game when either the player or beast dies
  useEffect(() => {
    if (fellow.isDead) {
      console.log("The beast is dead");
      clearAnnouncer();
      advancePlayer();
    } else if (player.isDead) {
      console.log("The player is dead");
      clearAnnouncer();
      loseGame();
    }
  }, [player.isDead, fellow.isDead]);

  // Create all game level data
  const gameLevels = [
    {
      level: 1,
      subLevel: 1,
      text1: "Along a path, you meet a young fellow in a black cloak.",
      text2: "He looks friendly enough... or does he?",
      action: "Approach",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/1-1_${screenSize}.webp`,
      endLevel: false,
    },
    {
      level: 1,
      subLevel: 2,
      text1: "With a curious smirk, he says to you:",
      text2: `“Greetings, ${player.name}! I’m thinking of a number from 1-${fellow.max}. Can you guess it?”`,
      action: "Guess",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/1-2_${screenSize}.webp`,
      endLevel: true,
    },
    {
      level: 1,
      subLevel: "win",
      text1: "With an almost surprised look, the fellow says:",
      text2: `“Very impressive, ${player.name}! You may pass...”`,
      action: "Walk the path",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/1-win_${screenSize}.webp`,
      endLevel: false,
    },
    {
      level: 1,
      subLevel: "lose",
      text1: `The fellow smiles and looks at you darkly. “Sorry, ${player.name}, it was ${fellow.number}.”`,
      text2:
        "His eyes turn black. You suddenly feel heavy and very tired. The world around you begins to fade.",
      action: "Leave this world forever",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/1-lose_${screenSize}.webp`,
      endLevel: false,
    },
    {
      level: 2,
      subLevel: 1,
      text1: "At the edge of a forest, you once again meet your new friend.",
      text2: "Does he still look friendly?",
      action: "Approach",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/2-1_${screenSize}.webp`,
      endLevel: false,
    },
    {
      level: 2,
      subLevel: 2,
      text1: "With a respectful bow, he says to you:",
      text2: `“Hello again, ${player.name}! From 1-${fellow.max}, now what number might I be thinking of?”`,
      action: "Guess",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/2-2_${screenSize}.webp`,
      endLevel: true,
    },
    {
      level: 2,
      subLevel: "win",
      text1: "With a glimpse of annoyance masked by charm, the fellow says:",
      text2: `“You win again, ${player.name}! Go ahead... if you must.”`,
      action: "Step into the forest",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/2-win_${screenSize}.webp`,
      endLevel: false,
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
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/2-lose_${screenSize}.webp`,
      endLevel: false,
    },
    {
      level: 3,
      subLevel: 1,
      text1: "You reach a long, worn bridge, the only way forward.",
      text2: "At the bridge’s mouth, you spy the shape of your old friend.",
      text3: "It appears he has been waiting for you.",
      action: "Approach",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/3-1_${screenSize}.webp`,
      endLevel: false,
    },
    {
      level: 3,
      subLevel: 2,
      text1: "Serious now, he asks you directly:",
      text2: `“What’s my number, ${player.name}? From 1-${fellow.max}...”`,
      text3: `His voice deepens. “The darkness awaits...”`,
      action: "Guess",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/3-2_${screenSize}.webp`,
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
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/3-win_${screenSize}.webp`,
      endLevel: false,
    },
    {
      level: 3,
      subLevel: "lose",
      text1: `"The fellow shivers with a mixture of relief, pain, and joy. His eyes roll back. “This is it, dear ${player.name}... my number was ${fellow.number}.”`,
      text2:
        "His form begins to grow and the blacks of his cloak become blacker and wider until shrouding anything and everything.",
      text3: "Especially you.",
      action: "Become one with darkness",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/3-lose_${screenSize}.webp`,
      endLevel: false,
    },
    {
      level: 4,
      subLevel: 1,
      text1: "Wait... is this not the end?",
      text2: "Beyond the bridge is a cave.",
      text3: "You hesitantly approach.",
      action: "Step inside",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/4-1_${screenSize}.webp`,
      endLevel: false,
    },
    {
      level: 4,
      subLevel: 2,
      text1: "In the darkness, you think you see a form.",
      text2: "Could it be him?",
      action: "Approach",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/4-2_${screenSize}.webp`,
      endLevel: false,
    },
    {
      level: 4,
      subLevel: 3,
      text1: "The form moves suddenly. It jerks and moans.",
      text2: "You think you hear your name, almost in a whimper.",
      text3: "It is becoming something much larger...",
      action: "Turn back and run",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/4-3_${screenSize}.webp`,
      endLevel: false,
    },
    {
      level: 4,
      subLevel: 4,
      text1:
        "In a brief shimmer of light, you can see it has sharp, twisted numbers growing out of its body.",
      text2: "It locks its black eyes on you and roars!",
      action: "Try desperately to escape",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/4-4_${screenSize}.webp`,
      endLevel: false,
    },
    {
      level: 4,
      subLevel: 5,
      text1:
        "The beast is quick! As if teleporting, you instantly see it lifting a razor sharp claw.",
      text2: `Quickly, ${player.name}, it must have a weak spot!`,
      text3: `From 1-${fellow.max}, you must find it!`,
      action: "Fight!", // Initiate health bars & fight sequence
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/4-5_${screenSize}.webp`,
      endLevel: true,
    },
    {
      level: 4,
      subLevel: "preWinLucky",
      text1: ``,
      text2: `Perhaps you have been anointed with luck by some holy numerical force. As you did not find the beast’s weak spot, he is fallen still, fetal and trembling, revealing a glowing red ${fellow.number} at the nape of his neck.`,
      text3: `You pick up a nearby stick and walk toward the pathetic creature.`,
      action: `Poke the glowing red ${fellow.number}`,
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/4-preWinLucky_${screenSize}.webp`,
      endLevel: false,
    },
    {
      level: 4,
      subLevel: "preWinOneShot",
      text1: `A singular strike!`,
      text2: `As if spied from on high, you perfectly strike the now-obvious glowing red ${fellow.number} at the nape of beast’s neck. In an instant, the beast was done!`,
      text3: `All of the beast’s ferocity and fight disappears as its body falls to the ground before you. Everything is suddenly silent. You grab a long, sharp stick...`,
      action: "Nudge the beast to be sure",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/4-preWinOneShot_${screenSize}.webp`,
      endLevel: false,
    },
    {
      level: 4,
      subLevel: "preLose",
      text1: ``,
      text2: `You collapse to the ground, as if your body has turned to liquid. Is this death? You remember having a dream about this once.`,
      text3: `If only you had aimed higher, or lower... does it even matter now? You hear stone crushing beneath the beast’s cloven hooves inches from your throbbing ears.`,
      action: "Try to lift your head",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/4-preLose_${screenSize}.webp`,
      endLevel: false,
    },
    {
      level: 4,
      subLevel: "win",
      text1: `The beast cries out and roars: “What have you done, ${player.name}? You were supposed to be my precious number ${fellow.number}!”`,
      text2: `Suddenly, the beast bursts into black flames. He reaches out a trembling finger, whispers your name... “${player.name}...” and is instantly swallowed whole by the darkness, leaving only the empty black cloak to collapse on the ground.`,
      text3: "You pick it up. It still feels warm. You ponder.",
      action: "Put on the cloak?",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/4-win_${screenSize}.webp`,
      endLevel: false,
    },
    {
      level: 4,
      subLevel: "lose",
      text1: `The beast picks you up above its great numbered horns.`,
      text2: `“You are mine! You shall become my number ${fellow.number}!”`,
      text3: `As the beast widens its toothy maw, you hear ${
        fellow.number === 1
          ? "only the deafening sound of silence."
          : fellow.number === 2
          ? "only 1 other tortured voice soon to be joined with your own."
          : fellow.number === 3
          ? "a duo of tortured voices soon to be joined with your own."
          : fellow.number === 4
          ? "a trio of tortured voices soon to be joined with your own."
          : fellow.number === 5
          ? "a quartet of tortured voices soon to be joined with your own."
          : `a symphony of ${
              fellow.number - 1
            } tortured voices soon to be joined with your own.`
      }`,
      action: "To the pit",
      image: `${
        import.meta.env.VITE_BASE_URL
      }img/tempart/4-lose_${screenSize}.webp`,
      endLevel: false,
    },
  ];

  // Pre-load all images that are most appropriate for the current screen size
  useEffect(() => {
    // console.log(screenSize);
    gameLevels.forEach((level) => {
      const img = new Image();
      img.src = level.image; // Trigger browser to start loading the image
    });
  }, [screenSize]);

  // Add to the battle log whenever there is leve text, a fellow response, or announcer description
  useEffect(() => {
    // Prevent duplicate entries
    const level = player.level;
    const subLevel = player.subLevel;
    const turn = player.guesses.length;
    const guess = player.guesses[turn - 1];
    const logId = `${level}-${subLevel}-${turn}`;
    const levelSubLevel = `${level}-${subLevel}`;
    const existingId = battleLog.find((log) => log.id === logId);
    const existingLevel = battleLog.find((log) => log.level === levelSubLevel);

    const currentGameLevel = gameLevels.find(
      (level) =>
        level.level === player.level && level.subLevel === player.subLevel
    );

    // Is not the final level
    if (!isLastLevel) {
      //Is a narration subLevel
      if (!isEndSubLevel && subLevel !== "win" && subLevel !== "lose") {
        if (!existingLevel) {
          logNarrationLevel(currentGameLevel);
        }
        // Handle win/lose
      } else if (subLevel === "win" || subLevel === "lose") {
        if (!existingId && currentGameLevel) {
          setBattleLog((currentBattleLog) => [
            ...currentBattleLog,
            {
              id: logId,
              text: `You guess ${guess}.`,
              type: "guess",
            },
            {
              id: logId,
              text: `${currentGameLevel.text1} ${currentGameLevel.text2} ${
                currentGameLevel.text3 ? currentGameLevel.text3 : ""
              }`,
              type: subLevel === "lose" ? "lose" : "win",
            },
          ]);
        }
        // Guessing subLevel
      } else {
        if (guess && !existingId) {
          setBattleLog((currentBattleLog) => [
            ...currentBattleLog,
            {
              id: logId,
              text: `You guess ${guess}.`,
              type: "guess",
            },
            {
              id: logId,
              text: fellow.response,
              type: "response",
            },
          ]);
        }
      }
    }

    // Is last level
    if (isLastLevel) {
      //Is a narration subLevel (includes final win/lose subLevels)
      if (!isEndSubLevel && !isPreEndLevel) {
        if (!existingLevel) {
          logNarrationLevel(currentGameLevel);
        }
        // Handle preEnd level
      } else if (isPreEndLevel) {
        if (!existingId && currentGameLevel) {
          // Player one-shot the beast
          if (subLevel === "preWinOneShot") {
            setBattleLog((currentBattleLog) => [
              ...currentBattleLog,
              {
                id: logId,
                text: `You confidently aim at ${fellow.number}...`,
                type: "guess",
              },
              {
                id: logId,
                text: "You strike the weak-spot and one-shot The Beast!",
                type: "fight",
              },
              {
                id: logId,
                text: `${player.name}: ${player.health}, The Beast: ${fellow.health}`,
                type: "health",
              },
              {
                id: logId,
                text: `${currentGameLevel.text1} ${currentGameLevel.text2} ${
                  currentGameLevel.text3 ? currentGameLevel.text3 : ""
                }`,
                type: "victory",
              },
            ]);
            // Player got lucky and killed the beast
          } else if (subLevel === "preWinLucky") {
            setBattleLog((currentBattleLog) => [
              ...currentBattleLog,
              {
                id: logId,
                text: `You blindly aim for ${player.guesses[turn - 1]}!`,
                type: "guess",
              },
              {
                id: logId,
                text: `Your final attack is a lucky thousandth cut. ${announcer.lastDescription}`,
                type: "fight",
              },
              {
                id: logId,
                text: `${player.name}: ${player.health}, The Beast: ${fellow.health}`,
                type: "health",
              },
              {
                id: logId,
                text: `${currentGameLevel.text1} ${currentGameLevel.text2} ${
                  currentGameLevel.text3 ? currentGameLevel.text3 : ""
                }`,
                type: "victory",
              },
            ]);
            // Player is is killed by the beast
          } else if (subLevel === "preLose") {
            setBattleLog((currentBattleLog) => [
              ...currentBattleLog,
              {
                id: logId,
                text: `You aim for ${player.guesses[turn - 1]}!`,
                type: "guess",
              },
              {
                id: logId,
                text: `Your lack of precision is finally answered: ${announcer.lastDescription}`,
                type: "fight",
              },
              {
                id: logId,
                text: `${player.name}: ${player.health}, The Beast: ${fellow.health}`,
                type: "health",
              },
              {
                id: logId,
                text: `${currentGameLevel.text1} ${currentGameLevel.text2} ${
                  currentGameLevel.text3 ? currentGameLevel.text3 : ""
                }`,
                type: "lose",
              },
            ]);
          }
        }
        // Guessing (fighting) subLevel
      } else {
        if (
          !existingId &&
          announcer.description !== "" &&
          player.health !== 0 &&
          fellow.health !== 0
        ) {
          setBattleLog((currentBattleLog) => [
            ...currentBattleLog,
            {
              id: logId,
              text: `You aim for ${player.guesses[turn - 1]}!`,
              type: "guess",
            },
            { id: logId, text: announcer.description, type: "fight" },
            {
              id: logId,
              text: `${player.name}: ${player.health}, The Beast: ${fellow.health}`,
              type: "health",
            },
            { id: logId, text: announcer.suggestion, type: "suggestion" },
          ]);
        }
      }
    }
  }, [
    player.level,
    player.subLevel,
    isEndSubLevel,
    isPreEndLevel,
    player.guesses,
    player.lives,
    player.health,
    fellow.health,
    fellow.response,
    announcer.description,
  ]);

  function logNarrationLevel(currentGameLevel) {
    if (currentGameLevel) {
      setBattleLog((currentBattleLog) => [
        ...currentBattleLog,
        {
          level: `${currentGameLevel.level}-${currentGameLevel.subLevel}`,
          text: `${currentGameLevel.text1} ${currentGameLevel.text2} ${
            currentGameLevel.text3 ? currentGameLevel.text3 : ""
          }`,
          type: "narration",
        },
      ]);
    }
  }

  // Reset all the game defaults ready for another play through
  function resetDefaults() {
    setPlayer((currentPlayer) => {
      return {
        ...currentPlayer,
        level: 0,
        subLevel: 0,
        guess: "",
        guesses: [],
        lives: startingLives,
        health: playerStartingHealth,
        prevHealth: playerStartingHealth,
        damageTaken: 0,
        isVictim: false,
        isDead: false,
      };
    });
    setFellow((currentFellow) => {
      return {
        ...currentFellow,
        number: 0,
        max: 0,
        response: "",
        health: fellowStartingHealth,
        prevHealth: fellowStartingHealth,
        damageTaken: 0,
        isVictim: false,
        isDead: false,
      };
    });
    setAnnouncer((currentAnnouncer) => {
      return {
        ...currentAnnouncer,
        reaction: "",
        description: "",
        suggestion: "",
        lastDescription: "",
        hasAnnouncement: false,
      };
    });
    setBattleLog([]);
    setPlayerHealthBar(playerStartingHealth);
    setBeastHealthBar(fellowStartingHealth);
    setIsEndSubLevel(false);
    setIsLastLevel(false);
    setIsPreEndLevel(false);
  }

  function getRandomNumber(max) {
    return Math.floor(Math.random() * max + 1);
  }

  function toggleIsPlaying() {
    if (!isPlaying) setIsPlaying(true);
    else setIsPlaying(false);
  }

  function increaseMax() {
    let max = fellow.max;
    if (player.level === 1) max = 10;
    else if (player.level === 2) max = 25;
    else if (player.level === 3) max = 50;
    else if (player.level === 4) max = 100;
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
    if (currentGameLevel) {
      if (currentGameLevel.subLevel === "win" && !isLastLevel)
        // If current level is a win and not the last level, advance level
        advancePlayerLevel();
      else if (
        (isLastLevel && currentGameLevel.subLevel === "win") ||
        currentGameLevel.subLevel === "lose"
      ) {
        // Is last level and player has either won or lost, so the game is over
        endGame();
      } else {
        // Otherwise, just advance subLevel
        advancePlayerSubLevel(currentGameLevel);
      }
    } else {
      endGame();
    }
  }

  function advancePlayerSubLevel(level) {
    // Advance when on the last level
    if (isLastLevel) {
      // During the guess phase of the last level
      if (level.endLevel) {
        // Player guesses the right number
        if (player.guess === fellow.number) {
          setPlayer((currentPlayer) => {
            return { ...currentPlayer, subLevel: "preWinOneShot" };
          });
          // Player did not guess the right number
        } else {
          // Player kills the beast
          if (fellow.isDead) {
            setPlayer((currentPlayer) => {
              return { ...currentPlayer, subLevel: "preWinLucky" };
            });
            // The beast kills the player
          } else if (player.isDead) {
            loseGame();
          }
        }
        // Player is on one of the preWin screens
      } else if (
        level.subLevel === "preWinOneShot" ||
        level.subLevel === "preWinLucky"
      ) {
        setPlayer((currentPlayer) => {
          return { ...currentPlayer, subLevel: "win" };
        });
        // Player is on preLose screen
      } else if (level.subLevel === "preLose") {
        setPlayer((currentPlayer) => {
          return { ...currentPlayer, subLevel: "lose" };
        });
        // Player is on all other last-level screens, heading toward the fight
      } else {
        setPlayer((currentPlayer) => {
          return { ...currentPlayer, subLevel: player.subLevel + 1 };
        });
      }
      // Advance when not on the last level
    } else {
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
  }

  function advancePlayerLevel() {
    setPlayer((currentPlayer) => {
      return { ...currentPlayer, level: player.level + 1, subLevel: 1 };
    });
  }

  function inputDigit(digit) {
    const newNumber = parseInt(`${player.guess}${digit}`);
    // The number is out of range
    if (newNumber < 1 || newNumber > fellow.max) {
      if (isLastLevel) {
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
      // The number is in range
    } else {
      if (isLastLevel) {
        clearAnnouncer();
        respond(
          "suggestion",
          `Aim true, ${player.name}!`,
          `Is that the beast’s weak spot?`,
          `Be certain before you strike.`,
          `Don’t move until you see it.`,
          `Do you see it?`,
          `Strike with confidence!`,
          `Strike only the weak spot!`,
          `Did you find it?`,
          `Do you know where it is?`,
          `Be sure of it!`
        );
      } else {
        // It is the first digit entered
        respond(
          "fellow",
          `“Are you certain about that?”`,
          `“Are you certain?”`,
          `“Could it be that simple?”`,
          `“Are you sure?”`,
          `“Is that it?”`,
          `“Is that my number?”`,
          `“Could that be it?”`,
          `“Is that really your guess?”`,
          `“Do you think that’s it?”`,
          `“Do you really think?”`
        );
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
    const validTypes = ["reaction", "description", "suggestion"];
    if (types.length === 0) {
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
          setAnnouncer((currentAnnouncer) => {
            return {
              ...currentAnnouncer,
              [type]: "",
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
    if (player.isDead) {
      // Player has died ont he last level
      setPlayer((currentPlayer) => {
        return { ...currentPlayer, subLevel: "preLose" };
      });
    } else {
      // Player has died on any other level
      setPlayer((currentPlayer) => {
        return { ...currentPlayer, subLevel: "lose" };
      });
    }
  }

  function loseALife() {
    setPlayer((currentPlayer) => {
      return { ...currentPlayer, lives: player.lives - 1 };
    });
  }

  function restoreLives() {
    setPlayer((currentPlayer) => {
      // if (player.level === currentPlayer.level) return currentPlayer;
      return { ...currentPlayer, lives: startingLives + player.level };
    });
  }

  function clamp(num) {
    if (num < 0) return 0;
    return num;
  }

  function rollVictim() {
    // Return either "player" or "beast" to be attacked
    const roll = Math.floor(Math.random() * 2);
    let victim;
    if (roll === 0) {
      victim = "beast";
      victimize(victim);
      return victim;
    } else {
      victim = "player";
      victimize(victim);
      return victim;
    }
    // Player wins beast (testing)
    // const roll = Math.floor(Math.random() * 10);
    // let victim;
    // if (roll === 0) {
    //   victim = "player";
    //   victimize(victim);
    //   return victim;
    // } else {
    //   victim = "beast";
    //   victimize(victim);
    //   return victim;
    // }
  }

  function victimize(victim) {
    if (victim === "beast") {
      setPlayer((currentPlayer) => {
        return { ...currentPlayer, isVictim: false };
      });
      setFellow((currentFellow) => {
        return { ...currentFellow, isVictim: true };
      });
    } else if (victim === "player") {
      setPlayer((currentPlayer) => {
        return { ...currentPlayer, isVictim: true };
      });
      setFellow((currentFellow) => {
        return { ...currentFellow, isVictim: false };
      });
    } else {
      console.log("Invalid victim, no victim set");
    }
  }

  function roll20() {
    // roll 20 to decide what happens in the attack
    const roll = Math.floor(Math.random() * 20 + 1);
    return roll;
  }

  function damageVictim(victim, roll) {
    let damage;
    if (victim === "beast") {
      switch (roll) {
        case 1:
          damage = 0;
          respond(
            "reaction",
            "The beast is too quick!",
            "The beast moves faster than you can see!",
            "The beast moves wildly. He is one with the darkness."
          );
          respond(
            "description",
            "You swing your fist wildly but miss.",
            "You swing! But miss...",
            "You throw a powerful fist... it hits nothing."
          );
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
          damage = 3;
          respond(
            "reaction",
            "The beast is distracted!",
            "The beast is confused.",
            "The beast is turned around!"
          );
          respond(
            "description",
            `You run up and kick the the beast in the shin for ${damage} damage.`,
            `You sneak up and take a cheap shot for ${damage} damage.`,
            `You give him a smack for ${damage} damage.`
          );
          break;
        case 7:
        case 8:
        case 9:
          damage = 5;
          respond(
            "reaction",
            "The beast takes a hit but its armor is strong!",
            "The beast flexes his chest.",
            "The beast begins to charge but trips on a loose stone."
          );
          respond(
            "description",
            `You jab the beast for ${damage} damage.`,
            `You poke him in the eyes for ${damage} damage.`,
            `You sucker punch him in the gut for ${damage} damage.`
          );
          break;
        case 10:
        case 11:
        case 12:
          damage = 7;
          respond(
            "reaction",
            "The beast lowers his defenses.",
            "The beast lowers his guard.",
            "The beast roars."
          );
          respond(
            "description",
            `You throw a rock for ${damage} damage.`,
            `You kick dirt in his eyes for ${damage} damage.`,
            `You throw your shoe at him for ${damage} damage.`
          );
          break;
        case 13:
        case 14:
        case 15:
        case 16:
          damage = 10;
          respond(
            "reaction",
            "The beast is blindsided!",
            "The beast shows a brief glimmer of weakness.",
            "Is this beast not invicible after all?"
          );
          respond(
            "description",
            `You surprise him with a jump kick for ${damage} damage!`,
            `You move in low and deliver a surprising uppercut for ${damage} damage!`,
            `You try to choke him out for ${damage} damage!`
          );
          break;
        case 17:
        case 18:
          damage = 15;
          respond(
            "reaction",
            "The beast gets knocked down!",
            "The beast is down... now is your chance!",
            "The beast looses its hoofing."
          );
          respond(
            "description",
            `You slam the beast for ${damage} damage!`,
            `You ground pound the beast for ${damage} damage!`,
            `You surprise the beast with a ${damage}-damage roundhouse!`
          );
          break;
        case 19:
          damage = 17;
          respond(
            "reaction",
            "The beast falls over...",
            "The beast begins to charge...",
            "The beast leans in forward..."
          );
          respond(
            "description",
            `You kick it in the horn for ${damage} damage!`,
            `You pop him in the chin for ${damage} damage!`
          );
          break;
        case 20:
          damage = 20;
          respond("reaction", "The beast is stunned!");
          respond(
            "description",
            `You deliver a decisive critical hit for ${damage} damage!`
          );
          break;
        default:
          damage = 1;
          respond("reaction", "The beast is tickled.");
          respond("description", `You poke the beast for ${damage} damage!`);
      }
      setFellow((currentFellow) => {
        return {
          ...currentFellow,
          health: clamp(fellow.health - damage),
          prevHealth:
            currentFellow.health > 0
              ? currentFellow.health
              : currentFellow.prevHealth,
          damageTaken: damage,
        };
      });
    } else if (victim === "player") {
      switch (roll) {
        case 1:
          damage = 0;
          respond(
            "reaction",
            "You jump to the side!",
            "You fake him out!",
            "You feign left, then right..."
          );
          respond(
            "description",
            `The beast swipes and misses.`,
            `The beast misses and roars in anger.`,
            `The beast’s powerful claw whiffs the air.`
          );
          break;
        case 2:
        case 3:
          damage = 15;
          respond(
            "reaction",
            "The beast begins to charge!",
            "The beast comes right for you!",
            "The beast is on the hunt!"
          );
          respond(
            "description",
            `You dodge but run into the wall for ${damage} damage.`,
            `He knocks you down for for ${damage} damage.`,
            `You try a fancy dodge but twist your ankle for ${damage} damage.`
          );
          break;
        case 4:
        case 5:
        case 6:
          damage = 17;
          respond(
            "reaction",
            "The beast lands a swipe to your shoulder!",
            "The beast swoops and slashes!",
            "The beast bites with his terrible jaws!"
          );
          respond(
            "description",
            `You take ${damage} damage.`,
            `You cry out and take ${damage} damage.`
          ),
            `You are hit for ${damage} damage.`;
          break;
        case 7:
        case 8:
        case 9:
        case 10:
          damage = 20;
          respond(
            "reaction",
            "The beast conjures a bow with fire arrows!",
            "The beast conjures a fireball!",
            "The beast sprays you with vile poison!"
          );
          respond(
            "description",
            `He goes for a headshot but ends up grazing your ear for ${damage} damage.`,
            `You are hit in the knee and thrown into the stone behind you for ${damage} damage!`,
            `The powerful hit sends you flying back for ${damage} damage.`
          );
          break;
        case 11:
        case 12:
        case 13:
        case 14:
          damage = 25;
          respond(
            "reaction",
            "You lose your footing.",
            "You fall over.",
            "You trip over your own feet."
          );
          respond(
            "description",
            `The beast takes a swipe for ${damage} damage!`,
            `The beast leaps and slashes for ${damage} damage!`,
            `The beast swipes in a flurry for ${damage} damage!`
          );
          break;
        case 15:
        case 16:
        case 17:
          damage = 27;
          respond(
            "reaction",
            "The beast leaps!",
            "The beast attacks!",
            "The beast locks onto you!"
          );
          respond(
            "description",
            `You turn as he claws your back for ${damage} damage!`,
            `You run but he swipes your Achilles heel for ${damage} damage!`,
            `You cannot escape his reach! You take ${damage} damage!`
          );
          break;
        case 18:
        case 19:
          damage = 30;
          respond("reaction", "Whip-crack went his whippy tail!");
          respond(
            "description",
            `The beast whips your cheek for ${damage} damage.`
          );
          break;
        case 20:
          damage = 35;
          respond("reaction", "The beast strikes with BOTH claws!");
          respond(
            "description",
            `You take a wicked critical hit for ${damage} damage!`
          );
          break;
        default:
          damage = 35;
          respond("reaction", "The beast strikes with BOTH claws!");
          respond(
            "description",
            `You take a wicked critical hit for ${damage} damage!`
          );
      }
      setPlayer((currentPlayer) => {
        return {
          ...currentPlayer,
          health: clamp(player.health - damage),
          prevHealth:
            currentPlayer.health > 0
              ? currentPlayer.health
              : currentPlayer.prevHealth,
          damageTaken: damage,
        };
      });
    }
    return damage;
  }

  function toggleDeath(victim) {
    if (victim === "player") {
      setPlayer((currentPlayer) => {
        return {
          ...currentPlayer,
          isDead: true,
          health: 0,
          prevHealth:
            currentPlayer.health > 0
              ? currentPlayer.health
              : currentPlayer.prevHealth,
        };
      });
    } else if (victim === "beast") {
      setFellow((currentFellow) => {
        return {
          ...currentFellow,
          isDead: true,
          health: 0,
          prevHealth:
            currentFellow.health > 0
              ? currentFellow.health
              : currentFellow.prevHealth,
          damageTaken: currentFellow.health,
        };
      });
    }
  }

  function endGame() {
    toggleIsPlaying();
  }

  function checkGuess() {
    if (isLastLevel) {
      setFightHasStarted(true);
      // Player is on last level
      if (!player.guess) {
        // Repond if there is no guess
        clearAnnouncer("reaction", "description");
        respond(
          "suggestion",
          `There is no time to waste, ${player.name}, you are under attack!`,
          `Quit messing around and fight for your life!`,
          `Continue to do nothing and meet your end surely, ${player.name}!`
        );
      } else if (player.guess === fellow.number) {
        victimize("beast");
        toggleDeath("beast");
      } else {
        // Player, on last level, guessed the wrong number
        const victim = rollVictim();
        const roll = roll20();
        const damage = damageVictim(victim, roll);

        if (
          (player.health - damage < 1 && victim === "player") ||
          (fellow.health - damage < 1 && victim === "beast")
        ) {
          // If there is a killing blow
          toggleDeath(victim);
          // advancePlayer();
        } else {
          // There is no killing blow
          if (player.guesses.includes(player.guess)) {
            // Respond if player already made the guess
            respond(
              "suggestion",
              `No use striking the same armored spot! Find his weak spot!`,
              `Why repeat your failures, ${player.name}? Do you not see the beast before you?`,
              `Try something new, ${player.name}!`,
              `Do you not remember already trying that?`,
              `You already hit him there to little effect. Hit him where it counts!`,
              `${player.name}, didn’t you already try that? You must find his weak spot!`
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
        }
        // Add to player guesses
        addToGuesses();
      }
    }

    // Player is NOT on last level
    if (!isLastLevel) {
      if (!player.guess)
        respond(
          "fellow",
          `“Won’t you even try, ${player.name}?”`,
          `“You can do much better than that, ${player.name}?”`,
          `“Do you refuse to guess, ${player.name}?”`
        );
      else if (player.guess === fellow.number) {
        addToGuesses();
        clearResponse();
        clearAnnouncer();
        advancePlayer();
      } else {
        addToGuesses();
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
              `“I don’t recommend wasting any more guesses, ${player.name}.”`
            );
          } else if (player.guess < fellow.number) {
            // Respond to player's too-low guess
            respond(
              "fellow",
              `“Regretfully, no. Try higher, ${player.name}.”`,
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
        }
      }
    }

    // Clear player's incorrect guesss, retaining the final level guess if correct
    if (!isLastLevel) clearGuess();
    else if (isLastLevel && player.guess !== fellow.number) {
      clearGuess();
    }
  }

  return (
    <div className="container">
      {!isPlaying ? (
        <TitleScreen toggleIsPlaying={toggleIsPlaying} />
      ) : (
        <>
          {player.level === 0 ? (
            <EnterName
              setPlayer={setPlayer}
              advancePlayerLevel={advancePlayerLevel}
              name={player.name}
            />
          ) : (
            <div className="game-container">
              <GameImage
                // TODO Clean up unused props after game art is put in
                gameLevels={gameLevels}
                player={player}
                fellow={fellow}
                fellowStartingHealth={fellowStartingHealth}
                isEndSubLevel={isEndSubLevel}
                isLastLevel={isLastLevel}
                isPreEndLevel={isPreEndLevel}
                beastHealthBar={beastHealthBar}
                setBeastHealthBar={setBeastHealthBar}
                fightHasStarted={fightHasStarted}
                endGame={endGame}
                battleLog={battleLog}
              />
              <div className="game-text-relative-container">
                {!isLastLevel && isEndSubLevel ? (
                  <Hearts
                    isLastLevel={isLastLevel}
                    isEndSubLevel={isEndSubLevel}
                    lives={player.lives}
                    guesses={player.guesses}
                    number={fellow.number}
                    max={fellow.max}
                  />
                ) : null}
                {isLastLevel && (player.subLevel === 5 || isPreEndLevel) ? (
                  <HealthBar
                    character={"player"}
                    name={player.name}
                    lives={player.lives}
                    maxHealth={playerStartingHealth}
                    startHealth={player.prevHealth}
                    endHealth={player.health}
                    damageTaken={player.damageTaken}
                    characterIsVictim={player.isVictim}
                    healthBar={playerHealthBar}
                    setHealthBar={setPlayerHealthBar}
                    turn={player.guesses.length}
                    guesses={player.guesses}
                    number={fellow.number}
                    max={fellow.max}
                    fightHasStarted={fightHasStarted}
                  />
                ) : null}
                {gameLevels.map((level) => {
                  if (
                    level.level === player.level &&
                    level.subLevel === player.subLevel
                  ) {
                    return (
                      <div
                        key={`${level.level}${level.subLevel}`}
                        className="game-text-container"
                      >
                        <GameText
                          level={level}
                          player={player}
                          fellow={fellow}
                          announcer={announcer}
                          isEndSubLevel={isEndSubLevel}
                          isLastLevel={isLastLevel}
                          isPreEndLevel={isPreEndLevel}
                        />
                        {level.endLevel ? (
                          <GuessingUI
                            level={level}
                            player={player}
                            inputDigit={inputDigit}
                            clearGuess={clearGuess}
                            clearAnnouncer={clearAnnouncer}
                            respond={respond}
                            checkGuess={checkGuess}
                            isEndSubLevel={isEndSubLevel}
                            isLastLevel={isLastLevel}
                          />
                        ) : (
                          <ActionButton
                            advancePlayer={advancePlayer}
                            level={level}
                          />
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
