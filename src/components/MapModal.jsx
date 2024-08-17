import { useEffect } from "react";
import CloseX from "./CloseX";

export default function MapModal({
  handleMapClick,
  setMapIsOpen,
  mapIsOpen,
  mapBtnRef,
  player,
}) {
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

  useEffect(() => {
    const mapBtn = mapBtnRef.current;
    // Add even listener for a click anywhere except the map button
    if (mapIsOpen) {
      document.addEventListener("mousedown", handleClickAnywhere);
    }
    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickAnywhere);
    };
    function handleClickAnywhere(e) {
      if (mapIsOpen && mapBtn && !mapBtn.contains(e.target))
        setMapIsOpen(false);
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
