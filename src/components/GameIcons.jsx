import { useRef, useState } from "react";
import MapModal from "./MapModal";
import QuestLog from "./QuestLog";
import SettingsMenu from "./SettingsMenu";

export default function GameIcons({
  questLog,
  screenHeight,
  screenWidth,
  player,
}) {
  const [mapIsOpen, setMapIsOpen] = useState(false);

  const mapBtnRef = useRef(null);

  function handleMapClick() {
    setMapIsOpen(!mapIsOpen);
  }

  return (
    <>
      <MapModal
        handleMapClick={handleMapClick}
        setMapIsOpen={setMapIsOpen}
        mapIsOpen={mapIsOpen}
        mapBtnRef={mapBtnRef}
        player={player}
      />
      <div className="game-icons-container">
        {/* <button className="game-icon-btn">
          <img
            className="game-icon"
            src={`${import.meta.env.VITE_BASE_URL}img/battlelog-icon.png`}
          />
        </button> */}
        <QuestLog questLog={questLog} />
        <button
          ref={mapBtnRef}
          onClick={handleMapClick}
          className="game-icon-btn"
        >
          <img
            className="game-icon"
            src={`${import.meta.env.VITE_BASE_URL}img/map-icon.png`}
          />
        </button>
        <SettingsMenu screenHeight={screenHeight} screenWidth={screenWidth} />
      </div>
    </>
  );
}
