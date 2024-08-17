import { useEffect } from "react";
import CloseX from "./CloseX";

export default function MapModal({ handleMapClick, mapIsOpen, player }) {
  useEffect(() => {
    if (mapIsOpen) {
      // Close logbook with Escape Key
      window.addEventListener("keydown", closeOnEscape);
      return () => window.removeEventListener("keydown", closeOnEscape);
    }
    function closeOnEscape(e) {
      if (e.key === "Escape") handleMapClick();
    }
  }, [mapIsOpen]);

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
    </>
  );
}
