import { useEffect, useState } from "react";
import CloseX from "./CloseX";

export default function Logbook({ player, fellow, isLastLevel, battleLog }) {
  // Should tell the player level, loops?, guesses, battle log
  const [showLogbook, setShowLogbook] = useState(false);

  const reversedBattleLog = [...battleLog].reverse();

  // Close logbook modal on Escape key
  useEffect(() => {
    if (showLogbook) {
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
      <div className="logbook-button-container">
        <button onClick={() => toggleShowLogbook()}>Logbook</button>
      </div>
      {showLogbook ? (
        <div onClick={() => toggleShowLogbook()} className="logbook">
          <CloseX handleClose={toggleShowLogbook} />
          <h3>Battle Log</h3>
          <div className="battle-log">
            <div className="battle-log-gradient" />
            <ul className="battle-log-ul">
              {reversedBattleLog.length > 1 ? (
                reversedBattleLog.map((log, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        log.type === "health"
                          ? "battle-log-health-li"
                          : "battle-log-fight-li"
                      }
                    >
                      {log.text}
                    </li>
                  );
                })
              ) : (
                <p>Nothing has happened yet... do some fightin’!</p>
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
