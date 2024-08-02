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
  const btnContainerRef = useRef(null);
  const startingWidth = 10;
  const gapFactor = 4; // Gap will be 1/4 button width
  const pixelBuffer = 10; // Attempts to prevent overflow
  const [buttonWidth, setButtonWidth] = useState(startingWidth);
  const [buttonGap, setButtonGap] = useState(startingWidth / gapFactor);
  const [btnAnimation, setBtnAnimation] = useState(null);
  const buttonFontSize = buttonWidth / 1.75;

  function resizeBtnWidthToFit() {
    if (guessingUIContainerRef.current && btnContainerRef.current) {
      const guessingUIContainer = guessingUIContainerRef.current;
      const btnContainer = btnContainerRef.current;
      const buttons = btnContainer.querySelectorAll(".number-btn");

      // Set each button starting width
      let currentWidth = startingWidth;
      buttons.forEach((button) => {
        button.style.width = `${currentWidth}px`;
      });

      // Set starting button gap
      let currentGap = currentWidth / gapFactor;
      btnContainer.style.setProperty("gap", `${currentGap}px`);

      // Increase the button width until its container is as wide as guessingUIContainer
      while (
        btnContainer.scrollWidth <=
        guessingUIContainer.clientWidth - pixelBuffer
      ) {
        // Increase button width
        currentWidth++;
        buttons.forEach((button) => {
          button.style.width = `${currentWidth}px`;
        });

        // Set button gap
        currentGap = currentWidth / gapFactor;
        btnContainer.style.setProperty("gap", `${currentGap}px`);
      }

      setButtonWidth(currentWidth - 1);
      setButtonGap((currentWidth - 1) / gapFactor);

      // Fade-in button after resizing flashing is finished
      setBtnAnimation("0.25s fade-in ease");
    }
  }

  useEffect(() => {
    resizeBtnWidthToFit(); // resize buttons to fit container component mount
    window.addEventListener("resize", resizeBtnWidthToFit); // resize buttons upon window resize
    return () => window.removeEventListener("resize", resizeBtnWidthToFit);
  }, [isEndSubLevel]);

  useEffect(() => {
    console.log({ buttonWidth });
    console.log({ buttonGap });
    console.log({ buttonFontSize });
  }, []);

  return (
    <div ref={guessingUIContainerRef} className="guessing-ui-container">
      <div className="your-guess">{player.guess}</div>
      <div
        ref={btnContainerRef}
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
                  width: `${buttonWidth}px`,
                  height: `${buttonWidth}px`,
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
    </div>
  );
}
