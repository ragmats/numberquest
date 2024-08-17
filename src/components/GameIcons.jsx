import { useState } from "react";
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

  function handleMapClick() {
    setMapIsOpen(!mapIsOpen);
  }

  return (
    <>
      <MapModal
        handleMapClick={handleMapClick}
        mapIsOpen={mapIsOpen}
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
        <button onClick={handleMapClick} className="game-icon-btn">
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
