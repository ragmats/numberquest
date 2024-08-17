import { useState } from "react";
import CloseX from "./CloseX";
import QuestLog from "./QuestLog";
import SettingsMenu from "./SettingsMenu";

export default function GameIcons({
  player,
  fellow,
  isLastLevel,
  questLog,
  screenHeight,
  screenWidth,
}) {
  const [mapIsOpen, setMapIsOpen] = useState(false);

  function handleMapClick() {
    setMapIsOpen(!mapIsOpen);
  }

  return (
    <>
      {mapIsOpen ? (
        <div onClick={handleMapClick} className="map-image-container">
          <CloseX handleClose={handleMapClick} />
          <img
            className="map-image"
            src={`${import.meta.env.VITE_BASE_URL}img/map_level${
              player.level
            }.svg`}
          />
        </div>
      ) : null}
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
