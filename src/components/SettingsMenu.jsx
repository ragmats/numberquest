import { useEffect, useRef, useState } from "react";

export default function SettingsMenu({ screenHeight, screenWidth }) {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [iconTop, setIconTop] = useState(0);
  const [iconHeight, setIconHeight] = useState(0);
  const [iconMiddleTopPosition, setIconMiddleTopPosition] = useState(0);
  const [iconMiddleBottomPosition, setIconMiddleBottomPosition] = useState(0);
  const [isPortrait, setIsPortrait] = useState(screenHeight > screenWidth);

  const imgRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const gearIcon = imgRef.current;
    const menu = menuRef.current;

    // Add even listener for a click outside the menu
    if (showSettingsMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

    function handleClickOutside(e) {
      if (
        menu &&
        gearIcon &&
        !menu.contains(e.target) &&
        !gearIcon.contains(e.target)
      )
        setShowSettingsMenu(false);
    }
  }, [showSettingsMenu]);

  useEffect(() => {
    if (showSettingsMenu) {
      // Close logbook with Escape Key
      window.addEventListener("keydown", closeOnEscape);
      return () => window.removeEventListener("keydown", closeOnEscape);
    }
    function closeOnEscape(e) {
      if (e.key === "Escape") setShowSettingsMenu(false);
    }
  }, [showSettingsMenu]);

  useEffect(() => {
    const gearIcon = imgRef.current;
    if (gearIcon) {
      setIconTop(gearIcon.getBoundingClientRect().top);
      setIconHeight(gearIcon.getBoundingClientRect().height);
      setIsPortrait(screenHeight > screenWidth);
    }
  }, [screenHeight, screenWidth]);

  useEffect(() => {
    setIconMiddleTopPosition(iconTop + iconHeight / 2);
  }, [iconTop, iconHeight]);

  useEffect(() => {
    setIconMiddleBottomPosition(screenHeight - iconMiddleTopPosition);
  }, [iconMiddleTopPosition, screenHeight]);

  function toggleSettingsMenu() {
    setShowSettingsMenu(!showSettingsMenu);
  }

  return (
    <>
      <button onClick={toggleSettingsMenu} className="game-icon-btn">
        <img
          ref={imgRef}
          className="game-icon"
          src={`${import.meta.env.VITE_BASE_URL}img/gear-icon.png`}
        />
      </button>
      <div
        ref={menuRef}
        className="settings-menu-container"
        style={{
          top: isPortrait ? `${iconMiddleTopPosition}px` : "auto",
          bottom: isPortrait ? "auto" : `${iconMiddleBottomPosition}px`,
          opacity: showSettingsMenu ? 1 : 0,
          pointerEvents: showSettingsMenu ? "auto" : "none",
          transform: showSettingsMenu
            ? isPortrait
              ? `translateY(${iconHeight - iconHeight / 3}px)`
              : `translateY(-${iconHeight - iconHeight / 3}px)`
            : `translateY(0px)`,
        }}
      >
        <h3>OPTIONS</h3>
        <div className="settings-buttons-container">
          <button>Change Name</button>
          <button>End Game</button>
          <button disabled>Kid Mode</button>
          <button disabled>Toggle Sound</button>
          <button>Credits</button>
        </div>
      </div>
    </>
  );
}