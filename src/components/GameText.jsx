import { useEffect, useRef, useState } from "react";

export default function GameText({
  level,
  player,
  fellow,
  announcer,
  isEndSubLevel,
  isLastLevel,
  isPreEndLevel,
}) {
  const startingFontSize = 2;
  const maxFontSize = 30;
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const [fontSize, setFontSize] = useState(startingFontSize);
  const [textAnimation, setTextAnimation] = useState(null);

  // Calculate the perfect font size using a hidden element that matches the real one in size
  function getPerfectFontSize() {
    if (containerRef.current && textContainerRef.current) {
      const container = containerRef.current;
      let newFontSize = startingFontSize;
      const textContainer = textContainerRef.current;

      // Get max height and width based on the container we don't want to overflow
      const maxHeight = textContainer.clientHeight;
      const maxWidth = textContainer.clientWidth;

      // console.log("maxHeight: ", maxHeight);
      // console.log("maxWidth: ", maxWidth);

      // Create a hidden, absolute test element containing the same text as textContainer
      const testElement = document.createElement("span");
      testElement.style.maxWidth = `${maxWidth}px`;
      testElement.style.fontSize = `${startingFontSize}px`;
      testElement.style.position = "absolute";
      // testElement.style.color = "blue";
      testElement.style.top = "0";
      testElement.style.left = "0";
      // testElement.style.border = "1px solid pink";
      testElement.style.visibility = "hidden";
      testElement.innerHTML = textContainer.innerHTML;

      container.appendChild(testElement);

      while (
        newFontSize <= maxFontSize &&
        testElement.clientHeight <= maxHeight &&
        testElement.clientWidth <= maxWidth
      ) {
        // console.log("testElement.clientHeight: ", testElement.clientHeight);
        // console.log("testElement.clientWidth: ", testElement.clientWidth);
        newFontSize++;
        testElement.style.fontSize = `${newFontSize}px`;
      }

      container.removeChild(testElement);

      // At this point, NewFontSize should be 1px over the perfect size
      setFontSize(newFontSize - 1);
    }
  }

  useEffect(() => {
    // Fade-in text after text is re-sized to perfect size
    setTextAnimation("0.25s fade-in ease");
    // console.log("font size: ", fontSize);
  }, [fontSize]);

  useEffect(() => {
    getPerfectFontSize(); // resize font to fit upon component mount
    window.addEventListener("resize", getPerfectFontSize); // resize font upon window resize
    return () => window.removeEventListener("resize", getPerfectFontSize);
  }, []);

  useEffect(() => {
    getPerfectFontSize(); // re-trigger font resize when isEndSubLevel and isPreEndLevel changes
  }, [isEndSubLevel, isPreEndLevel]);

  return (
    <div ref={containerRef} key={crypto.randomUUID()} className="game-text">
      <div
        ref={textContainerRef}
        className="game-text-text"
        // Set the font size, animation, and persistent opacity once the animation style is preset
        style={{
          fontSize: `${fontSize}px`,
          animation: textAnimation,
          opacity: textAnimation ? 1 : 0,
        }}
      >
        {fellow.response || announcer.hasAnnouncement ? (
          <>
            {isLastLevel ? (
              <>
                {announcer.reaction ? <p>{announcer.reaction}</p> : null}
                {announcer.description ? <p>{announcer.description}</p> : null}
                {announcer.suggestion ? <p>{announcer.suggestion}</p> : null}
              </>
            ) : (
              <p>{fellow.response}</p>
            )}
          </>
        ) : (
          <>
            {announcer.lastDescription &&
            isPreEndLevel &&
            player.guess !== fellow.number ? (
              <p>{announcer.description}</p>
            ) : (
              <p>{level.text1}</p>
            )}
            <p>{level.text2}</p>
            {level.text3 ? <p>{level.text3}</p> : null}
          </>
        )}
      </div>
    </div>
  );
}
