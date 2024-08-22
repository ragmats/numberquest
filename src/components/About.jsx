import CloseX from "./CloseX";
import { useEffect, useRef } from "react";

export default function ChangeName({ showAbout, setShowAbout }) {
  const aboutRef = useRef(null);

  useEffect(() => {
    const about = aboutRef.current;

    // Add even listener for a click outside the menu
    if (showAbout) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    function handleClickOutside(e) {
      if (about && !about.contains(e.target)) closeAbout();
    }
  }, [showAbout]);

  useEffect(() => {
    if (showAbout) {
      // Close with Escape Key
      window.addEventListener("keydown", closeOnEscape);
      return () => window.removeEventListener("keydown", closeOnEscape);
    }
    function closeOnEscape(e) {
      if (e.key === "Escape") closeAbout();
    }
  }, [showAbout]);

  function closeAbout() {
    setShowAbout(false);
  }

  return (
    <div ref={aboutRef} className="about-container">
      <CloseX handleClose={closeAbout} />
      <div className="about-content">
        <img
          className="about-img"
          src={`${import.meta.env.VITE_BASE_URL}img/numberquest_logo_p2.png`}
        />
        <div className="about-container-text">
          <p>
            Number Quest is a text-based number-counting RPG created in React by{" "}
            <a href="https://www.stevencoy.com" target="_new">
              Steven Coy
            </a>
            .
          </p>
          <h4>Artwork</h4>
          <p>
            Main Game artwork is currently AI-generated. Human-generated artwork
            is coming soon.
          </p>
          <h4>
            Icons (
            <a href="https://www.flaticon.com/" target="_new">
              flaticon.com
            </a>
            )
          </h4>
          <p>By frelayasia:</p>
          <ul>
            <li>
              <a
                href="https://www.flaticon.com/free-icon/love-always-wins_8236748"
                target="_new"
              >
                Heart
              </a>
            </li>
          </ul>
          <p>By Freepik:</p>
          <ul>
            <li>
              <a
                href="https://www.flaticon.com/free-icon/gear_1790071"
                target="_new"
              >
                Gear
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icon/fairytale_2007997"
                target="_new"
              >
                Book
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icon/treasure-map_2773564"
                target="_new"
              >
                Map Icon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icon/treasure-map_2919384"
                target="_new"
              >
                Map
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icon/cave_7105096"
                target="_new"
              >
                Cave
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icon/trees_2321588"
                target="_new"
              >
                Forest
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icon/bridges_701615"
                target="_new"
              >
                Bridge
              </a>{" "}
            </li>
          </ul>
          <h4>Sound and Music</h4>
          <p>Coming soon.</p>
          <h4>Developer Contact</h4>
          <p>
            <a href="mailto:stevencoy@gmail.com" target="_new">
              stevencoy@gmail.com
            </a>
          </p>
          <p>
            <a href="https://www.stevencoy.com" target="_new">
              stevencoy.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
