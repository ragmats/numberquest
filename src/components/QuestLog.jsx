import { useEffect, useRef, useState } from "react";
import CloseX from "./CloseX";

export default function QuestLog({ questLog }) {
  const [showLogbook, setShowLogbook] = useState(false);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const [scrolledToTop, setScrolledToTop] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    // Assign current DOM element
    const questLogDiv = modalRef.current;
    if (questLogDiv) {
      // Determines if content inside the modal has a scrollbar
      setHasScrollbar(questLogDiv.scrollHeight > questLogDiv.clientHeight);
      handleScroll();
      // Run handleScroll whenever user scrolls the modal
      questLogDiv.addEventListener("scroll", handleScroll);
      // Cleanup/remove the event listener when component unmounts or useEffect re-triggers
      return () => {
        questLogDiv.removeEventListener("scroll", handleScroll);
      };
    }
    // Check if the modal's scroll position is at the top
    function handleScroll() {
      setScrolledToTop(questLogDiv.scrollTop === 0);
    }
  }, [showLogbook]);

  useEffect(() => {
    if (showLogbook) {
      // Scroll to bottom of logbook (most recent entry)
      if (modalRef.current) {
        modalRef.current.scrollTo({
          top: modalRef.current.scrollHeight,
          behavior: "smooth",
        });
      }

      // Close logbook with Escape Key
      function closeOnEscape(e) {
        if (e.key === "Escape") setShowLogbook(!showLogbook);
      }
      window.addEventListener("keydown", closeOnEscape);
      return () => window.removeEventListener("keydown", closeOnEscape);
    }
  }, [showLogbook]);

  function toggleShowLogbook() {
    setShowLogbook(!showLogbook);
  }

  return (
    <>
      <button onClick={() => toggleShowLogbook()} className="game-icon-btn">
        <img
          className="game-icon"
          src={`${import.meta.env.VITE_BASE_URL}img/questlog-icon.png`}
        />
      </button>

      {showLogbook ? (
        <div
          onClick={() => toggleShowLogbook()}
          className="quest-log-container"
        >
          <CloseX handleClose={toggleShowLogbook} />
          <h2>Quest Log</h2>
          <div className="quest-log" ref={modalRef}>
            {hasScrollbar && !scrolledToTop ? (
              <div className="quest-log-gradient" />
            ) : null}
            <ul className="quest-log-ul">
              {questLog.map((log, index) => {
                return (
                  <li
                    key={index}
                    className={
                      log.type === "health"
                        ? "quest-log-health-li"
                        : log.type === "fight"
                        ? "quest-log-fight-li"
                        : log.type === "guess"
                        ? "quest-log-guess-li"
                        : log.type === "win"
                        ? "quest-log-win-li"
                        : log.type === "lose"
                        ? "quest-log-lose-li"
                        : log.type === "victory"
                        ? "quest-log-victory-li"
                        : "quest-log-other-li"
                    }
                  >
                    {log.text}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
