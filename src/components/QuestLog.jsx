import { useEffect, useRef, useState } from "react";
import CloseX from "./CloseX";

export default function QuestLog({ questLog }) {
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const [scrolledToTop, setScrolledToTop] = useState(false);

  const modalRef = useRef(null);
  const questLogBtnRef = useRef(null);

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
  }, [showQuestLog]);

  useEffect(() => {
    const modal = modalRef.current;
    if (modal && showQuestLog) {
      // Scroll to bottom of quest log (most recent entry)
      modalRef.current.scrollTo({
        top: modalRef.current.scrollHeight,
        behavior: "smooth",
      });
      // Close quest log with Escape Key
      function closeOnEscape(e) {
        if (e.key === "Escape") setShowQuestLog(false);
      }
      window.addEventListener("keydown", closeOnEscape);
      return () => window.removeEventListener("keydown", closeOnEscape);
    }
  }, [showQuestLog]);

  useEffect(() => {
    const questLogBtn = questLogBtnRef.current;
    // Add even listener for a click anywhere except the map button
    if (showQuestLog) {
      document.addEventListener("mousedown", handleClickAnywhere);
    }
    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickAnywhere);
    };
    function handleClickAnywhere(e) {
      if (showQuestLog && questLogBtn && !questLogBtn.contains(e.target))
        setShowQuestLog(false);
    }
  }, [showQuestLog]);

  function toggleshowQuestLog() {
    setShowQuestLog(!showQuestLog);
  }

  return (
    <>
      <button
        ref={questLogBtnRef}
        onClick={() => toggleshowQuestLog()}
        className={showQuestLog ? "game-icon-btn menu-open" : "game-icon-btn"}
      >
        <img
          className="game-icon"
          src={`${import.meta.env.VITE_BASE_URL}img/questlog-icon.png`}
        />
      </button>

      {showQuestLog ? (
        <div
          // onClick={() => toggleshowQuestLog()}
          className="quest-log-container"
        >
          <CloseX handleClose={toggleshowQuestLog} />
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
