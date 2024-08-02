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
  const startingFontSize = 10;
  const maxFontSize = 30;
  const containerRef = useRef(null);
  const [fontSize, setFontSize] = useState(startingFontSize);
  const [textAnimation, setTextAnimation] = useState(null);

  function resizeFontToFit() {
    if (containerRef.current) {
      const container = containerRef.current;
      const text = container.querySelector(".game-text-text");
      // Set text with a small font size
      let currentFontSize = startingFontSize;
      text.style.fontSize = `${currentFontSize}px`;
      // Keep increasing the font size by 1px as long as its container fits within the game-text div
      while (
        text.scrollWidth <= container.clientWidth &&
        text.scrollHeight <= container.clientHeight &&
        currentFontSize <= maxFontSize + 1
        // maxFontSize + 1 because the font will always be set at a -1 to prevent overflow
      ) {
        console.log("container.clientWidth: ", container.clientWidth);
        console.log("container.clientHeight: ", container.clientHeight);
        currentFontSize++;
        text.style.fontSize = `${currentFontSize}px`;
      }
      // Set the font to a size just before it was too big for the game-text div
      setFontSize(currentFontSize - 1);
      // Fade-in text after resizing flashing is finished
      setTextAnimation("0.25s fade-in ease");
    }
  }

  useEffect(() => {
    resizeFontToFit(); // resize font to fit upon component mount
    window.addEventListener("resize", resizeFontToFit); // resize font upon window resize
    return () => window.removeEventListener("resize", resizeFontToFit);
  }, []);

  useEffect(() => {
    resizeFontToFit(); // re-trigger font resize when isEndSubLevel and isPreEndLevel changes
  }, [isEndSubLevel, isPreEndLevel]);

  return (
    <div ref={containerRef} key={crypto.randomUUID()} className="game-text">
      <div
        className="game-text-text"
        // Set the font size, animation, and persistent opacity once the animation style is preset
        style={{
          fontSize: `${fontSize}px`,
          animation: textAnimation,
          opacity: textAnimation ? 1 : 0,
        }}
      >
        {/* The following dangerouslySetInnerHTML is always from a known source */}
        {fellow.response || announcer.hasAnnouncement ? (
          <>
            {isLastLevel ? (
              <>
                {announcer.reaction ? (
                  <p dangerouslySetInnerHTML={{ __html: announcer.reaction }} />
                ) : null}
                {announcer.description ? (
                  <p
                    dangerouslySetInnerHTML={{ __html: announcer.description }}
                  />
                ) : null}
                {announcer.suggestion ? (
                  <p
                    dangerouslySetInnerHTML={{ __html: announcer.suggestion }}
                  />
                ) : null}
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
              <p dangerouslySetInnerHTML={{ __html: announcer.description }} />
            ) : (
              <p dangerouslySetInnerHTML={{ __html: level.text1 }} />
            )}
            <p dangerouslySetInnerHTML={{ __html: level.text2 }} />
            {level.text3 ? (
              <p dangerouslySetInnerHTML={{ __html: level.text3 }} />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
