import { useEffect, useRef, useState } from "react";
import CloseX from "./CloseX";

export default function Logbook({ battleLog }) {
  // Should tell the player level, loops?, guesses, battle log
  const [showLogbook, setShowLogbook] = useState(false);

  const modalRef = useRef(null);

  // const [reversedBattleLog, setReversedBattleLog] = useState(
  //   [...battleLog].reverse()
  // );

  // useEffect(() => {
  //   setReversedBattleLog(() => [...battleLog].reverse());
  // }, [battleLog]);

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
          src={`${import.meta.env.VITE_BASE_URL}img/battlelog-icon.png`}
        />
      </button>

      {showLogbook ? (
        <div onClick={() => toggleShowLogbook()} className="logbook">
          <CloseX handleClose={toggleShowLogbook} />
          <h3>Quest Log</h3>
          <div className="battle-log" ref={modalRef}>
            {/* <div className="battle-log-gradient" /> */}
            <ul className="battle-log-ul">
              {battleLog.map((log, index) => {
                return (
                  <li
                    key={index}
                    className={
                      log.type === "health"
                        ? "battle-log-health-li"
                        : log.type === "fight"
                        ? "battle-log-fight-li"
                        : "battle-log-other-li"
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
