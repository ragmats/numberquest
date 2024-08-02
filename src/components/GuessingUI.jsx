import { useEffect, useRef, useState } from "react";

export default function GuessingUI({
  level,
  player,
  inputDigit,
  clearGuess,
  clearAnnouncer,
  respond,
  checkGuess,
  isEndSubLevel,
  isLastLevel,
}) {
  const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const guessingUIContainerRef = useRef(null);
  const startingVal = 10;
  const gapFactor = 4; // Gap will be 1/4 button width
  const fontFactor = 1.75; // Font size will be 1/1.75 button width
  const [buttonWidth, setButtonWidth] = useState(startingVal);
  const [buttonGap, setButtonGap] = useState(startingVal / gapFactor);
  const [buttonFontSize, setButtonFontSize] = useState(startingVal);
  const [btnAnimation, setBtnAnimation] = useState(null);

  function getPerfectButtonWidth() {
    if (guessingUIContainerRef) {
      const maxWidth = guessingUIContainerRef.current.clientWidth;
      const startingWidth = 10;
      const startingGap = startingWidth / gapFactor;
      let currentWidth = startingWidth;
      let currentGap = startingGap;
      while (currentWidth * 10 + currentGap * 9 < maxWidth) {
        currentWidth++;
        currentGap = currentWidth / gapFactor;
      }
      setButtonWidth(currentWidth - 1);
    }
  }

  useEffect(() => {
    getPerfectButtonWidth(); // resize buttons to fit container component mount
    window.addEventListener("resize", getPerfectButtonWidth); // resize buttons upon window resize
    return () => window.removeEventListener("resize", getPerfectButtonWidth);
  }, []);

  useEffect(() => {
    console.log({ buttonWidth });
    setButtonFontSize(buttonWidth / fontFactor);
    setButtonGap(buttonWidth / gapFactor);
    setBtnAnimation("0.25s fade-in ease");
  }, [buttonWidth]);

  return (
    <div ref={guessingUIContainerRef} className="guessing-ui-container">
      {player.guess ? (
        <div className="guess-btns">
          <button
            onClick={() => {
              clearGuess(level);
              clearAnnouncer();
              if (player.guess) {
                if (isLastLevel) {
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
              } else if (isLastLevel) {
                respond(
                  "suggestion",
                  `It’s clear enough. Strike the beast!`,
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
          <button onClick={() => checkGuess()}>{level.action}</button>
        </div>
      ) : null}
      <div className="your-guess">{player.guess}</div>
      <div
        style={{
          gap: `${buttonGap}px`,
          animation: btnAnimation,
          opacity: btnAnimation ? 1 : 0,
        }}
        className="number-btns-container"
      >
        {numberButtons.map((numberButton) => {
          return (
            <div key={crypto.randomUUID()}>
              <button
                style={{
                  width: `${buttonWidth}px`, // is initially set to 33 ??
                  height: `${buttonWidth}px`, // is intially set to 32 ??
                  fontSize: `${buttonFontSize}px`,
                }}
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
      {/* <div className="guess-btns">
        <button
          onClick={() => {
            clearGuess(level);
            clearAnnouncer();
            if (player.guess) {
              if (isLastLevel) {
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
            } else if (isLastLevel) {
              respond(
                "suggestion",
                `It’s clear enough. Strike the beast!`,
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
        <button onClick={() => checkGuess()}>{level.action}</button>
      </div> */}
    </div>
  );
}
